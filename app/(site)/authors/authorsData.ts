// این فایل عمداً "use client" نداره — چون قراره POSTS_PER_PAGE و
// getAuthorPosts و تایپ‌ها رو هم تو AuthorsClient (کلاینت) و هم
// تو page.tsx های سرور (generateMetadata و خود کامپوننت صفحه) استفاده کنیم.
// وقتی این چیزها از یه فایل "use client" اکسپورت می‌شدن، تو بعضی
// نسخه‌های Next.js/Turbopack موقع ایمپورت تو Server Component به
// صورت "is not a function" فیل می‌شدن؛ جداشون کردیم که این مشکل رفع بشه.

export type Post = {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  postType: "normal" | "special";
  author: string;
  categoryId: string;
  tags: string[];
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  wordCount?: number;
  readingTime?: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Author = {
  id: string;
  name: string;
  authorKey: string;
  title: string;
  subtitle: string;
  photo: string;
  accent: string;
  accentLight: string;
  ctaLabel: string;

  bio: string[];

  stats: {
    label: string;
    val: string;
  }[];

  focus: {
    label: string;
    pct: number;
  }[];

  certs: string[];
  tags: string[];
};

export const normalizeAuthor = (value: string | undefined) => {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/\u200c/g, "")
    .replace(/\s+/g, " ");
};

export const authors: Author[] = [
  {
    id: "mohammadreza-yousefi",
    name: "محمدرضا یوسفی",
    authorKey: "محمدرضا یوسفی",
    title: "پژوهشگر ارشد جرائم رایانه‌ای",
    subtitle: "دارای بیش از یک دهه سابقه کاری.",
    photo:
      "/mohammadreza.webp",
    accent: "#00E5FF",
    accentLight: "#0E7490",
    ctaLabel: "سوابق ردیابی و تحلیل بلاکچین",
    bio: [
      "من یک متخصص ۲۸ ساله در حوزه امنیت اطلاعات و جرم‌شناسی دیجیتال (Digital Forensics) مستقر در تهران هستم. ماموریت حرفه‌ای من ارائه خدمات پیشرفته امنیتی و تحقیقاتی در مجموعه «پاراهور» است. تمرکز اصلی من بر کشف، تحلیل و خنثی‌سازی تهدیدات پیچیده سایبری و ارائه مستندات فنی دقیق برای پیگیری‌های قانونی است.",
    ],
    stats: [
      { label: "پرونده های موفق", val: "+100" },
      { label: "شروع فعالیت در پاراهور", val: "1405" },
      { label: "مقالات منتشرشده", val: "0" },
    ],
    focus: [
      { label: "رهگیری رمز ارز", pct: 90 },
      { label: "کشف هویت پنهان", pct: 80 },
      { label: "تحلیل حملات سایبری", pct: 80 },
      { label: "تست نفوذ", pct: 90 },
    ],
    certs: [
      "گواهینامه LPIC",
      "گواهینامه CCNP",
      "گواهینامه Security+",
      "گواهینامه CEH",
      "گواهینامه MCSA",
    ],
    tags: [
      "#OSINT",
      "#Blockchain_Investigator",
      "#Python",
      "#Linux",
      "#Cisco",
      "#Digital_Forensic",
      "#Docker",
      "#Git",
    ],
  },
  {
    id: "alireza-tabatabaei-hashemi",
    name: "علیرضا طباطبایی هاشمی",
    authorKey: "علیرضا طباطبایی هاشمی",
    title: "وکیل پایه یک دادگستری",
    subtitle: "معاون فنی اسبق پلیس فتا فراجا | بیش از پانزده سال سابقه تخصصی",
    photo:
      "/alireza.webp",
    accent: "#10B981",
    accentLight: "#047857",
    ctaLabel: "سوابق حقوقی و پی‌جویی جرائم رایانه‌ای",
    bio: [
      "من علیرضا طباطبایی هاشمی، وکیل پایه یک دادگستری و معاون فنی اسبق پلیس فتای فراجا هستم و با بیش از پانزده سال سابقه عملیاتی و تخصصی در زمینه شناسایی، ردیابی و پی‌جویی جرائم رایانه‌ای و اقتصادی فعالیت می‌کنم. من در مجموعه «پاراهور» هدایت و راهبری حقوقی مجموعه را بر عهده دارم. رسالت اصلی من در این مجموعه، ایجاد یک پیوند دقیق میان تحقیقات پیچیده سایبری (فارنزیک) و الزامات قضایی است؛ تا اطمینان حاصل شود تمامی فرآیندهای کشف جرایم دیجیتال با بالاترین استانداردهای محرمانگی همسو بوده و نتایج تحقیقات به مستنداتی بی‌نقص، معتبر و کاملاً قابل استناد در مراجع حقوقی تبدیل می‌شوند.",
    ],
    stats: [
      { label: "پرونده های موفق", val: "+150" },
      { label: "شروع فعالیت در پاراهور", val: "1405" },
      { label: "مقالات منتشرشده", val: "0" },
    ],
    focus: [
      { label: "OSINT", pct: 90 },
      { label: "جرائم رایانه‌ای", pct: 95 },
      { label: "جرائم اقتصادی", pct: 90 },
    ],
    certs: [
      "گواهینامه MCSE",
      "گواهینامه MCSes",
      "گواهینامه MCDbA",
      "گواهینامه OSINT",
    ],
    tags: [
      "#OSINT",
      "#جرائم_رایانه‌ای",
      "#جرائم_اقتصادی",
    ],
  },
];

// برای استفاده‌ی سرورساید (generateMetadata / محاسبه‌ی totalPages)
// بدون تکرار منطق فیلتر/مرتب‌سازی پست‌های هر نویسنده.
export const POSTS_PER_PAGE = 6;

export function getAuthorPosts(posts: Post[], authorId: string): Post[] {
  const author = authors.find((item) => item.id === authorId);
  if (!author) return [];

  return posts
    .filter((post) => post.status === "published")
    .filter(
      (post) =>
        normalizeAuthor(post.author) === normalizeAuthor(author.authorKey)
    )
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    });
}
