import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // مسیر اتصال به دیتابیس شما
import Comment from "../../model/comment"; // مسیر مدل نظرات شما

// GET: دریافت لیست نظرات با قابلیت صفحه‌بندی و فیلتر وضعیت
export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const status = searchParams.get("status");
    const postId = searchParams.get("postId");

    const query: Record<string, any> = {};
    if (status && status !== "all") {
      query.approvalStatus = status;
    }

   if (postId) {
     query.postId = postId;
   }

    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      Comment.find(query)
        .populate("postId", "title") // در صورت داشتن رفرنس به پست
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
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

// POST: ثبت نظر جدید (توسط کاربران در سایت)
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    // فرم سمت کاربر (CommentSection) فیلد را با اسم "comment" می‌فرسته
    // و خودِ اسکیمای Comment هم فیلدش دقیقاً همین "comment"ه —
    // قبلاً اینجا به‌اشتباه دنبال "message" می‌گشت که هیچ‌وقت
    // فرستاده نمی‌شد، برای همین همیشه 400 می‌گرفتی.
    const { postId, name, contact, comment } = body;

    if (!comment || !name) {
      return NextResponse.json(
        { message: "نام و متن نظر الزامی است." },
        { status: 400 }
      );
    }

    const newComment = await Comment.create({
      postId: postId || null,
      name,
      contact: contact || "",
      comment,
      approvalStatus: "pending", // پیش‌فرض در انتظار تایید
    });

    return NextResponse.json(
      { message: "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد.", comment: newComment },
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