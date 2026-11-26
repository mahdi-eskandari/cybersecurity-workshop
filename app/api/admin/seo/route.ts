// app/api/admin/seo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { parseOgImage, cleanAlt } from "@/lib/seoFields";

import connectDB from "@/lib/mongodb";
import PageSeo from "../../../model/PageSeo";
import SeoRedirect from "../../../model/SeoRedirect";
import { isAdmin } from "@/lib/adminAuth";

const ALLOWED_PAGES = [
  {
    pageKey: "home",
    pageName: "صفحه اصلی",
    defaultH1: "هیچ مجرمی در دنیای دیجیتال بی ردپا نیست",
    defaultSlug: "",
  },
  {
    pageKey: "services",
    pageName: "خدمات",
    defaultH1: "خدمات اجرایی و مشاوره‌های تخصصی پاراهور",
    defaultSlug: "services",
  },
  {
    pageKey: "blogs",
    pageName: "وبلاگ",
    defaultH1: "وبلاگ پاراهور",
    defaultSlug: "blogs",
  },
  {
    pageKey: "about",
    pageName: "درباره ما",
    defaultH1: "درباره پاراهور",
    defaultSlug: "about",
  },
  {
    pageKey: "contact",
    pageName: "تماس با ما",
    defaultH1: "تماس با پاراهور",
    defaultSlug: "contact",
  },
  {
    pageKey: "privacy",
    pageName: "حریم خصوصی",
    defaultH1: "حریم خصوصی پاراهور",
    defaultSlug: "privacy",
  },
  {
    pageKey: "authors",
    pageName: "پژوهشگران و کارشناسان",
    defaultH1: "پژوهشگران و کارشناسان",
    defaultSlug: "authors",
  },
  {
    pageKey: "author-mohammadreza-yousefi",
    pageName: "محمدرضا یوسفی",
    defaultH1: "محمدرضا یوسفی",
    defaultSlug: "mohammadreza-yousefi",
  },
  {
    pageKey: "author-sara-mohammadzadeh",
    pageName: "سارا محمدزاده",
    defaultH1: "سارا محمدزاده",
    defaultSlug: "sara-mohammadzadeh",
  },
] as const;

function isValidSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

const MAX_CANONICAL_LENGTH = 500;

/**
 * Canonical اختیاری:
 *  - خالی            → خودکار (خود صفحه)
 *  - /path           → مسیر داخلی
 *  - http(s)://...   → آدرس کامل
 * خروجی: { value } یا { error }
 */
function normalizeCanonical(
  raw: unknown
): { value: string } | { error: string } {
  const v = String(raw ?? "").trim();

  if (!v) return { value: "" };

  if (v.length > MAX_CANONICAL_LENGTH) {
    return {
      error: `Canonical نباید بیشتر از ${MAX_CANONICAL_LENGTH} کاراکتر باشد.`,
    };
  }

  if (/\s/.test(v)) {
    return { error: "Canonical نباید فاصله داشته باشد." };
  }

  // مسیر داخلی (نه protocol-relative مثل //evil.com)
  if (v.startsWith("/")) {
    if (v.startsWith("//") || v.includes("\\")) {
      return { error: "Canonical معتبر نیست." };
    }
    return { value: v.split("#")[0] };
  }

  try {
    const url = new URL(v);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return {
        error: "Canonical باید با /، http:// یا https:// شروع شود.",
      };
    }

    url.hash = "";
    return { value: url.toString() };
  } catch {
    return {
      error:
        "Canonical باید مسیر داخلی (مثل /services) یا آدرس کامل باشد.",
    };
  }
}

