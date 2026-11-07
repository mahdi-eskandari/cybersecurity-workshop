


import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // مسیر اتصال به دیتابیس شما
import Comment from "../../model/comment"; // مسیر مدل نظرات شما
import mongoose from "mongoose";
import { isAdmin } from "@/lib/adminAuth";
import { getIp, record, retryAfter, MIN, HOUR } from "@/lib/rateLimit";
import { verifyTurnstile } from "@/lib/turnstile";
import { claimToken } from "@/lib/tokenGuard";
import Post from "../../model/blog";

// GET: دریافت لیست نظرات با قابلیت صفحه‌بندی و فیلتر وضعیت
export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const admin = await isAdmin();

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "12", 10) || 12)
    );
    const status = searchParams.get("status");
    const postId = searchParams.get("postId");

    const query: Record<string, any> = {};

    if (admin) {
      if (status && status !== "all") query.approvalStatus = status;
      if (postId) query.postId = postId;
    } else {
      // عمومی: فقط نظرات تاییدشده‌ی یک مطلب مشخص
      if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
        return NextResponse.json({ comments: [], total: 0, page: 1, totalPages: 0 });
      }
      // فقط نظرات مطلب منتشرشده
      const publishedPost = await Post.exists({
        _id: postId,
        status: "published",
      });
      if (!publishedPost) {
        return NextResponse.json({ comments: [], total: 0, page: 1, totalPages: 0 });
      }

      query.postId = postId;
      query.approvalStatus = "approved";
    }

    const skip = (page - 1) * limit;

    const finder = Comment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (admin) finder.populate("postId", "title");
    else finder.select("name comment createdAt parentCommentId");

    const [rawComments, total] = await Promise.all([
      finder.lean(),
      Comment.countDocuments(query),
    ]);

    const comments = admin
      ? rawComments
      : (() => {
          const names = new Map(
            rawComments.map((c: any) => [String(c._id), c.name])
          );
          return rawComments.map((c: any) => ({
            ...c,
            parentCommentId: c.parentCommentId ? String(c.parentCommentId) : null,
            parentName: c.parentCommentId
              ? names.get(String(c.parentCommentId)) ?? null
              : null,
          }));
        })();

    return NextResponse.json({
      comments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("GET COMMENTS ERROR:", error);
    return NextResponse.json(
      { message: "خطا در دریافت نظرات از سرور." },
      { status: 500 }
    );
  }
}


const LIMITS = [
  { id: "main", limit: 3, windowMs: HOUR },  // ۳ نظر، بعدش حدود ۱ ساعت قفل
] as const;

const FAIL_LIMIT = 10;
const FAIL_WINDOW = 10 * MIN;

