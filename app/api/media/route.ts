import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Media from "../../model/media";

export async function GET() {
  try {
    await connectDB();

    const media = await Media.find({})
      .sort({ createdAt: -1 })
      .lean();

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

    const buffer = Buffer.from(await file.arrayBuffer());

    // ذخیره خود تصویر به صورت Data URL داخل MongoDB
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    const alt =
      typeof altValue === "string"
        ? altValue.trim()
        : file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");

    const media = await Media.create({
      name: file.name,
      url: dataUrl,
      alt,
      mimeType: file.type,
      size: file.size,
      width: null,
      height: null,
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
        {
          message: "اطلاعات فایل معتبر نیست",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "خطا در ذخیره تصویر" },
      { status: 500 }
    );
  }
}