export async function GET() {
  try {
// اول هر تابع، داخل try:
if (!(await isAdmin())) {
  return NextResponse.json({ success: false, message: "دسترسی غیرمجاز" }, { status: 403 });
}
    await connectDB();

    const pages = await PageSeo.find({})
      .sort({ pageName: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      pages,
    });
  } catch (error) {
    console.error("GET /api/admin/seo error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطا در دریافت تنظیمات SEO.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
// اول هر تابع، داخل try:
if (!(await isAdmin())) {
  return NextResponse.json({ success: false, message: "دسترسی غیرمجاز" }, { status: 403 });
}

    await connectDB();

    const body = await request.json();

    const { pageKey, h1Title, slug, metaTitle, metaDescription, index, follow, canonical, ogImage, ogImageAlt } = body;

    // ---------------------------------------------------------
    // PAGE KEY
    // ---------------------------------------------------------

    if (!pageKey) {
      return NextResponse.json(
        {
          success: false,
          message: "صفحه انتخاب نشده است.",
        },
        { status: 400 }
      );
    }

    const pageDefinition = ALLOWED_PAGES.find(
      (page) => page.pageKey === pageKey
    );

    if (!pageDefinition) {
      return NextResponse.json(
        {
          success: false,
          message: "صفحه انتخاب‌شده معتبر نیست.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // CLEAN VALUES
    // ---------------------------------------------------------

    const cleanSlug = String(slug ?? "")
      .trim()
      .toLowerCase()
      .replace(/^\/+|\/+$/g, "");

    const cleanH1Title = String(h1Title || "").trim();
    const cleanMetaTitle = String(metaTitle || "").trim();
    const cleanMetaDescription = String(metaDescription || "").trim();

    // ---------------------------------------------------------
    // HOME ROUTE
    // Home باید فقط /
    // ---------------------------------------------------------

    if (pageKey === "home" && cleanSlug !== "") {
      return NextResponse.json(
        {
          success: false,
          message: "Route صفحه اصلی باید / باشد.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // OTHER PAGES CANNOT USE ROOT
    // ---------------------------------------------------------

    if (pageKey !== "home" && !cleanSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug الزامی است.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // SLUG VALIDATION
    // ---------------------------------------------------------

    if (cleanSlug && !isValidSlug(cleanSlug)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Slug فقط می‌تواند شامل حروف انگلیسی، عدد و خط تیره باشد.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // H1
    // ---------------------------------------------------------

    if (!cleanH1Title) {
      return NextResponse.json(
        {
          success: false,
          message: "عنوان H1 الزامی است.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // META TITLE
    // ---------------------------------------------------------

    if (!cleanMetaTitle) {
      return NextResponse.json(
        {
          success: false,
          message: "Meta Title الزامی است.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // META DESCRIPTION
    // ---------------------------------------------------------

    if (!cleanMetaDescription) {
      return NextResponse.json(
        {
          success: false,
          message: "Meta Description الزامی است.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // LENGTH VALIDATION
    // ---------------------------------------------------------

    if (cleanMetaTitle.length > 70) {
      return NextResponse.json(
        {
          success: false,
          message: "Meta Title نباید بیشتر از 70 کاراکتر باشد.",
        },
        { status: 400 }
      );
    }

    if (cleanMetaDescription.length > 170) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Meta Description نباید بیشتر از 170 کاراکتر باشد.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------------------------
    // CANONICAL (اختیاری)
    // ---------------------------------------------------------

    const canonicalResult = normalizeCanonical(canonical);

    if ("error" in canonicalResult) {
      return NextResponse.json(
        {
          success: false,
          message: canonicalResult.error,
        },
        { status: 400 }
      );
    }

    const cleanCanonical = canonicalResult.value;

        const ogImageResult = parseOgImage(ogImage);
    if ("error" in ogImageResult) {
      return NextResponse.json(
        { success: false, message: ogImageResult.error },
        { status: 400 }
      );
    }
    const cleanOgImage = ogImageResult.value;
    const cleanOgImageAlt = cleanAlt(ogImageAlt);

    // ---------------------------------------------------------
    // CURRENT PAGE
    // ---------------------------------------------------------

    const currentPage = await PageSeo.findOne({
      pageKey,
    });

    /*
     * اگر رکورد قبلی وجود داشته باشد، Slug قبلی همان Slug ذخیره‌شده است.
     *
     * اگر رکورد برای اولین بار ساخته شود، باید Route واقعی اولیه
     * صفحه را به عنوان oldSlug در نظر بگیریم.
     *
     * مثال:
     * اولین ذخیره:
     * services -> services-test
     *
     * در این حالت oldSlug باید services باشد.
     */
    const oldSlug =
      currentPage?.slug !== undefined
        ? currentPage.slug
        : pageDefinition.defaultSlug;

    // ---------------------------------------------------------
    // SLUG OWNER
    // ---------------------------------------------------------

    const slugOwner = await PageSeo.findOne({
      slug: cleanSlug,
      pageKey: {
        $ne: pageKey,
      },
    });

    if (slugOwner) {
      return NextResponse.json(
        {
          success: false,
          message:
            "این Route قبلاً برای صفحه دیگری استفاده شده است.",
        },
        { status: 409 }
      );
    }

    // ---------------------------------------------------------
    // SAVE PAGE SEO
    // ---------------------------------------------------------

    const updatedPage = await PageSeo.findOneAndUpdate(
      {
        pageKey,
      },
      {
        $set: {
          pageName: pageDefinition.pageName,
          h1Title: cleanH1Title,
          slug: cleanSlug,
          metaTitle: cleanMetaTitle,
          metaDescription: cleanMetaDescription,
          index: Boolean(index),
          follow: Boolean(follow),
          canonical: cleanCanonical,
          ogImage: cleanOgImage,
          ogImageAlt: cleanOgImageAlt,
        },
      },
      {
        returnDocument: "after",
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

    // ---------------------------------------------------------
    // 301 REDIRECT
    //
    // مثال:
    //
    // اولین تغییر:
    // /services -> /services-p
    //
    // تغییر دوم:
    // /services-p -> /services-test
    //
    // در کنار آن Redirect قبلی نیز مستقیماً به مقصد جدید
    // تغییر می‌کند:
    //
    // /services -> /services-test
    // /services-p -> /services-test
    // ---------------------------------------------------------

    if (oldSlug !== cleanSlug) {
      const getSeoPath = (key: string, value: string) => {
        if (!value) return "/";
        if (key === "authors") return `/${value}`;
        if (key.startsWith("author-")) return `/authors/${value}`;
        return `/${value}`;
      };

      const oldPath = getSeoPath(pageKey, oldSlug);
      const newPath = getSeoPath(pageKey, cleanSlug);

      if (oldPath !== newPath) {
        // 1) هر ریدایرکت قدیمی که به oldPath ختم می‌شد رو
        //    به‌جای پاک کردن، به newPath ری‌پوینت کن
        //    (زنجیره قطع نشه، همیشه یه هاپ بمونه)
        await SeoRedirect.updateMany(
          { toPath: oldPath },
          { $set: { toPath: newPath } }
        );

        // 2) اگر newPath قبلاً خودش fromPath یه ریدایرکت دیگه بوده
        //    (یعنی قبلاً یه مسیر ریدایرکتی بوده، الان قراره صفحه واقعی بشه)
        //    اون تداخل رو پاک کن
        await SeoRedirect.deleteMany({
          fromPath: newPath,
        });

        // 3) خود ریدایرکت اصلی رو بساز/آپدیت کن: oldPath -> newPath
        await SeoRedirect.findOneAndUpdate(
          { fromPath: oldPath },
          {
            $set: {
              toPath: newPath,
              statusCode: 301,
              matchType: "exact",
              isActive: true,
            },
          },
          { upsert: true }
        );
      }
    }

    // ---------------------------------------------------------
    // RESPONSE
    // ---------------------------------------------------------

    return NextResponse.json({
      success: true,
      message: "تنظیمات SEO با موفقیت ذخیره شد.",
      page: updatedPage,
    });
  } catch (error: any) {
    console.error("POST /api/admin/seo error:", error);

    // Mongo duplicate key
    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "این Route یا شناسه صفحه قبلاً استفاده شده است.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ذخیره تنظیمات SEO.",
      },
      {
        status: 500,
      }
    );
  }
}
