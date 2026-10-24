import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "../../model/category";
import { isAdmin } from "@/lib/adminAuth";

const DEFAULT_CATEGORIES = [
  { slug: "forensic-reports", label: "گزارش‌های جرم‌شناسی", order: 1 },
  { slug: "legal-news", label: "اخبار حقوقی", order: 2 },
  { slug: "solved-cases", label: "پرونده‌های حل‌شده", order: 3 },
  { slug: "security-alerts", label: "هشدارهای امنیتی", order: 4 },
  { slug: "security-education", label: "آموزش امنیت و تهدیدات سایبری", order: 5 },
];

export async function GET() {
  try {
    await connectDB();

    if ((await Category.countDocuments()) === 0) {
      await Category.insertMany(DEFAULT_CATEGORIES).catch(() => {});
    }

    const categories = await Category.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json(
      categories.map((c: any) => ({ id: c.slug, label: c.label }))
    );
  } catch (error) {
    console.error("GET /api/categories error:", error);
    return NextResponse.json(
      { message: "خطا در دریافت دسته‌بندی‌ها" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 401 });
    }

    await connectDB();

    const { label, slug } = await request.json();
    const cleanLabel = String(label ?? "").trim();
    const cleanSlug = String(slug ?? "").trim().toLowerCase();

    if (!cleanLabel) {
      return NextResponse.json(
        { message: "نام دسته‌بندی الزامی است" },
        { status: 400 }
      );
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanSlug)) {
      return NextResponse.json(
        { message: "نامک فقط حروف انگلیسی، عدد و خط تیره باشد" },
        { status: 400 }
      );
    }

    if (await Category.findOne({ slug: cleanSlug }).lean()) {
      return NextResponse.json(
        { message: "این نامک قبلاً استفاده شده است" },
        { status: 409 }
      );
    }

    const last: any = await Category.findOne().sort({ order: -1 }).lean();

    const created = await Category.create({
      label: cleanLabel,
      slug: cleanSlug,
      order: (last?.order ?? 0) + 1,
    });

    return NextResponse.json(
      { id: created.slug, label: created.label },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json(
      { message: "خطا در ساخت دسته‌بندی" },
      { status: 500 }
    );
  }
}