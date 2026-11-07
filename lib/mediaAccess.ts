import Post from "../app/model/blog";
import SiteSeo from "../app/model/SiteSeo";

/**
 * رسانه عمومی است اگر در پست published به‌عنوان تصویر شاخص یا داخل محتوا
 * استفاده شده باشد، یا OG پیش‌فرض سایت باشد.
 */
export async function isMediaPublic(
  id: string,
  url?: string
): Promise<boolean> {
  if (!/^[a-f\d]{24}$/i.test(id)) return false;

  const path = `/api/media/${id}`;
  const candidates = [id, path];
  if (url) candidates.push(url);

  // featuredImage ممکن است id، /api/media/id یا data URL باشد
  const featuredRegex = new RegExp(id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  try {
    const [asFeatured, inContent, site] = await Promise.all([
      Post.exists({
        status: "published",
        $or: [
          { featuredImage: { $in: candidates } },
          { featuredImage: featuredRegex },
        ],
      }),
      Post.exists({
        status: "published",
        content: { $regex: featuredRegex },
      }),
      SiteSeo.findOne({ key: "site" })
        .select("defaultOgImage")
        .lean()
        .catch(() => null),
    ]);

    if (asFeatured || inContent) return true;

    const og = (site as { defaultOgImage?: string } | null)?.defaultOgImage;
    if (typeof og === "string" && (og.endsWith(id) || og.includes(id))) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("isMediaPublic error:", err);
    return false;
  }
}