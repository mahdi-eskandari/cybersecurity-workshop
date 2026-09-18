import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "حریم خصوصی",

  description:
    "سیاست حفظ حریم خصوصی پاراهور و نحوه جمع‌آوری، استفاده، نگهداری و حفاظت از اطلاعات کاربران.",

  alternates: {
    canonical: "https://parahoor.com/privacy",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "پاراهور",
    title: "حریم خصوصی",
    description:
      "سیاست حفظ حریم خصوصی پاراهور و نحوه جمع‌آوری، استفاده، نگهداری و حفاظت از اطلاعات کاربران.",
    url: "https://parahoor.com/privacy",
    images: [
      {
        url: "https://parahoor.com/logo.jpg",
        alt: "پاراهور",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "حریم خصوصی",
    description:
      "سیاست حفظ حریم خصوصی پاراهور و نحوه جمع‌آوری، استفاده، نگهداری و حفاظت از اطلاعات کاربران.",
    images: ["https://parahoor.com/logo.jpg"],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}