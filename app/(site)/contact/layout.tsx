import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تماس با ما",

  description:
    "راه‌های ارتباط با پاراهور برای دریافت مشاوره و خدمات تخصصی در حوزه تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.",

  alternates: {
    canonical: "https://parahoor.com/contact",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "پاراهور",
    title: "تماس با ما",
    description:
      "راه‌های ارتباط با پاراهور برای دریافت مشاوره و خدمات تخصصی در حوزه تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.",
    url: "https://parahoor.com/contact",
    images: [
      {
        url: "https://parahoor.com/logo.jpg",
        alt: "پاراهور",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "تماس با ما",
    description:
      "راه‌های ارتباط با پاراهور برای دریافت مشاوره و خدمات تخصصی در حوزه تحقیقات سایبری، فارنزیک دیجیتال و امنیت اطلاعات.",
    images: ["https://parahoor.com/logo.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}