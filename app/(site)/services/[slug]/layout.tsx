import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

type Service = {
  slug?: string;
  title?: string;
  shortDesc?: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const response = await fetch(
      `${baseUrl}/api/services/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch service");
    }

    const result = await response.json();
    // console.log("METADATA API RESULT:", result);

    const service: Service | null =
      result?.data?.slug
        ? result.data
        : result?.service?.slug
          ? result.service
          : result?.slug
            ? result
            : null;

            // console.log("METADATA SERVICE:", service);

    if (!service) {
      return {
        title: "خدمت پیدا نشد | پاراهور",
        description: "خدمت موردنظر در خدمات پاراهور پیدا نشد.",
        robots: {
          index: false,
          follow: true,
        },
      };
    }

const rawTitle =
  service.metaTitle?.trim() ||
  service.title?.trim() ||
  "خدمات پاراهور";
  
  const title = rawTitle.includes("| پاراهور")
  ? rawTitle
  : `${rawTitle} | پاراهور`;

    const description =
      service.metaDescription?.trim() ||
      service.shortDesc?.trim() ||
      `آشنایی با ${
        service.title || "خدمات تخصصی پاراهور"
      } در حوزه تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.`;

    const canonicalUrl = `${baseUrl}/services/${
      service.slug || slug
    }`;

    const imageUrl = service.featuredImage
      ? service.featuredImage.startsWith("http")
        ? service.featuredImage
        : `${baseUrl}${service.featuredImage}`
      : `${baseUrl}/logo.jpg`;
// console.log("FINAL METADATA TITLE:", title);
    return {
      title,
      description,

      alternates: {
        canonical: canonicalUrl,
      },

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "website",
        locale: "fa_IR",
        siteName: "پاراهور",
        title,
        description,
        url: canonicalUrl,
        images: [
          {
            url: imageUrl,
            alt:
              service.featuredImageAlt ||
              service.title ||
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
  } catch(error) {
      // console.error("SERVICE METADATA ERROR:", error);

    return {
      title: "پاراهور | خدمات تحقیقات سایبری و فارنزیک",
      description:
        "خدمات تخصصی پاراهور در حوزه تحقیقات سایبری، فارنزیک دیجیتال و تحلیل شواهد دیجیتال.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default function ServiceLayout({ children }: Props) {
  return children;
}