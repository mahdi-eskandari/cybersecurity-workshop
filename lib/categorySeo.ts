import connectDB from "./mongodb";
import Category from "../app/model/category";

export type CategorySeo = {
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  ogImageAlt: string;
  index: boolean;
  follow: boolean;
  canonical: string;
};

export const EMPTY_CATEGORY_SEO: CategorySeo = {
  metaTitle: "",
  metaDescription: "",
  ogImage: "",
  ogImageAlt: "",
  index: true,
  follow: true,
  canonical: "",
};

export function normalizeCategorySeo(raw: any): CategorySeo {
  const r = raw && typeof raw === "object" ? raw : {};
  return {
    metaTitle: typeof r.metaTitle === "string" ? r.metaTitle.trim() : "",
    metaDescription:
      typeof r.metaDescription === "string" ? r.metaDescription.trim() : "",
    ogImage: typeof r.ogImage === "string" ? r.ogImage.trim() : "",
    ogImageAlt: typeof r.ogImageAlt === "string" ? r.ogImageAlt.trim() : "",
    index: r.index !== false,
    follow: r.follow !== false,
        canonical: typeof r.canonical === "string" ? r.canonical.trim() : "",
  };
}

// اگر دیتابیس خطا بدهد، مقدار خالی برمی‌گردد و صفحه با متن خودکار کار می‌کند
export async function getCategorySeo(slug: string): Promise<CategorySeo> {
  try {
    await connectDB();
    const doc = await Category.findOne({ slug })
      .select("metaTitle metaDescription ogImage ogImageAlt canonical index follow")
      .lean()
      .exec();
    return normalizeCategorySeo(doc);
  } catch (error) {
    console.error("getCategorySeo error:", error);
    return EMPTY_CATEGORY_SEO;
  }
}