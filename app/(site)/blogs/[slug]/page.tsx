import { notFound } from "next/navigation";
import SinglePostClient from "./SinglePostClient";
import type { ApprovedComment } from "@/components/CommentSection";
import { SITE_URL } from "@/lib/seo";
import {
  buildOrganizationSchema,
  buildBreadcrumbSchema,
  buildArticleSchema,
} from "@/lib/schema";
import {
  getPublishedPost,
  getRelatedPosts,
  getApprovedComments,
  getCategoriesList,
  type PlainPost,
} from "@/lib/publicPosts";

export const dynamic = "force-dynamic";

function toAbsoluteUrl(url: string | null | undefined) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function PostJsonLd({ post }: { post: PlainPost }) {
  const url = `${SITE_URL}/blogs/${post.slug || post._id}`;
  const description =
    post.metaDescription || stripHtml(post.content).slice(0, 160);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildArticleSchema({
        title: post.metaTitle || post.title,
        description,
        url,
        imageUrl: toAbsoluteUrl(post.featuredImage),
        authorName: post.author || undefined,
        publishedAt: post.createdAt,
        updatedAt: post.updatedAt,
      }),
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: "صفحه اصلی", url: `${SITE_URL}/` },
        { name: "وبلاگ", url: `${SITE_URL}/blogs` },
        { name: post.title, url },
      ]),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: PlainPost | null = null;
  let related: PlainPost[] = [];
  let comments: ApprovedComment[] = [];
  let categories: unknown[] = [];

  try {
    post = await getPublishedPost(slug);

    if (post) {
      const current = post;
      [related, comments, categories] = await Promise.all([
        getRelatedPosts(current).catch(() => [] as PlainPost[]),
        getApprovedComments(current._id).catch(() => [] as ApprovedComment[]),
        getCategoriesList().catch(() => []),
      ]);
    }
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

  // notFound بیرون از try/catch (خودش throw می‌کند)
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <PostJsonLd post={post} />
      <SinglePostClient
        initialPost={post}
        initialAllPosts={related}
        initialMediaItems={[]}
        initialComments={comments}
        initialCategories={categories}
      />
    </div>
  );
}