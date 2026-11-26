import type { Metadata } from "next";
import { SITE_URL, getSocialDefaults } from "@/lib/seo";
import { getPublishedPost, resolveImagePath } from "@/lib/publicPosts";
import { resolveCanonical, resolveOgImage } from "@/lib/seoFields";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPublishedPost(slug);

    if (!post) {
      return {
        title: { absolute: "مقاله پیدا نشد | پاراهور" },
        description: "مقاله موردنظر در پایگاه دانش پاراهور پیدا نشد.",
        robots: { index: false, follow: true },
      };
    }

    const rawTitle = post.metaTitle.trim() || post.title.trim() || "مقاله";
    const title = rawTitle.includes("پاراهور")
      ? rawTitle
      : `${rawTitle} | پاراهور`;

    const description =
      post.metaDescription.trim() ||
      `مطالعه ${post.title || "این مقاله"} در پایگاه دانش پاراهور؛ مطالب تخصصی درباره تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.`;




        const canonicalUrl = resolveCanonical(
      post.canonical,
      `${SITE_URL}/blogs/${post.slug || slug}`,
      SITE_URL
    );

    const social = await getSocialDefaults();
    const customOg = resolveOgImage(post.ogImage, SITE_URL);

    const imgPath = await resolveImagePath(post.featuredImage);
    const featuredUrl = imgPath
      ? /^https?:\/\//i.test(imgPath) ? imgPath : `${SITE_URL}${imgPath}`
      : undefined;

    const imageUrl = customOg ?? featuredUrl ?? social.image;
    const imageAlt = customOg
      ? post.ogImageAlt || post.title || "پاراهور"
      : post.featuredImageAlt || post.title || "پاراهور";

    return {
      title: { absolute: title },
      description,
      alternates: { canonical: canonicalUrl },
      robots: { index: post.index, follow: post.follow },

      openGraph: {
        type: "article",
        locale: "fa_IR",
        siteName: social.siteName,
        title,
        description,
        url: canonicalUrl,
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: post.author ? [post.author] : undefined,
        images: [{ url: imageUrl, alt: imageAlt }],
      },

      twitter: {
        card: "summary_large_image",
        site: social.twitterSite,
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("BLOG METADATA ERROR:", error);

    return {
      title: { absolute: "پایگاه دانش | پاراهور" },
      description:
        "مقالات و مطالب تخصصی پاراهور درباره تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.",
      robots: { index: false, follow: true },
    };
  }
}

export default function BlogPostLayout({ children }: Props) {
  return children;
}