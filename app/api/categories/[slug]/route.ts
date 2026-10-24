import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "../../../model/category";
import Post from "../../../model/blog";
import { isAdmin } from "@/lib/adminAuth";

type Ctx = { params: Promise<{ slug: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 401 });
    }

    await connectDB();

    const { slug } = await params;
    const { label } = await request.json();
    const cleanLabel = String(label ?? "").trim();

    if (!cleanLabel) {
      return NextResponse.json(
        { message: "نام دسته‌بندی الزامی است" },
        { status: 400 }
      );
    }

    const updated: any = await Category.findOneAndUpdate(
      { slug },
      { label: cleanLabel },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json(
        { message: "دسته‌بندی پیدا نشد" },
        { status: 404 }
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