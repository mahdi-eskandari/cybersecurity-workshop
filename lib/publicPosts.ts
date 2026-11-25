import { cache } from "react";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import Post from "@/app/model/blog";
import Media from "@/app/model/media";
import Category from "@/app/model/category";
import Comment from "@/app/model/comment";

export type PlainPost = {
  _id: string;
  title: string;
  slug: string;
  author: string;
  categoryId: string;
  tags: string[];
  status: "draft" | "published";
  postType: "normal" | "special";
  featuredImage: string | null;
  featuredImageAlt: string | null;
  content: string;
  wordCount: number;
  readingTime: number;
  metaTitle: string;
  metaDescription: string;
  createdAt?: string;
  updatedAt?: string;
  index: boolean;
  follow: boolean;
};

const g = globalThis as unknown as {
  __pubPostsLite?: { at: number; value: PlainPost[] };
  __pubImgPath?: Map<string, { at: number; path: string | null }>;
};

const LIST_TTL = 15_000;
const IMG_TTL = 10 * 60_000;

export function clearPostsLiteCache() {
  g.__pubPostsLite = undefined;
}

/* ───── تصویر: همیشه به مسیر /api/media/:id تبدیل می‌شود ───── */

export async function resolveImagePath(
  value?: string | null
): Promise<string | null> {
  const v = (value || "").trim();
  if (!v) return null;

  if (v.startsWith("/api/media/") || /^https?:\/\//i.test(v)) return v;
  if (/^[a-f\d]{24}$/i.test(v)) return `/api/media/${v}`;
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  if (!v.startsWith("data:")) return null;

  // پست‌های قدیمی که base64 ذخیره کرده‌اند
  const map = (g.__pubImgPath ??= new Map());
  const key = crypto.createHash("sha1").update(v).digest("hex");
  const hit = map.get(key);
  if (hit && Date.now() - hit.at < IMG_TTL) return hit.path;

  await connectDB();
  const m: any = await Media.findOne({ url: v }).select("_id").lean();
  const path = m ? `/api/media/${m._id}` : null;
  map.set(key, { at: Date.now(), path });
  return path;
}

/* ───── خلاصه متن (برای کارت‌ها) ───── */

export function toExcerpt(html?: string, max = 170) {
  if (!html) return "";
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6])>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
  return text.slice(0, max + 1);
}

const iso = (v: unknown) => {
  if (!v) return undefined;
  const d = new Date(v as any);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
};

async function toPlain(
  doc: any,
  content: string,
  keepDataImage: boolean
): Promise<PlainPost> {
  const original = doc.featuredImage ? String(doc.featuredImage) : null;
  const resolved = await resolveImagePath(original);
  const fallback =
    keepDataImage || !original?.startsWith("data:") ? original : null;

  return {
    _id: String(doc._id),
    title: String(doc.title || ""),
    slug: String(doc.slug || ""),
    author: String(doc.author || ""),
    categoryId: String(doc.categoryId || ""),
    tags: Array.isArray(doc.tags) ? doc.tags.map(String) : [],
    status: doc.status === "published" ? "published" : "draft",
    postType: doc.postType === "special" ? "special" : "normal",
    featuredImage: resolved ?? fallback,
    featuredImageAlt: doc.featuredImageAlt || null,
    content,
    wordCount: Number(doc.wordCount || 0),
    readingTime: Number(doc.readingTime || 0),
    metaTitle: String(doc.metaTitle || ""),
    metaDescription: String(doc.metaDescription || ""),
    createdAt: iso(doc.createdAt),
    updatedAt: iso(doc.updatedAt),
    index: doc.index !== false,
    follow: doc.follow !== false,
  };
}

/* ───── لیست سبک پست‌های منتشرشده (content = فقط خلاصه) ───── */

export async function getPublishedPostsLite(): Promise<PlainPost[]> {
  const c = g.__pubPostsLite;
  if (c && Date.now() - c.at < LIST_TTL) return c.value;

  await connectDB();
  const docs = await Post.find({ status: "published" })
    .select(
      "title slug author categoryId tags status postType featuredImage featuredImageAlt content wordCount readingTime metaTitle metaDescription createdAt updatedAt"
    )
    .sort({ updatedAt: -1 })
    .lean();

  const value = await Promise.all(
    (docs as any[]).map((d) => toPlain(d, toExcerpt(d.content), false))
  );

  g.__pubPostsLite = { at: Date.now(), value };
  return value;
}

/* ───── یک پست کامل (برای صفحه پست و متا؛ در یک ریکوئست فقط یک‌بار اجرا می‌شود) ───── */

export const getPublishedPost = cache(
  async (rawSlug: string): Promise<PlainPost | null> => {
    let s = rawSlug;
    try {
      s = decodeURIComponent(rawSlug);
    } catch {}
    s = s.trim();
    if (!s) return null;

    await connectDB();

    const or: Record<string, unknown>[] = [{ slug: s }];
    if (/^[a-f\d]{24}$/i.test(s)) or.push({ _id: s });

    const doc: any = await Post.findOne({ status: "published", $or: or }).lean();
    if (!doc) return null;

    return toPlain(doc, String(doc.content || ""), true);
  }
);

export async function getRelatedPosts(post: PlainPost): Promise<PlainPost[]> {
  const list = await getPublishedPostsLite();
  return list
    .filter((p) => p._id !== post._id && p.categoryId === post.categoryId)
    .slice(0, 3);
}

export const getCategoriesList = cache(
  async (): Promise<{ id: string; label: string }[]> => {
    await connectDB();
    const cats: any[] = await Category.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return cats.map((c) => ({ id: String(c.slug), label: String(c.label) }));
  }
);

export async function getApprovedComments(postId: string) {
  await connectDB();
  const raw: any[] = await Comment.find({
    postId,
    approvalStatus: "approved",
  })
    .select("name comment createdAt parentCommentId")
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const names = new Map(raw.map((c) => [String(c._id), c.name]));

  return raw.map((c) => ({
    _id: String(c._id),
    name: String(c.name || ""),
    comment: String(c.comment || ""),
    createdAt: iso(c.createdAt) || "",
    parentCommentId: c.parentCommentId ? String(c.parentCommentId) : null,
    parentName: c.parentCommentId
      ? names.get(String(c.parentCommentId)) ?? null
      : null,
  }));
}