function tooMany(seconds: number) {
  const t =
    seconds >= 3600 ? `${Math.ceil(seconds / 3600)} ساعت` :
    seconds > 90 ? `${Math.ceil(seconds / 60)} دقیقه` :
    `${seconds} ثانیه`;
  return NextResponse.json(
    { message: `تعداد ارسال‌های شما به حد مجاز رسیده است. لطفاً ${t} دیگر دوباره تلاش کنید.` },
    { status: 429, headers: { "Retry-After": String(seconds) } }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
  postId,
  parentCommentId,
  name,
  contact,
  comment,
  turnstileToken,
} = body ?? {};

    if (
      typeof name !== "string" ||
      typeof comment !== "string" ||
      !name.trim() ||
      !comment.trim()
    ) {
      return NextResponse.json(
        { message: "نام و متن نظر الزامی است." },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      comment.length > 2000 ||
      (typeof contact === "string" && contact.length > 100)
    ) {
      return NextResponse.json(
        { message: "طول ورودی بیش از حد مجاز است." },
        { status: 400 }
      );
    }

    if (postId && !mongoose.Types.ObjectId.isValid(String(postId))) {
      return NextResponse.json(
        { message: "شناسه مطلب نامعتبر است." },
        { status: 400 }
      );
    }


    const parentId =
  typeof parentCommentId === "string"
    ? parentCommentId.trim()
    : "";

if (
  parentId &&
  (
    !mongoose.Types.ObjectId.isValid(parentId) ||
    !postId ||
    !mongoose.Types.ObjectId.isValid(String(postId))
  )
) {
  return NextResponse.json(
    { message: "شناسه نظر والد نامعتبر است." },
    { status: 400 }
  );
}

    /* ───── لیمیت + کپچا ───── */
    const ip = getIp(request);

    for (const l of LIMITS) {
      const wait = retryAfter(`comment:${l.id}:${ip}`, l.limit, l.windowMs);
      if (wait > 0) return tooMany(wait);
    }
    const failWait = retryAfter(`comment:fail:${ip}`, FAIL_LIMIT, FAIL_WINDOW);
    if (failWait > 0) return tooMany(failWait);

    const token = typeof turnstileToken === "string" ? turnstileToken : "";

    if (!token || !claimToken(token)) {
      record(`comment:fail:${ip}`, FAIL_WINDOW);
      return NextResponse.json(
        { message: "تأیید امنیتی نامعتبر یا منقضی شده است. لطفاً دوباره تلاش کنید." },
        { status: 400 }
      );
    }

    const human = await verifyTurnstile(token, ip);
    if (!human) {
      record(`comment:fail:${ip}`, FAIL_WINDOW);
      return NextResponse.json(
        { message: "تأیید امنیتی ناموفق بود. لطفاً دوباره تلاش کنید." },
        { status: 403 }
      );
    }

    for (const l of LIMITS) record(`comment:${l.id}:${ip}`, l.windowMs);
    /* ───── پایان ───── */

    await dbConnect();

    // فقط برای مطلب منتشرشده می‌شه نظر گذاشت
    if (postId) {
      const publishedPost = await Post.exists({
        _id: String(postId),
        status: "published",
      });

      if (!publishedPost) {
        return NextResponse.json(
          { message: "مطلب موردنظر پیدا نشد." },
          { status: 400 }
        );
      }
    }

    if (parentId) {
  const parent = await Comment.findOne({
    _id: parentId,
    postId: String(postId),
    approvalStatus: "approved",
  })
    .select("_id")
    .lean();

  if (!parent) {
    return NextResponse.json(
      { message: "نظر موردنظر برای پاسخ دادن پیدا نشد." },
      { status: 400 }
    );
  }
}

await Comment.create({
  postId: postId ? String(postId) : undefined,
  parentCommentId: parentId || null,
  name: name.trim(),
  contact: typeof contact === "string" ? contact.trim() : "",
  comment: comment.trim(),
  approvalStatus: "pending",
});

    return NextResponse.json(
      { message: "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد." },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST COMMENT ERROR:", error);
    return NextResponse.json(
      { message: "خطا در ثبت نظر." },
      { status: 500 }
    );
  }
}

// PATCH: آپدیت وضعیت تایید نظر (توسط مدیر)
export async function PATCH(request: Request) {
  try {
if (!(await isAdmin())) {
  return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
}

    await dbConnect();
    const body = await request.json();
    const { id, approvalStatus } = body;

    if (!id || !["pending", "approved", "rejected"].includes(approvalStatus)) {
      return NextResponse.json(
        { message: "اطلاعات ارسالی نامعتبر است." },
        { status: 400 }
      );
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { approvalStatus },
      { new: true }
    ).populate("postId", "title");

    if (!updatedComment) {
      return NextResponse.json(
        { message: "نظر مورد نظر یافت نشد." },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error("PATCH COMMENT ERROR:", error);
    return NextResponse.json(
      { message: "خطا در بروزرسانی وضعیت نظر." },
      { status: 500 }
    );
  }
}

// DELETE: حذف نظر (توسط مدیر)
export async function DELETE(request: Request) {
  try {
if (!(await isAdmin())) {
  return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
}

    await dbConnect();
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "شناسه نظر ارسال نشده است." },
        { status: 400 }
      );
    }

    const deleted = await Comment.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "نظر مورد نظر یافت نشد." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "نظر با موفقیت حذف شد.", id });
  } catch (error) {
    console.error("DELETE COMMENT ERROR:", error);
    return NextResponse.json(
      { message: "خطا در حذف نظر." },
      { status: 500 }
    );
  }
}