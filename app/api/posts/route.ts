

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "../../model/blog";
import { isAdmin } from "@/lib/adminAuth";
import { clearPostsLiteCache } from "@/lib/publicPosts";
import { parseCanonical, parseOgImage, cleanAlt } from "@/lib/seoFields";

export async function GET(request: Request) {
  try {
    await connectDB();

    // شمارش دسته‌های پرپست: /api/posts?topCategories=3
    const { searchParams } = new URL(request.url);
    const topCategories = Number(searchParams.get("topCategories"));

    if (Number.isInteger(topCategories) && topCategories > 0) {
      // عمداً فقط published، حتی اگه ادمین لاگین باشه
      const result = await Post.aggregate([
        { $match: { status: "published" } },
        { $group: { _id: "$categoryId", count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } },
        { $limit: Math.min(topCategories, 10) },
      ]);

      return NextResponse.json(
        result.map((r) => ({ categoryId: r._id, count: r.count }))
      );
    }

    const filter = (await isAdmin()) ? {} : { status: "published" };

    const posts = await Post.find(filter)
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/posts error:", error);

    return NextResponse.json(
      { message: "خطا در دریافت پست‌ها" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // دفاع در عمق: علاوه بر middleware، خود route هم ادمین بودن رو چک می‌کنه
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    await connectDB();

    const body = await request.json();

    const {
      title,
      slug,
      content,
      status = "draft",
      postType = "normal",
      author,
      authorId,
      categoryId,
      tags = [],
      featuredImage = null,
      featuredImageAlt = null,
      wordCount = 0,
      readingTime = 0,
      metaTitle,
      metaDescription,
            index = true,
      follow = true,
            ogImage = "",
      ogImageAlt = "",
      canonical = "",
    } = body;

    const finalAuthor = author ?? authorId;

    if (!title?.trim()) {
      return NextResponse.json(
        { message: "عنوان پست الزامی است" },
        { status: 400 }
      );
    }

    if (!slug?.trim()) {
      return NextResponse.json(
        { message: "Slug الزامی است" },
        { status: 400 }
      );
    }

    if (!content?.trim()) {
      return NextResponse.json(
        { message: "محتوای پست الزامی است" },
        { status: 400 }
      );
    }

    if (!finalAuthor?.trim()) {
      return NextResponse.json(
        { message: "نویسنده الزامی است" },
        { status: 400 }
      );
    }

    if (!categoryId?.trim()) {
      return NextResponse.json(
        { message: "دسته‌بندی الزامی است" },
        { status: 400 }
      );
    }

    if (!metaTitle?.trim()) {
      return NextResponse.json(
        { message: "عنوان سئو الزامی است" },
        { status: 400 }
      );
    }

    if (!metaDescription?.trim()) {
      return NextResponse.json(
        { message: "توضیحات سئو الزامی است" },
        { status: 400 }
      );
    }

    if (postType !== "normal" && postType !== "special") {
      return NextResponse.json(
        { message: "نوع پست معتبر نیست" },
        { status: 400 }
      );
    }

        const canonicalResult = parseCanonical(canonical);
    if ("error" in canonicalResult) {
      return NextResponse.json({ message: canonicalResult.error }, { status: 400 });
    }
    const ogImageResult = parseOgImage(ogImage);
    if ("error" in ogImageResult) {
      return NextResponse.json({ message: ogImageResult.error }, { status: 400 });
    }

    const normalizedSlug = slug.trim().toLowerCase();

    const existingPost = await Post.findOne({
      slug: normalizedSlug,
    }).lean();

    if (existingPost) {
      return NextResponse.json(
        { message: "این Slug قبلاً استفاده شده است" },
        { status: 409 }
      );
    }

    const post = await Post.create({
      title: title.trim(),
      slug: normalizedSlug,
      content,
      status,
      postType,
      author: finalAuthor.trim(),
      categoryId: categoryId.trim(),
      tags,
      featuredImage,
      featuredImageAlt,
      wordCount,
      readingTime,
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
            index: typeof index === "boolean" ? index : true,
      follow: typeof follow === "boolean" ? follow : true,
            canonical: canonicalResult.value,
      ogImage: ogImageResult.value,
      ogImageAlt: cleanAlt(ogImageAlt),
    });
    clearPostsLiteCache();

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/posts error:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        { message: "این Slug قبلاً استفاده شده است" },
        { status: 409 }
      );
    }

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
      { message: "خطا در ساخت پست" },
      { status: 500 }
    );
  }
}