import type { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import Service from "@/app/model/Service";
import { SITE_URL, getSocialDefaults } from "@/lib/seo";
import { resolveCanonical } from "@/lib/seoFields";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {}

  try {
    await connectDB();

    const service: any = await Service.findOne({
      slug: decoded.trim().toLowerCase(),
      status: "active",
    })
      .select("slug title shortDesc metaTitle metaDescription index follow canonical")
      .lean();

    if (!service) {
      return {
        title: { absolute: "خدمت پیدا نشد | پاراهور" },
        description: "خدمت موردنظر در خدمات پاراهور پیدا نشد.",
        robots: { index: false, follow: true },
      };
    }

    const rawTitle =
      service.metaTitle?.trim() || service.title?.trim() || "خدمات پاراهور";

    const title = rawTitle.includes("پاراهور")
      ? rawTitle
      : `${rawTitle} | پاراهور`;

    const description =
      service.metaDescription?.trim() ||
      service.shortDesc?.trim() ||
      `آشنایی با ${
        service.title || "خدمات تخصصی پاراهور"
      } در حوزه تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.`;

        const canonicalUrl = resolveCanonical(
      service.canonical,
      `${SITE_URL}/services/${service.slug || decoded}`,
      SITE_URL
    );
    const social = await getSocialDefaults();

    return {
      title: { absolute: title },
      description,
      alternates: { canonical: canonicalUrl },
      robots: {
        index: service.index ?? true,
        follow: service.follow ?? true,
      },
      openGraph: {
        type: "website",
        locale: "fa_IR",
        siteName: social.siteName,
        title,
        description,
        url: canonicalUrl,
        images: [
          { url: social.image, alt: social.imageAlt || service.title || "پاراهور" },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: social.twitterSite,
        title,
        description,
        images: [social.image],
      },
    };
  } catch (error) {
    console.error("SERVICE METADATA ERROR:", error);

    return {
      title: { absolute: "پاراهور | خدمات تحقیقات سایبری و فارنزیک" },
      description:
        "خدمات تخصصی پاراهور در حوزه تحقیقات سایبری، فارنزیک دیجیتال و تحلیل شواهد دیجیتال.",
      robots: { index: false, follow: true },
    };
  }
}

export default function ServiceLayout({ children }: Props) {
  return children;
}