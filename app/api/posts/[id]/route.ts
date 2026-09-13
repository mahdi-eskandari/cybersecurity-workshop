import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "../../../model/blog";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    if (
      body.postType !== undefined &&
      body.postType !== "normal" &&
      body.postType !== "special"
    ) {
      return NextResponse.json(
        { message: "نوع پست معتبر نیست" },
        { status: 400 }
      );
    }

    const post = await Post.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!post) {
      return NextResponse.json(
        { message: "پست پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error: any) {
    console.error("PATCH /api/posts/[id] error:", error);

    if (error?.name === "ValidationError") {
      return NextResponse.json(
        {
          message: "اطلاعات پست معتبر نیست",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "خطا در ویرایش پست" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const post = await Post.findByIdAndDelete(id).lean();

    if (!post) {
      return NextResponse.json(
        { message: "پست پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("DELETE /api/posts/[id] error:", error);

    return NextResponse.json(
      { message: "خطا در حذف پست" },
      { status: 500 }
    );
  }
}