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
  telegram?: string;
  instagram?: string;
  email?: string;
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
    ctaLabel: "ثبت گزارش بحران",
    telegram: "https://t.me/fimbulspring",
    instagram: "https://www.instagram.com/vakil_sara_mohamadzadeh",
email: "parahoorteam@gmail.com",
    bio: [
      "من یک پژوهشگر در حوزه امنیت اطلاعات و جرم‌شناسی دیجیتال، و مؤسس مجموعه «پاراهور» هستم. ماموریت حرفه‌ای من مدیریت جامع بحران‌ها و تحقیقات سایبری است؛ چرخه‌ای یکپارچه که از پیش‌بینی و رصد تهدیدات، تا رهگیریِ پیچیده‌ترین ردپاهای دیجیتال را پوشش می‌دهد. تمرکز اصلی ما در پاراهور، کالبدشکافیِ عمیقِ حوادث و تبدیلِ داده‌های تاریک به مستنداتِ فنی، جهت پیگیری‌های قانونی است."
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
    id: "sara-mohammadzadeh",
    name: "سارا محمدزاده",
    authorKey: "سارا محمدزاده",
    title: "وکیل پایه یک دادگستری",
    subtitle: "وکیل و مشاور حقوقی پاراهور",
    photo:
      "/sara.webp",
    accent: "#10B981",
    accentLight: "#047857",
    ctaLabel: "ثبت گزارش بحران",
    telegram: "https://t.me/+989120581672",
    instagram: "https://www.instagram.com/fimbulspring",
email: "mohammadzadehsara57@gmail.com",
    bio: [
      "من وکیل پایه یک دادگستری و کارشناس ارشد حقوق با بیش از چهار سال سابقه وکالت در دعاوی کیفری، حقوقی و به‌ویژه جرایم سایبری و فناوری اطلاعات هستم. رسالت اصلی من در این مجموعه، ایجاد یک پیوند دقیق میان تحقیقات سایبری و الزامات قضایی است؛ تا اطمینان حاصل شود تمامی فرآیندهای کشف جرایم دیجیتال با بالاترین استانداردهای قانونی همسو بوده و نتایج تحقیقات به گزارشی دقیق برای ارائه به محاکم تبدیل میشود"
    ],
    stats: [
      { label: "پرونده های موفق", val: "+335" },
      { label: "شروع فعالیت در پاراهور", val: "1405" },
      { label: "مقالات منتشرشده", val: "0" },
    ],
    focus: [
      { label: "تجارت الکترونیک", pct: 90 },
      { label: "جرائم رایانه‌ای", pct: 95 },
      { label: "جرائم اقتصادی", pct: 90 },
    ],
    certs: [
      "​کارشناسی ارشد حقوق",
      "دوره جامع قراردادنویسی حرفه‌ای",
      "دوره‌های تخصصی دادخواست‌نویسی و لوایح دفاعی",
    ],
    tags: [
      "#حقوق سایبری",
      "#جرایم رایانه‌ای",
      "#​قراردادهای فناوری",
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
