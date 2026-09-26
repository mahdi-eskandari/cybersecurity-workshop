import { headers } from "next/headers";
import SinglePostClient from "./SinglePostClient";
import type { ApprovedComment } from "@/components/CommentSection";

type RawBlogPost = {
  _id?: string;
  id?: string;
  title?: string;
  slug?: string;
  author?: string;
  categoryId?: string;
  tags?: string[];
  status?: "draft" | "published";
  postType?: "normal" | "special";
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  content?: string;
  wordCount?: number;
  readingTime?: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
};

type BlogPost = {
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
};

type MediaItem = {
  id: string;
  name: string;
  alt: string;
  url: string;
};

function normalizePost(post: RawBlogPost): BlogPost | null {
  const id = post._id || post.id;

  if (!id) return null;

  return {
    _id: String(id),
    title: String(post.title || ""),
    slug: String(post.slug || ""),
    author: String(post.author || ""),
    categoryId: String(post.categoryId || ""),
    tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    status: post.status === "published" ? "published" : "draft",
    postType: post.postType === "special" ? "special" : "normal",
    featuredImage: post.featuredImage || null,
    featuredImageAlt: post.featuredImageAlt || null,
    content: String(post.content || ""),
    wordCount: Number(post.wordCount || 0),
    readingTime: Number(post.readingTime || 0),
    metaTitle: String(post.metaTitle || ""),
    metaDescription: String(post.metaDescription || ""),
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

export const dynamic = "force-dynamic";

async function fetchServerJson(
  url: string,
  timeoutMs = 10000
): Promise<{ response: Response; data: any }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });

    const data = await response.json();
    return { response, data };
  } finally {
    clearTimeout(timeout);
  }
}

// نظراتِ تایید و منتشرشده‌ی یک پست را سمت سرور می‌گیرد.
// عمداً خطاها را می‌بلعد و [] برمی‌گرداند تا یک خطای موقتِ روتر
// کامنت‌ها، کل صفحه‌ی پست را از کار نیندازد.
async function fetchApprovedComments(
  baseUrl: string,
  postId: string
): Promise<ApprovedComment[]> {
  try {
    const { response, data } = await fetchServerJson(
      `${baseUrl}/api/comments?postId=${encodeURIComponent(postId)}&status=approved&limit=200`
    );

    if (!response.ok) return [];

    return Array.isArray(data?.comments) ? data.comments : [];
  } catch (error) {
    console.error("GET approved comments error:", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") || "http";

  if (!host) {
    return (
      <div className="min-h-screen">
        <SinglePostClient
          initialPost={null}
          initialAllPosts={[]}
          initialMediaItems={[]}
          initialComments={[]}
          initialError
        />
      </div>
    );
  }

  const baseUrl = `${protocol}://${host}`;

  try {
    const { response: postsResponse, data: postsData } =
      await fetchServerJson(`${baseUrl}/api/posts`);

    if (!postsResponse.ok) {
      throw new Error(
        postsData?.message || "خطا در دریافت پست‌ها"
      );
    }

    const rawPosts: RawBlogPost[] = Array.isArray(postsData)
      ? postsData
      : Array.isArray(postsData?.posts)
      ? postsData.posts
      : [];

    const normalizedPosts = rawPosts
      .map(normalizePost)
      .filter(
        (item): item is BlogPost => item !== null
      );

    const publishedPosts = normalizedPosts.filter(
      (item) => item.status === "published"
    );

    const currentPost =
      publishedPosts.find(
        (item) =>
          item.slug === slug ||
          item._id === slug
      ) || null;

    // media و comments مستقل از هم هستن، پس با هم موازی می‌گیریمشون.
    // comments فقط وقتی معنی داره که پستی پیدا شده باشه.
    const [mediaResult, commentsResult] = await Promise.allSettled([
      fetchServerJson(`${baseUrl}/api/media`),
      currentPost
        ? fetchApprovedComments(baseUrl, currentPost._id)
        : Promise.resolve([] as ApprovedComment[]),
    ]);

    let mediaItems: MediaItem[] = [];

    if (mediaResult.status === "fulfilled") {
      const { response: mediaResponse, data: mediaData } = mediaResult.value;

      if (mediaResponse.ok) {
        mediaItems = Array.isArray(mediaData)
          ? mediaData
          : Array.isArray(mediaData?.media)
          ? mediaData.media
          : Array.isArray(mediaData?.items)
          ? mediaData.items
          : [];
      }
    }

    const initialComments: ApprovedComment[] =
      commentsResult.status === "fulfilled" ? commentsResult.value : [];

    return (
      <div className="min-h-screen">
        <SinglePostClient
          initialPost={currentPost}
          initialAllPosts={publishedPosts}
          initialMediaItems={mediaItems}
          initialComments={initialComments}
        />
      </div>
    );
  } catch (error) {
    console.error("GET single blog error:", error);

    return (
      <div className="min-h-screen">
        <SinglePostClient
          initialPost={null}
          initialAllPosts={[]}
          initialMediaItems={[]}
          initialComments={[]}
          initialError
        />
      </div>
    );
  }
}
