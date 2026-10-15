// import { Poppins } from "next/font/google";
// import localFont from "next/font/local";
// import "./globals.css";
// import { ThemeProvider } from "../components/ThemeProvider";
// import type { Metadata } from "next";
// import "@fontsource/jetbrains-mono/400.css";
// import "@fontsource/jetbrains-mono/500.css";
// import { cookies } from "next/headers";

// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   display: "swap",
//   weight: ["400", "500", "600", "700"],
// });

// const vazirmatn = localFont({
//   src: [
//     { path: "./fonts/vazirmatn/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
//     { path: "./fonts/vazirmatn/Vazirmatn-Medium.woff2", weight: "500", style: "normal" },
//     { path: "./fonts/vazirmatn/Vazirmatn-SemiBold.woff2", weight: "600", style: "normal" },
//     { path: "./fonts/vazirmatn/Vazirmatn-Bold.woff2", weight: "700", style: "normal" },
//   ],
//   variable: "--font-vazirmatn",
//   display: "swap",
// });



// export const metadata: Metadata = {
//   metadataBase: new URL("https://parahoor.com"),

//   title: {
//     default: "آژانس تحقیقات سایبری و فارنزیک | پاراهور",
//     template: "%s | پاراهور",
//   },

//   description:
//     "پاراهور، آژانس تخصصی تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",

//   robots: {
//     index: true,
//     follow: true,
//   },
//   icons: {
//     icon: "/favicon.ico?v=3",
//   },

// };

// export default async function SiteLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const cookieStore = await cookies();
//   const isDark = cookieStore.get("theme")?.value !== "light";

//   return (
//     <html
//       lang="fa"
//       dir="rtl"
//       className={`${isDark ? "dark" : ""} ${vazirmatn.variable} ${poppins.variable}`}
//       suppressHydrationWarning
//     >
//       <body>
//         <ThemeProvider initialDark={isDark}>
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }




import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import type { Metadata } from "next";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import { cookies } from "next/headers";
import { getSiteSeo } from "@/lib/siteSeo";
import { resolveSiteRobotsMeta } from "@/lib/siteSeoShared";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const vazirmatn = localFont({
  src: [
    { path: "./fonts/vazirmatn/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/vazirmatn/Vazirmatn-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/vazirmatn/Vazirmatn-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/vazirmatn/Vazirmatn-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});



export const metadata: Metadata = {
  metadataBase: new URL("https://parahoor.com"),

  title: {
    default: "آژانس تحقیقات سایبری و فارنزیک | پاراهور",
    template: "%s | پاراهور",
  },

  description:
    "پاراهور، آژانس تخصصی تحقیقات سایبری، فارنزیک دیجیتال، تحلیل شواهد دیجیتال و بررسی جرایم سایبری.",

  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico?v=3",
  },

};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isDark = cookieStore.get("theme")?.value !== "light";

  // سئو سراسری: فقط وقتی ادمین noindex/nofollow سراسری را روشن کرده، متا robots اضافه می‌شود.
  // در صورت هر خطا چیزی تزریق نمی‌شود و سایت دقیقاً مثل قبل می‌ماند.
  let siteRobots: string | null = null;
  let googleVerification = "";
  try {
    const siteSeo = await getSiteSeo();
    siteRobots = resolveSiteRobotsMeta(siteSeo);
    googleVerification = siteSeo.googleVerification;
  } catch {}

  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${isDark ? "dark" : ""} ${vazirmatn.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      {siteRobots || googleVerification ? (
        <head>
          {siteRobots ? <meta name="robots" content={siteRobots} /> : null}
          {googleVerification ? (
            <meta name="google-site-verification" content={googleVerification} />
          ) : null}
        </head>
      ) : null}
      <body>
        <ThemeProvider initialDark={isDark}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}