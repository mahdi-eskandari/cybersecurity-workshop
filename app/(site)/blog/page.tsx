"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search as SearchIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { useTheme } from "../../../components/ThemeProvider";

// ── types & data ──────────────────────────────────────────────────────────────

interface Article {
  id: number;
  img: string;
  date: string;
  readTime: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  initials: string;
  avatarColor: string;
}

const CATEGORIES = [
  { id: "همه", label: "همه مطالب" },
  { id: "تهدیدات سایبری", label: "تهدیدات سایبری" },
  { id: "اخبار حقوقی", label: "اخبار حقوقی" },
  {
    id: "گزارش‌های جرم‌شناسی",
    label: "گزارش‌های جرم‌شناسی",
  },
  { id: "هشدارهای امنیتی", label: "هشدارهای امنیتی" },
];

const FEATURED: Article = {
  id: 0,
  img: "1550751827-4bd374c3f58b",
  date: "۱۵ تیر ۱۴۰۳",
  readTime: "۱۲ دقیقه",
  category: "گزارش‌های جرم‌شناسی",
  title:
    "افشای شبکه باج‌افزاری بین‌المللی: گزارش اختصاصی تیم پاراهور",
  excerpt:
    "تیم جرم‌شناسی دیجیتال پاراهور موفق به کشف و مستندسازی یک شبکه باج‌افزاری بین‌المللی شد که در طول ۱۸ ماه بیش از ۲۰۰ سازمان ایرانی را هدف قرار داده بود. این گزارش جامع، روش‌های نفوذ، الگوهای حرکت جانبی در شبکه و ساختار مالی این گروه را برای اولین بار به‌طور کامل افشا می‌کند.",
  author: "دکتر سارا احمدی",
  initials: "سا",
  avatarColor: "bg-blue-100 text-[#1565C0]",
};

