import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "وبلاگ",

  description:
    "مطالب تخصصی پاراهور درباره تحقیقات سایبری، فارنزیک دیجیتال، امنیت اطلاعات، جرایم سایبری و تحلیل شواهد دیجیتال.",

  alternates: {
    canonical: "https://parahoor.com/blogs",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "پاراهور",
    title: "وبلاگ | پاراهور",
    description:
      "مطالب تخصصی پاراهور درباره تحقیقات سایبری، فارنزیک دیجیتال، امنیت اطلاعات، جرایم سایبری و تحلیل شواهد دیجیتال.",
    url: "https://parahoor.com/blogs",
    images: [
      {
        url: "https://parahoor.com/logo.jpg",
        alt: "وبلاگ پاراهور",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "وبلاگ | پاراهور",
    description:
      "مطالب تخصصی پاراهور درباره تحقیقات سایبری، فارنزیک دیجیتال، امنیت اطلاعات، جرایم سایبری و تحلیل شواهد دیجیتال.",
    images: ["https://parahoor.com/logo.jpg"],
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}