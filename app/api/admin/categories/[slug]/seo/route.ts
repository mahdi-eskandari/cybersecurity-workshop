import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/app/model/category";
import { isAdmin } from "@/lib/adminAuth";
import { normalizeCategorySeo } from "@/lib/categorySeo";
import { parseCanonical } from "@/lib/seoFields";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

const fail = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    if (!(await isAdmin())) return fail("دسترسی غیرمجاز", 403);

    const { slug } = await params;
    await connectDB();

    const doc = await Category.findOne({ slug })
      .select("metaTitle metaDescription ogImage ogImageAlt index follow canonical")
      .lean()
      .exec();

    if (!doc) return fail("دسته‌بندی پیدا نشد", 404);

    return NextResponse.json({ success: true, seo: normalizeCategorySeo(doc) });
  } catch (error) {
    console.error("GET category seo error:", error);
    return fail("دریافت تنظیمات سئو انجام نشد.", 500);
  }
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  try {
    if (!(await isAdmin())) return fail("دسترسی غیرمجاز", 403);

    const { slug } = await params;
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return fail("درخواست نامعتبر است.");

    const metaTitle = str(body.metaTitle, 200);
    const metaDescription = str(body.metaDescription, 500);
    const ogImage = str(body.ogImage, 500);
    const ogImageAlt = str(body.ogImageAlt, 200);

    if (metaTitle.length > 70) {
      return fail("عنوان سئو نباید بیشتر از 70 کاراکتر باشد.");
    }
    if (metaDescription.length > 170) {
      return fail("توضیحات سئو نباید بیشتر از 170 کاراکتر باشد.");
    }

    if (ogImage) {
      const internal = ogImage.startsWith("/") && !ogImage.startsWith("//");
      const external = /^https?:\/\/\S+$/i.test(ogImage);
      if (!internal && !external) {
        return fail("تصویر باید مسیر داخلی (/api/media/...) یا آدرس کامل http(s) باشد.");
      }
    }

        const canonicalResult = parseCanonical(body.canonical);
    if ("error" in canonicalResult) return fail(canonicalResult.error);

    await connectDB();

    const updated = await Category.findOneAndUpdate(
      { slug },
      {
        $set: {
          metaTitle,
          metaDescription,
          ogImage,
          ogImageAlt,
          index: body.index !== false,
          follow: body.follow !== false,
          canonical: canonicalResult.value,
        },
      },
      { new: true }
    )
      .lean()
      .exec();

    if (!updated) return fail("دسته‌بندی پیدا نشد", 404);

    return NextResponse.json({
      success: true,
      message: "سئوی دسته‌بندی ذخیره شد.",
      seo: normalizeCategorySeo(updated),
    });
  } catch (error) {
    console.error("PUT category seo error:", error);
    return fail("ذخیره انجام نشد.", 500);
  }
}