const ARTICLES: Article[] = [
  {
    id: 1,
    img: "1563986768609-322da13575f3",
    date: "۱۲ تیر ۱۴۰۳",
    readTime: "۷ دقیقه",
    category: "تهدیدات سایبری",
    title:
      "حمله زنجیره تأمین: چگونه نرم‌افزارهای معتبر به ابزار هک تبدیل می‌شوند",
    excerpt:
      "بررسی جامع آخرین موج حملات زنجیره تأمین که کتابخانه‌های معتبر NPM را هدف قرار داده و هزاران سیستم را به خطر انداخته است.",
    author: "مهندس علی رضایی",
    initials: "عر",
    avatarColor: "bg-red-100 text-red-700",
  },
  {
    id: 2,
    img: "1461749280684-dccba630e2f6",
    date: "۱۰ تیر ۱۴۰۳",
    readTime: "۵ دقیقه",
    category: "اخبار حقوقی",
    title:
      "تصویب قانون حمایت از داده‌های شخصی: آنچه کسب‌وکارها باید بدانند",
    excerpt:
      "با تصویب اخیر قانون حمایت از داده‌های شخصی، سازمان‌ها ملزم به رعایت الزامات جدید در خصوص جمع‌آوری، پردازش و نگهداری داده هستند.",
    author: "دکتر فاطمه کریمی",
    initials: "فک",
    avatarColor: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 3,
    img: "1518770660439-4636190af475",
    date: "۸ تیر ۱۴۰۳",
    readTime: "۹ دقیقه",
    category: "گزارش‌های جرم‌شناسی",
    title:
      "تحلیل متادیتای تصاویر در پرونده‌های سایبری: روش‌شناسی و ابزارها",
    excerpt:
      "راهنمای فنی جامع برای استخراج و تحلیل متادیتای EXIF در تحقیقات جرم‌شناسی دیجیتال با معرفی ابزارهای پیشرفته مورد استفاده تیم پاراهور.",
    author: "مهندس حسین نوری",
    initials: "حن",
    avatarColor: "bg-blue-100 text-[#1565C0]",
  },
  {
    id: 4,
    img: "1526374965328-7f61d4dc18c5",
    date: "۵ تیر ۱۴۰۳",
    readTime: "۶ دقیقه",
    category: "هشدارهای امنیتی",
    title:
      "موج جدید فیشینگ هدفمند: آیا ایمیل سازمان شما در خطر است؟",
    excerpt:
      "رادار پاراهور افزایش چشمگیر حملات spear-phishing علیه مدیران ارشد سازمان‌های مالی را شناسایی کرده است. بلافاصله بررسی کنید.",
    author: "دکتر سارا احمدی",
    initials: "سا",
    avatarColor: "bg-blue-100 text-[#1565C0]",
  },
  {
    id: 5,
    img: "1555949963-ff9fe0c870eb",
    date: "۳ تیر ۱۴۰۳",
    readTime: "۸ دقیقه",
    category: "تهدیدات سایبری",
    title:
      "جاسوس‌افزارهای تجاری و نقض حریم خصوصی: وضعیت بازار ۱۴۰۳",
    excerpt:
      "تحلیل جامع از بازار جهانی جاسوس‌افزارهای تجاری و نحوه استفاده مجرمانه از آن‌ها برای نظارت غیرقانونی بر افراد و مدیران.",
    author: "مهندس علی رضایی",
    initials: "عر",
    avatarColor: "bg-red-100 text-red-700",
  },
  {
    id: 6,
    img: "1589829545856-d10d557cf95f",
    date: "۱ تیر ۱۴۰۳",
    readTime: "۴ دقیقه",
    category: "اخبار حقوقی",
    title:
      "رأی دیوان عالی: مسئولیت پلتفرم‌ها در قبال کلاهبرداری دیجیتال",
    excerpt:
      "دیوان عالی در رأیی تاریخی، پلتفرم‌های آنلاین را در قبال خسارات ناشی از کلاهبرداری‌های تسهیل‌شده در بستر خود مسئول شناخت.",
    author: "دکتر فاطمه کریمی",
    initials: "فک",
    avatarColor: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 7,
    img: "1504384308090-c894fdcc538e",
    date: "۲۸ خرداد ۱۴۰۳",
    readTime: "۱۰ دقیقه",
    category: "گزارش‌های جرم‌شناسی",
    title:
      "بازیابی شواهد از دستگاه‌های رمزگذاری‌شده: چالش‌ها و راهکارها",
    excerpt:
      "گزارش فنی از تجربه تیم پاراهور در بازیابی شواهد دیجیتال از دستگاه‌های کاملاً رمزگذاری‌شده در ۱۴ پرونده قضایی اخیر.",
    author: "مهندس حسین نوری",
    initials: "حن",
    avatarColor: "bg-blue-100 text-[#1565C0]",
  },
  {
    id: 8,
    img: "1558618666-fcd25c85cd64",
    date: "۲۵ خرداد ۱۴۰۳",
    readTime: "۶ دقیقه",
    category: "هشدارهای امنیتی",
    title:
      "کلاهبرداری‌های ارز دیجیتال: ۵ الگوی شایع که باید بشناسید",
    excerpt:
      "معرفی و تحلیل رایج‌ترین روش‌های کلاهبرداری در بازار ارزهای دیجیتال به همراه راهنمای عملی تشخیص و پیشگیری از قربانی شدن.",
    author: "دکتر سارا احمدی",
    initials: "سا",
    avatarColor: "bg-blue-100 text-[#1565C0]",
  },
  {
    id: 9,
    img: "1516321318423-f06f85e504b3",
    date: "۲۲ خرداد ۱۴۰۳",
    readTime: "۷ دقیقه",
    category: "تهدیدات سایبری",
    title:
      "مهندسی اجتماعی پیشرفته: هوش مصنوعی در خدمت کلاهبرداران",
    excerpt:
      "بررسی روش‌های نوین مهندسی اجتماعی مبتنی بر هوش مصنوعی که حتی متخصصان امنیتی با سابقه را نیز به اشتباه می‌اندازند.",
    author: "مهندس علی رضایی",
    initials: "عر",
    avatarColor: "bg-red-100 text-red-700",
  },
   {
    id: 10,
    img: "1563986768609-322da13575f3",
    date: "۱۲ تیر ۱۴۰۳",
    readTime: "۷ دقیقه",
    category: "تهدیدات سایبری",
    title:
      "حمله زنجیره تأمین: چگونه نرم‌افزارهای معتبر به ابزار هک تبدیل می‌شوند",
    excerpt:
      "بررسی جامع آخرین موج حملات زنجیره تأمین که کتابخانه‌های معتبر NPM را هدف قرار داده و هزاران سیستم را به خطر انداخته است.",
    author: "مهندس علی رضایی",
    initials: "عر",
    avatarColor: "bg-red-100 text-red-700",
  },
  {
    id: 11,
    img: "1461749280684-dccba630e2f6",
    date: "۱۰ تیر ۱۴۰۳",
    readTime: "۵ دقیقه",
    category: "اخبار حقوقی",
    title:
      "تصویب قانون حمایت از داده‌های شخصی: آنچه کسب‌وکارها باید بدانند",
    excerpt:
      "با تصویب اخیر قانون حمایت از داده‌های شخصی، سازمان‌ها ملزم به رعایت الزامات جدید در خصوص جمع‌آوری، پردازش و نگهداری داده هستند.",
    author: "دکتر فاطمه کریمی",
    initials: "فک",
    avatarColor: "bg-indigo-100 text-indigo-700",
  },
    {
    id: 12,
    img: "1526374965328-7f61d4dc18c5",
    date: "۵ تیر ۱۴۰۳",
    readTime: "۶ دقیقه",
    category: "هشدارهای امنیتی",
    title:
      "موج جدید فیشینگ هدفمند: آیا ایمیل سازمان شما در خطر است؟",
    excerpt:
      "رادار پاراهور افزایش چشمگیر حملات spear-phishing علیه مدیران ارشد سازمان‌های مالی را شناسایی کرده است. بلافاصله بررسی کنید.",
    author: "دکتر سارا احمدی",
    initials: "سا",
    avatarColor: "bg-blue-100 text-[#1565C0]",
  },
  {
    id: 13,
    img: "1555949963-ff9fe0c870eb",
    date: "۳ تیر ۱۴۰۳",
    readTime: "۸ دقیقه",
    category: "تهدیدات سایبری",
    title:
      "جاسوس‌افزارهای تجاری و نقض حریم خصوصی: وضعیت بازار ۱۴۰۳",
    excerpt:
      "تحلیل جامع از بازار جهانی جاسوس‌افزارهای تجاری و نحوه استفاده مجرمانه از آن‌ها برای نظارت غیرقانونی بر افراد و مدیران.",
    author: "مهندس علی رضایی",
    initials: "عر",
    avatarColor: "bg-red-100 text-red-700",
  },

];

