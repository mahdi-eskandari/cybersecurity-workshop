import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "خدمات تحقیقات سایبری و فارنزیک",

  description:
    "خدمات تخصصی پاراهور در حوزه تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",

  alternates: {
    canonical: "https://parahoor.com/services",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "پاراهور",
    title: "خدمات تحقیقات سایبری و فارنزیک",
    description:
      "خدمات تخصصی پاراهور در حوزه تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",
    url: "https://parahoor.com/services",
    images: [
      {
        url: "https://parahoor.com/logo.jpg",
        alt: "پاراهور",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "خدمات تحقیقات سایبری و فارنزیک",
    description:
      "خدمات تخصصی پاراهور در حوزه تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",
    images: ["https://parahoor.com/logo.jpg"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}