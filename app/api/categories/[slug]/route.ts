import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "../../../model/category";
import Post from "../../../model/blog";
import SeoRedirect from "../../../model/SeoRedirect";
import PageSeo from "../../../model/PageSeo";
import { isAdmin } from "@/lib/adminAuth";
import { clearPostsLiteCache } from "@/lib/publicPosts";

type Ctx = { params: Promise<{ slug: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 401 });
    }

    await connectDB();

    const { slug } = await params;
    const body = await request.json();
    const cleanLabel = String(body?.label ?? "").trim();

    // اگر newSlug نیومده یا با قبلی یکی بود، slug تغییر نمی‌کنه
    const rawNewSlug =
      typeof body?.newSlug === "string" ? body.newSlug.trim().toLowerCase() : "";
    const newSlug = rawNewSlug || slug;
    const slugChanged = newSlug !== slug;

    if (!cleanLabel) {
      return NextResponse.json(
        { message: "نام دسته‌بندی الزامی است" },
        { status: 400 }
      );
    }

    if (slugChanged) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(newSlug)) {
        return NextResponse.json(
          { message: "نامک فقط حروف انگلیسی، عدد و خط تیره باشد" },
          { status: 400 }
        );
      }

      const taken = await Category.findOne({ slug: newSlug }).lean();
      if (taken) {
        return NextResponse.json(
          { message: "این نامک قبلاً استفاده شده است" },
          { status: 409 }
        );
      }
    }

    const updated: any = await Category.findOneAndUpdate(
      { slug },
      { label: cleanLabel, ...(slugChanged ? { slug: newSlug } : {}) },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 }
      );
    }

    if (slugChanged) {
      // ۱) پست‌ها رو به slug جدید منتقل کن
      await Post.updateMany({ categoryId: slug }, { $set: { categoryId: newSlug } });
      clearPostsLiteCache();

      // ۲) ریدایرکت ۳۰۱ از آدرس قدیمی به جدید
      const base = await PageSeo.findOne({ pageKey: "blogs" })
        .select("slug")
        .lean();
      const baseSlug = (base as any)?.slug || "blogs";

      const oldPath = `/${baseSlug}/category/${slug}`;
      const newPath = `/${baseSlug}/category/${newSlug}`;

      await SeoRedirect.updateMany({ toPath: oldPath }, { $set: { toPath: newPath } });
      await SeoRedirect.deleteMany({ fromPath: newPath });
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

    return NextResponse.json({ id: updated.slug, label: updated.label });
  } catch (error) {
    console.error("PATCH /api/categories/[slug] error:", error);
    return NextResponse.json(
      { message: "خطا در ویرایش دسته‌بندی" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 401 });
    }

    await connectDB();

    const { slug } = await params;

    if ((await Category.countDocuments()) <= 1) {
      return NextResponse.json(
        { message: "حداقل یک دسته‌بندی باید باقی بماند" },
        { status: 409 }
      );
    }

    const postsCount = await Post.countDocuments({ categoryId: slug });

    if (postsCount > 0) {
      return NextResponse.json(
        {
          message: `${postsCount} پست در این دسته‌بندی وجود دارد. اول دسته‌بندی اون پست‌ها رو عوض کن.`,
        },
        { status: 409 }
      );
    }

    const deleted = await Category.findOneAndDelete({ slug }).lean();

    if (!deleted) {
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/categories/[slug] error:", error);
    return NextResponse.json(
      { message: "خطا در حذف دسته‌بندی" },
      { status: 500 }
    );
  }
}