const PER_PAGE = 6;

// ── helpers ───────────────────────────────────────────────────────────────────

function imgUrl(id: string, w = 640, h = 380) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}






















// ── component ─────────────────────────────────────────────────────────────────

export default function App() {
  const { darkMode } = useTheme();

  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Live search with a small debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const theme = darkMode
    ? {
        page: "bg-[#0A1128] text-[#E6F7FF]",

        hero: "bg-transparent border-[#1E334A]",
        heroBadge: "bg-[#062536] text-[#00E5FF]",
        heroTitle: "text-[#E6F7FF]",
        heroDescription: "text-[#A7BACB]",

       search:
  "bg-[#0D1A2B] border border-[#3A536B] focus-within:border-[#00E5FF]/70 focus-within:shadow-[0_0_25px_rgba(0,229,255,0.12)]",
        searchIcon: "text-[#8FA5B8]",
        input: "text-[#E6F7FF] placeholder:text-[#71869A]",
        searchButton:
          "bg-[#00B8D4] hover:bg-[#00D5F0] text-[#031018]",

        categoryBar: "bg-[#060E18] border-[#1E334A]",
        categoryActive: "border-[#00E5FF] text-[#00E5FF]",
        categoryInactive:
          "text-[#8FA5B8] hover:text-[#E6F7FF] hover:border-[#496276]",
        countActive: "bg-[#073342] text-[#00E5FF]",
        countInactive: "bg-[#101C29] text-[#71869A]",

        sectionLabel: "text-[#8FA5B8]",
        sectionAccent: "bg-[#00E5FF]",

        featuredCard:
          "bg-cyan-900/10 border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-800/15 hover:shadow-[0_10px_30px_rgba(0,229,255,0.06)]",

        imageBg: "bg-[#0D1B29]",

        cardTitle:
          "text-[#E6F7FF] group-hover:text-[#E6F7FF]",

        cardText: "text-[#9DB0C0]",
        meta: "text-[#71869A]",
        divider: "border-[#1E334A]",

        articleCard:
          "bg-cyan-900/10 border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-800/15 hover:shadow-[0_10px_30px_rgba(0,229,255,0.06)]",

        emptyIcon: "bg-[#101C29]",
        emptyIconText: "text-[#60788C]",
        emptyTitle: "text-[#A7BACB]",
        emptyText: "text-[#71869A]",

        pagination:
          "border-[#263B4E] text-[#8FA5B8] hover:border-[#496276] hover:text-[#E6F7FF]",
        paginationActive:
          "bg-[#00B8D4] text-[#031018] shadow-[0_4px_15px_rgba(0,229,255,0.15)]",
        paginationDisabled: "disabled:opacity-30",
      }
    : {
        page: "bg-[#FAFCFF] text-[#10213D]",

        hero: "bg-[#F4F8FC] border-[#DCE5EF]",
        heroBadge: "bg-[#EAF3FF] text-[#1557A0]",
        heroTitle: "text-[#10213D]",
        heroDescription: "text-[#52657D]",

        search:
  "bg-white border border-[#AFC7DF] focus-within:border-[#1769C2]/70 focus-within:shadow-[0_4px_20px_rgba(23,105,194,0.12)]",
        searchIcon: "text-[#8292A5]",
        input: "text-[#10213D] placeholder:text-[#91A0B0]",
        searchButton:
          "bg-[#1769C2] hover:bg-[#1256A0] text-white",

        categoryBar: "bg-white border-[#DCE5EF]",
        categoryActive: "border-[#1769C2] text-[#1769C2]",
        categoryInactive:
          "text-[#61738A] hover:text-[#10213D] hover:border-[#B8C5D3]",
        countActive: "bg-[#EAF3FF] text-[#1769C2]",
        countInactive: "bg-[#EFF3F7] text-[#7C8A9B]",

        sectionLabel: "text-[#64758A]",
        sectionAccent: "bg-[#1769C2]",

        featuredCard:
          "bg-white border-[#D5E3F0] transition-all duration-300 hover:border-[#8DB9E5] hover:bg-[#FDFEFF] hover:shadow-[0_8px_25px_rgba(37,99,235,0.10)]",

        imageBg: "bg-[#EEF3F8]",

        cardTitle:
          "text-[#10213D] group-hover:text-[#10213D]",

        cardText: "text-[#5E7086]",
        meta: "text-[#7C8A9B]",
        divider: "border-[#E3E9F0]",

        articleCard:
          "bg-white border-[#D5E3F0] transition-all duration-300 hover:border-[#8DB9E5] hover:bg-[#FDFEFF] hover:shadow-[0_8px_25px_rgba(37,99,235,0.10)]",

        emptyIcon: "bg-[#EFF3F7]",
        emptyIconText: "text-[#8292A5]",
        emptyTitle: "text-[#61738A]",
        emptyText: "text-[#8292A5]",

        pagination:
          "border-[#D6E0EA] text-[#6D7D90] hover:border-[#B5C3D1] hover:text-[#10213D]",
        paginationActive:
          "bg-[#10213D] text-white shadow-sm",
        paginationDisabled: "disabled:opacity-30",
      };

  const catBadge: Record<string, string> = darkMode
    ? {
        "تهدیدات سایبری":
          "text-[#FF6B7A] bg-[#32151D] ring-[#5A242E]",
        "اخبار حقوقی":
          "text-[#9EAFFF] bg-[#171B3A] ring-[#303665]",
        "گزارش‌های جرم‌شناسی":
          "text-[#54B8FF] bg-[#09263D] ring-[#164B70]",
        "هشدارهای امنیتی":
          "text-[#F8C85A] bg-[#302612] ring-[#5A461C]",
      }
    : {
        "تهدیدات سایبری":
          "text-red-700 bg-red-50 ring-red-100",
        "اخبار حقوقی":
          "text-indigo-700 bg-indigo-50 ring-indigo-100",
        "گزارش‌های جرم‌شناسی":
          "text-[#1565C0] bg-[#EBF3FF] ring-blue-100",
        "هشدارهای امنیتی":
          "text-amber-700 bg-amber-50 ring-amber-100",
      };

      const PER_PAGE = 6;

  const filteredArticles = useMemo(() => {
  let list = ARTICLES;

  if (activeCategory !== "همه") {
    list = list.filter(
      (article) => article.category === activeCategory
    );
  }

  if (searchQuery.trim()) {
    const q = searchQuery.trim();

    list = list.filter(
      (article) =>
        article.title.includes(q) ||
        article.excerpt.includes(q)
    );
  }

  return list;
}, [activeCategory, searchQuery]);

const totalPages = Math.max(
  1,
  Math.ceil(filteredArticles.length / PER_PAGE)
);

const page = Math.min(currentPage, totalPages);

const pageArticles = filteredArticles.slice(
  (page - 1) * PER_PAGE,
  page * PER_PAGE
);

  const showFeatured =
    (activeCategory === "همه" ||
      activeCategory === "گزارش‌های جرم‌شناسی") &&
    (!searchQuery.trim() ||
      FEATURED.title.includes(searchQuery) ||
      FEATURED.excerpt.includes(searchQuery));

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const articleCount = (cat: string) =>
    cat === "همه"
      ? ARTICLES.length
      : ARTICLES.filter(
          (article) => article.category === cat
        ).length;

  return (
   <div
  dir="rtl"
  className={`min-h-screen transition-colors duration-300 ${theme.page}`}
  style={{
    fontFamily: "'Vazirmatn', sans-serif",

    backgroundImage: darkMode
      ? "linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)"
      : "linear-gradient(rgba(30,58,138,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(30,58,138,0.035) 1px,transparent 1px)",

    backgroundSize: "52px 52px",
  }}
>
      <main>
        {/* ─── HERO ─────────────────────────────────────────────────────────── */}

        <section
          className={`border-b transition-colors duration-300 ${theme.hero} pt-24`}
        >
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 ${theme.heroBadge}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              آرشیو گزارش‌های تحلیلی و حقوقی
            </div>

            <h1
              className={`text-3xl md:text-4xl font-bold leading-tight mb-3 ${theme.heroTitle}`}
            >
              رادار پاراهور
            </h1>

            <p
              className={`text-base mb-10 ${theme.heroDescription}`}
            >
              گزارش‌های جرم‌شناسی، هشدارهای امنیتی و اخبار حقوقی توسط تیم متخصصان پاراهور
            </p>

            {/* Search bar */}

            <div className="max-w-2xl mx-auto">
              <div
                className={`flex items-center rounded-xl shadow-sm overflow-hidden focus-within:shadow-md transition-all ${theme.search}`}
              >
                <div
                  className={`px-4 flex-shrink-0 ${theme.searchIcon}`}
                >
                  <SearchIcon className="w-5 h-5" />
                </div>

                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) =>
                    setSearchInput(e.target.value)
                  }
                  placeholder="جستجو در گزارش‌ها و مقالات..."
                  className={`flex-1 py-4 text-sm bg-transparent outline-none ${theme.input}`}
                />
              </div>

              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className={`mt-3 text-xs hover:underline ${
                    darkMode
                      ? "text-[#00E5FF]"
                      : "text-[#1769C2]"
                  }`}
                >
                  پاک کردن جستجو: «{searchQuery}»
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ─── CATEGORY TABS ────────────────────────────────────────────────── */}

        <div
          className={`border-b sticky top-0 z-40 transition-colors duration-300 ${theme.categoryBar}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat.id;
                const count = articleCount(cat.id);

                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      handleCategoryChange(cat.id)
                    }
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                      active
                        ? theme.categoryActive
                        : `border-transparent ${theme.categoryInactive}`
                    }`}
                  >
                    {cat.label}

                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                        active
                          ? theme.countActive
                          : theme.countInactive
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── CONTENT ──────────────────────────────────────────────────────── */}

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* ─── FEATURED ARTICLE ───────────────────────────────────────────── */}

          {showFeatured && page === 1 && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-5">
                <span
                  className={`w-1 h-5 rounded-full block ${theme.sectionAccent}`}
                />

                <span
                  className={`text-xs font-bold uppercase tracking-widest ${theme.sectionLabel}`}
                >
                  گزارش ویژه
                </span>
              </div>

              <article
                className={`group border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${theme.featuredCard}`}
              >
                <div className="grid md:grid-cols-5">
                  {/* Image */}

                  <div
                    className={`md:col-span-2 aspect-video md:aspect-auto overflow-hidden ${theme.imageBg}`}
                  >
                    <img
                      src={imgUrl(
                        FEATURED.img,
                        800,
                        500
                      )}
                      alt={FEATURED.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}

                  <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between transition-all duration-300 dark:hover:bg-cyan-800/5">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full ring-1 ring-inset ${
                            catBadge[FEATURED.category]
                          }`}
                        >
                          {FEATURED.category}
                        </span>

                        <span
                          className={`text-xs font-medium ${theme.meta}`}
                        >
                          {FEATURED.date}
                        </span>

                        <span
                          className={`flex items-center gap-1 text-xs ${theme.meta}`}
                        >
                          <Clock className="w-3 h-3" />
                          {FEATURED.readTime} مطالعه
                        </span>
                      </div>

                      <h2
                        className={`text-xl md:text-2xl font-bold leading-snug mb-4 transition-colors ${theme.cardTitle}`}
                      >
                        {FEATURED.title}
                      </h2>

                      <p
                        className={`text-sm md:text-base leading-relaxed ${theme.cardText}`}
                      >
                        {FEATURED.excerpt}
                      </p>
                    </div>

                    <div
                      className={`flex items-center justify-between mt-8 pt-6 border-t ${theme.divider}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${FEATURED.avatarColor}`}
                        >
                          {FEATURED.initials}
                        </div>

                        <span
                          className={`text-sm font-medium ${theme.cardText}`}
                        >
                          {FEATURED.author}
                        </span>
                      </div>

                      <a
                        href="#"
                        className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all ${
                          darkMode
                            ? "text-[#00E5FF]"
                            : "text-[#1769C2]"
                        }`}
                      >
                        مطالعه گزارش کامل
                        <ChevronLeft className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* ─── RESULTS COUNT ──────────────────────────────────────────────── */}

          <div className="flex items-center justify-between mb-8">
            <div
              className={`flex items-center gap-2 text-sm ${theme.sectionLabel}`}
            >
              <span>
                نمایش{" "}
                <span
                  className={`font-semibold ${
                    darkMode
                      ? "text-[#E6F7FF]"
                      : "text-[#10213D]"
                  }`}
                >
                  {filteredArticles.length}
                </span>{" "}
                مطلب

                {activeCategory !== "همه" && (
                  <span>
                    {" "}
                    در{" "}
                    <span
                      className={`font-semibold ${
                        darkMode
                          ? "text-[#E6F7FF]"
                          : "text-[#10213D]"
                      }`}
                    >
                      {activeCategory}
                    </span>
                  </span>
                )}
              </span>
            </div>

            <span
              className={`text-xs ${theme.meta}`}
            >
              صفحه {page} از {totalPages}
            </span>
          </div>

          {/* ─── ARTICLE GRID ────────────────────────────────────────────────── */}

          {pageArticles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {pageArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  darkMode={darkMode}
                  theme={theme}
                  catBadge={catBadge}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${theme.emptyIcon}`}
              >
                <SearchIcon
                  className={`w-6 h-6 ${theme.emptyIconText}`}
                />
              </div>

              <p
                className={`text-base font-semibold mb-1 ${theme.emptyTitle}`}
              >
                مطلبی یافت نشد
              </p>

              <p
                className={`text-sm ${theme.emptyText}`}
              >
                معیارهای جستجو یا فیلتر را تغییر دهید
              </p>
            </div>
          )}

          {/* ─── PAGINATION ──────────────────────────────────────────────────── */}

{/* ─── PAGINATION ──────────────────────────────────────────────────── */}

{totalPages > 1 && (
  <div className="flex items-center justify-center gap-2 mt-12 pb-12">
    {/* صفحه قبل */}
    <button
      type="button"
      onClick={() =>
        setCurrentPage((prev) => Math.max(prev - 1, 1))
      }
      disabled={page === 1}
      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${theme.pagination} ${theme.paginationDisabled}`}
      aria-label="صفحه قبل"
    >
      <ChevronRight size={18} />
    </button>

    {/* شماره صفحات */}
    {Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;

      return (
        <button
          key={pageNumber}
          type="button"
          onClick={() => setCurrentPage(pageNumber)}
          className={`w-10 h-10 rounded-lg border flex items-center justify-center text-sm font-medium transition-all ${
            page === pageNumber
              ? theme.paginationActive
              : theme.pagination
          }`}
        >
          {pageNumber}
        </button>
      );
    })}

    {/* صفحه بعد */}
    <button
      type="button"
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, totalPages)
        )
      }
      disabled={page === totalPages}
      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${theme.pagination} ${theme.paginationDisabled}`}
      aria-label="صفحه بعد"
    >
      <ChevronLeft size={18} />
    </button>
  </div>
)}
        </div>
      </main>
    </div>
  );
}

// ── ArticleCard ───────────────────────────────────────────────────────────────

function ArticleCard({
  article,
  darkMode,
  theme,
  catBadge,
}: {
  article: Article;
  darkMode: boolean;
  theme: Record<string, string>;
  catBadge: Record<string, string>;
}) {
  return (
    <article
      className={`group flex flex-col border rounded-2xl overflow-hidden transition-all duration-200 ${theme.articleCard}`}
    >
      {/* Thumbnail */}

      <div
        className={`aspect-video overflow-hidden flex-shrink-0 ${theme.imageBg}`}
      >
        <img
          src={imgUrl(article.img, 640, 380)}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}

      <div className="flex flex-col flex-1 p-6 transition-all duration-300 dark:hover:bg-cyan-800/5">
        {/* Category */}

        <div className="flex items-center gap-2.5 mb-4">
          <span
            className={`text-[11px] font-bold px-2.5 py-1 rounded-full ring-1 ring-inset ${
              catBadge[article.category]
            }`}
          >
            {article.category}
          </span>
        </div>

        {/* Title */}

        <h3
          className={`text-base font-bold leading-snug mb-3 transition-colors line-clamp-2 ${theme.cardTitle}`}
        >
          {article.title}
        </h3>

        {/* Excerpt */}

        <p
          className={`text-sm leading-relaxed line-clamp-3 mb-5 flex-1 ${theme.cardText}`}
        >
          {article.excerpt}
        </p>

        {/* Footer */}

        <div
          className={`pt-4 border-t flex items-center justify-between gap-3 ${theme.divider}`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${article.avatarColor}`}
            >
              {article.initials}
            </div>

            <div className="min-w-0">
              <p
                className={`text-xs font-semibold truncate ${theme.cardText}`}
              >
                {article.author}
              </p>

              <div
                className={`flex items-center gap-2 text-[10px] ${theme.meta}`}
              >
                <span>{article.date}</span>
                <span>·</span>
                <Clock className="w-2.5 h-2.5" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          <a
            href="#"
            className={`flex items-center gap-1 text-xs font-semibold hover:gap-1.5 transition-all flex-shrink-0 ${
              darkMode
                ? "text-[#00E5FF]"
                : "text-[#1769C2]"
            }`}
          >
            ادامه مطلب
            <ChevronLeft className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
}