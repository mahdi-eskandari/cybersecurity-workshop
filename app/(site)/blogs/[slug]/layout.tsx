import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

type BlogPost = {
  title?: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  status?: "draft" | "published";
  index?: boolean;   // اضافه شد
  follow?: boolean;  // اضافه شد
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/posts`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const result = await response.json();

    const posts: BlogPost[] = Array.isArray(result)
      ? result
      : Array.isArray(result?.posts)
        ? result.posts
        : [];

    const post = posts.find(
      (item) =>
        item.status === "published" &&
        item.slug === slug
    );

    if (!post) {
      return {
        title: "مقاله پیدا نشد | پاراهور",
        description:
          "مقاله موردنظر در پایگاه دانش پاراهور پیدا نشد.",
        robots: {
          index: false,
          follow: true,
        },
      };
    }

    // عنوان اصلی مقاله
const rawTitle = post.title?.trim() || "مقاله";

const title = rawTitle.endsWith("| پاراهور")
  ? rawTitle
  : `${rawTitle} | پاراهور`;

    const description =
      post.metaDescription?.trim() ||
      `مطالعه ${
        post.title || "این مقاله"
      } در پایگاه دانش پاراهور؛ مطالب تخصصی درباره تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.`;

    const canonicalUrl = `${baseUrl}/blogs/${
      post.slug || slug
    }`;

    const imageUrl = post.featuredImage
      ? post.featuredImage.startsWith("http")
        ? post.featuredImage
        : `${baseUrl}${post.featuredImage}`
      : `${baseUrl}/logo.jpg`;

    return {
      title,
      description,

      alternates: {
        canonical: canonicalUrl,
      },

robots: {
  index: post.index ?? true,
  follow: post.follow ?? true,
},

      openGraph: {
        type: "article",
        locale: "fa_IR",
        siteName: "پاراهور",
        title,
        description,
        url: canonicalUrl,
        images: [
          {
            url: imageUrl,
            alt:
              post.featuredImageAlt ||
              post.title ||
              "پاراهور",
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("BLOG METADATA ERROR:", error);

    return {
      title: "پایگاه دانش | پاراهور",
      description:
        "مقالات و مطالب تخصصی پاراهور درباره تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default function BlogPostLayout({
  children,
}: Props) {
  return children;
}