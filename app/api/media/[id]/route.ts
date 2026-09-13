import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Media from "../../../model/media";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const body = await request.json();

    const media = await Media.findById(id);

    if (!media) {
      return NextResponse.json(
        { message: "فایل پیدا نشد" },
        { status: 404 }
      );
    }

    if (body.alt !== undefined) {
      media.alt = String(body.alt).trim();
    }

    const updatedMedia = await media.save();

    return NextResponse.json({
      id: String(updatedMedia._id),
      name: updatedMedia.name,
      url: updatedMedia.url,
      alt: updatedMedia.alt ?? "",
      mimeType: updatedMedia.mimeType,
      size: updatedMedia.size ?? 0,
      width: updatedMedia.width ?? null,
      height: updatedMedia.height ?? null,
      createdAt: updatedMedia.createdAt,
      updatedAt: updatedMedia.updatedAt,
    });
  } catch (error: any) {
    console.error("PATCH /api/media/:id error:", error);

    return NextResponse.json(
      { message: "خطا در ویرایش اطلاعات تصویر" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const deletedMedia = await Media.findByIdAndDelete(id);

    if (!deletedMedia) {
      return NextResponse.json(
        { message: "فایل پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "فایل با موفقیت حذف شد",
    });
  } catch (error) {
    console.error("DELETE /api/media/:id error:", error);

    return NextResponse.json(
      { message: "خطا در حذف فایل چندرسانه‌ای" },
      { status: 500 }
    );
  }
}