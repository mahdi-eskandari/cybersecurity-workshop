import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { isAdmin } from "@/lib/adminAuth";
import Media from "../../../model/media";
import Post from "../../../model/blog";
import { isMediaPublic } from "@/lib/mediaAccess";
import { promises as fs } from "fs";
import path from "path";
import { UPLOAD_DIR } from "@/lib/uploadDir";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return new NextResponse("Not found", { status: 404 });
    }

    const media: any = await Media.findById(id).select("url").lean();

    if (!media?.url) {
      return new NextResponse("Not found", { status: 404 });
    }

    const admin = await isAdmin();

    if (!admin) {
      let allowed = false;
      try {
        allowed = await isMediaPublic(id, media.url);
      } catch {
        allowed = false;
      }

      if (!allowed) {
        const ref = new RegExp(id);
        const inPublished = await Post.exists({
          status: "published",
          $or: [
            { featuredImage: ref },
            { content: { $regex: ref } },
          ],
        });
        allowed = Boolean(inPublished);
      }

      if (!allowed) {
        return new NextResponse("Not found", { status: 404 });
      }
    }

    const match = /^data:([^;]+);base64,(.+)$/.exec(media.url);

    let buffer: Buffer;
    let contentType: string;

    if (match) {
      // عکس‌های قدیمی که هنوز داخل دیتابیس‌ان
      if (!match[1].startsWith("image/")) {
        return new NextResponse("Not found", { status: 404 });
      }
      buffer = Buffer.from(match[2], "base64");
      contentType = match[1];
    } else if (media.url.startsWith("/api/media/")) {
      // عکس‌های جدید: فایل روی سرور
      try {
        buffer = await fs.readFile(path.join(UPLOAD_DIR, `${id}.webp`));
        contentType = "image/webp";
      } catch {
        return new NextResponse("Not found", { status: 404 });
      }
    } else {
      return NextResponse.redirect(media.url);
    }

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(buffer.length),
        "Cache-Control": admin
          ? "private, no-store"
          : "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("GET /api/media/:id error:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const { id } = await context.params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return NextResponse.json(
        { message: "شناسه فایل نامعتبر است" },
        { status: 400 }
      );
    }

    await connectDB();

    const body = await request.json();
    const media = await Media.findById(id);

    if (!media) {
      return NextResponse.json({ message: "فایل پیدا نشد" }, { status: 404 });
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

export async function DELETE(request: Request, context: RouteContext) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const { id } = await context.params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return NextResponse.json(
        { message: "شناسه فایل نامعتبر است" },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedMedia = await Media.findByIdAndDelete(id);

    if (!deletedMedia) {
      return NextResponse.json({ message: "فایل پیدا نشد" }, { status: 404 });
    }

        await fs.unlink(path.join(UPLOAD_DIR, `${id}.webp`)).catch(() => {});

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