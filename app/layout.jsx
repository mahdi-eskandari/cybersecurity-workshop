
import { Poppins, Vazirmatn  } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

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


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "پاراهور | جرم‌شناسی دیجیتال",
  description: "کشف و ردیابی هویت دیجیتال مجرم",
};

export default function SiteLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      
      <body className={`${vazirmatn.variable} ${poppins.variable}`}>
    <ThemeProvider>
      {children}
    </ThemeProvider>
      </body>
    </html>
  );
}


