import Post from "../app/model/blog";
import SiteSeo from "../app/model/SiteSeo";

export async function isMediaPublic(id: string, url: string): Promise<boolean> {
  if (!/^[a-f\d]{24}$/i.test(id)) return false;

  const path = `/api/media/${id}`;

  const [asFeatured, inContent, site] = await Promise.all([
    Post.exists({ status: "published", featuredImage: { $in: [id, path, url] } }),
    Post.exists({ status: "published", content: { $regex: id } }),
    SiteSeo.findOne({ key: "site" }).select("defaultOgImage").lean(),
  ]);

  if (asFeatured || inContent) return true;

  const og = (site as { defaultOgImage?: string } | null)?.defaultOgImage;
  return typeof og === "string" && og.endsWith(id);
}