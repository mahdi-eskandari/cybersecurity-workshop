import { Poppins, Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import type { Metadata } from "next";


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="dark"
      suppressHydrationWarning
      
    >
      
      <body
        className={`${vazirmatn.variable} ${poppins.variable}`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}