import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import PageSeo from "../../../../model/PageSeo";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const pages = await PageSeo.find({})
      .select("pageKey slug")
      .lean();

    const map: Record<string, string> = {};

    pages.forEach((page) => {
      map[page.pageKey] = page.slug ?? "";
    });

    return NextResponse.json({
      success: true,
      pages: map,
    });
  } catch (error) {
    console.error("GET /api/admin/seo/pages error:", error);

    return NextResponse.json(
      { success: false, pages: {} },
      { status: 500 }
    );
  }
}