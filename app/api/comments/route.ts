import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // مسیر اتصال به دیتابیس شما
import Comment from "../../model/comment"; // مسیر مدل نظرات شما
import mongoose from "mongoose";
import { isAdmin } from "@/lib/adminAuth";
import { getIp, record, retryAfter, MIN } from "@/lib/rateLimit";

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
      query.postId = postId;
      query.approvalStatus = "approved";
    }

    const skip = (page - 1) * limit;

    const finder = Comment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (admin) finder.populate("postId", "title");
    else finder.select("name comment createdAt");

    const [comments, total] = await Promise.all([
      finder.lean(),
      Comment.countDocuments(query),
    ]);

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


export async function POST(request: Request) {
  try {

    const ip = getIp(request);
    const wait = retryAfter(`comment:${ip}`, 5, 10 * MIN);
    if (wait > 0) {
      return NextResponse.json(
        { message: `تعداد ارسال زیاد است. ${Math.ceil(wait / 60)} دقیقه دیگر تلاش کنید.` },
        { status: 429 }
      );
    }

    await dbConnect();
    const body = await request.json();

    const { postId, name, contact, comment } = body ?? {};

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


        record(`comment:${ip}`, 10 * MIN);
    await Comment.create({
      postId: postId || null,
      name: name.trim(),
      contact: typeof contact === "string" ? contact.trim() : "",
      comment: comment.trim(),
      approvalStatus: "pending", // همیشه سمت سرور
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