import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "درباره ما",

  description:
    "آشنایی با پاراهور، آژانس تخصصی تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",

  alternates: {
    canonical: "https://parahoor.com/about",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "پاراهور",
    title: "درباره ما",
    description:
      "آشنایی با پاراهور، آژانس تخصصی تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",
    url: "https://parahoor.com/about",
    images: [
      {
        url: "https://parahoor.com/logo.jpg",
        alt: "پاراهور",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "درباره ما",
    description:
      "آشنایی با پاراهور، آژانس تخصصی تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",
    images: ["https://parahoor.com/logo.jpg"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}