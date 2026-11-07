import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Media from "../../model/media";
import sharp from "sharp";
import { isAdmin } from "@/lib/adminAuth";
import Post from "../../model/blog";

const MAX_UPLOAD = 10 * 1024 * 1024; // ۱۰ مگابایت

export async function GET() {
  try {
    await connectDB();

    let filter: Record<string, unknown> = {};

    if (!(await isAdmin())) {
      // غیرادمین: فقط تصاویر شاخص مطالب منتشرشده
      const used = (
        (await Post.find({ status: "published" }).distinct(
          "featuredImage"
        )) as (string | null)[]
      ).filter((v): v is string => Boolean(v));

      const ids = used
        .map((v) => String(v).replace("/api/media/", ""))
        .filter((v) => /^[a-f\d]{24}$/i.test(v));

      // هم با _id و هم با url کامل (data URL) مچ می‌شود
      filter = {
        $or: [{ _id: { $in: ids } }, { url: { $in: used } }],
      };
    }

    const media = await Media.find(filter).sort({ createdAt: -1 }).lean();

    // url همان data URL ذخیره‌شده است تا کارت‌های وبلاگ مثل قبل کار کنند
    const normalizedMedia = media.map((item: any) => ({
      id: String(item._id),
      name: item.name,
      url: item.url,
      alt: item.alt ?? "",
      mimeType: item.mimeType,
      size: item.size ?? 0,
      width: item.width ?? null,
      height: item.height ?? null,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return NextResponse.json(normalizedMedia);
  } catch (error) {
    console.error("GET /api/media error:", error);
    return NextResponse.json(
      { message: "خطا در دریافت فایل‌های چندرسانه‌ای" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    await connectDB();

    const formData = await request.formData();
    const file = formData.get("file");
    const altValue = formData.get("alt");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "فایل تصویر ارسال نشده است" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "فقط فایل تصویری مجاز است" },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD) {
      return NextResponse.json(
        { message: "حجم تصویر زیاد است (حداکثر ۱۰ مگابایت)" },
        { status: 400 }
      );
    }

    const originalBuffer = Buffer.from(await file.arrayBuffer());

    const image = sharp(originalBuffer);
    const metadata = await image.metadata();
    const webpBuffer = await image.webp({ quality: 82 }).toBuffer();

    const dataUrl = `data:image/webp;base64,${webpBuffer.toString("base64")}`;

    const originalName = file.name.replace(/\.[^.]+$/, "");
    const webpName = `${originalName}.webp`;

    const alt =
      typeof altValue === "string" && altValue.trim()
        ? altValue.trim().slice(0, 200)
        : originalName.replace(/[-_]+/g, " ");

    const media = await Media.create({
      name: webpName,
      url: dataUrl,
      alt,
      mimeType: "image/webp",
      size: webpBuffer.length,
      width: metadata.width ?? null,
      height: metadata.height ?? null,
    });

    return NextResponse.json(
      {
        id: String(media._id),
        name: media.name,
        url: media.url,
        alt: media.alt ?? "",
        mimeType: media.mimeType,
        size: media.size ?? 0,
        width: media.width ?? null,
        height: media.height ?? null,
        createdAt: media.createdAt,
        updatedAt: media.updatedAt,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/media error:", error);

    if (error?.name === "ValidationError") {
      return NextResponse.json(
        { message: "اطلاعات فایل معتبر نیست" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "خطا در ذخیره تصویر" },
      { status: 500 }
    );
  }
}