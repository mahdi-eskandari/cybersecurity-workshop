// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { usePathname } from "next/navigation";
// import {
//   Search as SearchIcon,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   BookOpen,
// } from "lucide-react";
// import { useTheme } from "../../../components/ThemeProvider";
// import { AnimatePresence, motion, type Variants } from "framer-motion";
// import Link from "next/link";
// import Head from "next/head";


// // ── types & data ──────────────────────────────────────────────────────────────

// interface Article {
//   id: string;
//   slug: string;
//   categoryId: string;
//   img: string;
//   featuredImageAlt: string;
//   date: string;
//   readTime: string;
//   category: string;
//   title: string;
//   excerpt: string;
//   author: string;
//   initials: string;
//   avatarColor: string;
// }

// const PER_PAGE = 6;

// const BLOGS_PATH = "/blogs";

// function getBlogsPageUrl(page: number, basePath: string) {
//   if (page <= 1) return basePath;
//   return `${basePath}?page=${page}`;
// }

// // ── helpers ───────────────────────────────────────────────────────────────────

// type MediaItem = {
//   id: string;
//   name: string;
//   alt: string;
//   url: string;
// };



// type RawBlogPost = {
//   _id?: string;
//   id?: string;
//   title?: string;
//   slug?: string;
//   author?: string;
//   categoryId?: string;
//   tags?: string[];
//   status?: "draft" | "published";
//   postType?: "normal" | "special";
//   featuredImage?: string | null;
//   featuredImageAlt?: string | null;
//   content?: string;
//   wordCount?: number;
//   readingTime?: number;
//   metaTitle?: string;
//   metaDescription?: string;
//   createdAt?: string;
//   updatedAt?: string;
// };

// type BlogPost = {
//   _id: string;
//   title: string;
//   slug: string;
//   author: string;
//   categoryId: string;
//   tags: string[];
//   status: "draft" | "published";
//   postType: "normal" | "special";
//   featuredImage: string | null;
//   featuredImageAlt: string | null;
//   content: string;
//   wordCount: number;
//   readingTime: number;
//   metaTitle: string;
//   metaDescription: string;
//   createdAt?: string;
//   updatedAt?: string;
// };




// /* ─────────────────────────────────────────────────────────────
//    HERO IMAGE FALLBACK
// ───────────────────────────────────────────────────────────── */

// const HeroImageFallback = ({
//   darkMode,
// }: {
//   darkMode: boolean;
// }) => (
//   <svg
//     width="100%"
//     height="100%"
//     viewBox="0 0 1000 380"
//     preserveAspectRatio="xMidYMid slice"
//     style={{ display: "block" }}
//   >
//     <defs>
//       <radialGradient id="hg1" cx="25%" cy="50%" r="55%">
//         <stop
//           offset="0%"
//           stopColor={
//             darkMode
//               ? "rgba(0,229,255,0.1)"
//               : "rgba(30,58,138,0.08)"
//           }
//         />
//         <stop offset="100%" stopColor="transparent" />
//       </radialGradient>

//       <radialGradient id="hg2" cx="75%" cy="40%" r="45%">
//         <stop
//           offset="0%"
//           stopColor={
//             darkMode
//               ? "rgba(239,68,68,0.07)"
//               : "rgba(30,58,138,0.04)"
//           }
//         />
//         <stop offset="100%" stopColor="transparent" />
//       </radialGradient>

//       <filter id="hblur">
//         <feGaussianBlur stdDeviation="3" />
//       </filter>
//     </defs>

//     <rect
//       width="1000"
//       height="380"
//       fill={darkMode ? "#050C1E" : "#F8FAFC"}
//     />

//     <rect width="1000" height="380" fill="url(#hg1)" />
//     <rect width="1000" height="380" fill="url(#hg2)" />

//     {Array.from({ length: 14 }).map((_, i) => (
//       <line
//         key={`h${i}`}
//         x1="0"
//         y1={i * 28}
//         x2="1000"
//         y2={i * 28}
//         stroke={
//           darkMode
//             ? "rgba(0,229,255,0.035)"
//             : "rgba(30,58,138,0.045)"
//         }
//         strokeWidth="1"
//       />
//     ))}

//     {Array.from({ length: 34 }).map((_, i) => (
//       <line
//         key={`v${i}`}
//         x1={i * 30}
//         y1="0"
//         x2={i * 30}
//         y2="380"
//         stroke={
//           darkMode
//             ? "rgba(0,229,255,0.035)"
//             : "rgba(30,58,138,0.045)"
//         }
//         strokeWidth="1"
//       />
//     ))}

//     <path
//       d="M80 190 L200 140 L340 190 L480 120 L600 170 L740 110 L880 160 L960 140"
//       stroke={
//         darkMode
//           ? "rgba(0,229,255,0.4)"
//           : "rgba(30,58,138,0.3)"
//       }
//       strokeWidth="1.5"
//       fill="none"
//       filter="url(#hblur)"
//     />

//     <path
//       d="M80 190 L200 140 L340 190 L480 120 L600 170 L740 110 L880 160 L960 140"
//       stroke={
//         darkMode
//           ? "rgba(0,229,255,0.2)"
//           : "rgba(30,58,138,0.18)"
//       }
//       strokeWidth="1"
//       fill="none"
//     />

//     {[
//       { x: 200, y: 140 },
//       { x: 340, y: 190 },
//       { x: 480, y: 120 },
//       { x: 600, y: 170 },
//       { x: 740, y: 110 },
//       { x: 880, y: 160 },
//     ].map((p, i) => (
//       <g key={i}>
//         <rect
//           x={p.x - 20}
//           y={p.y - 22}
//           width="40"
//           height="44"
//           rx="4"
//           fill={
//             darkMode
//               ? "rgba(0,229,255,0.05)"
//               : "rgba(30,58,138,0.04)"
//           }
//           stroke={
//             darkMode
//               ? "rgba(0,229,255,0.3)"
//               : "rgba(30,58,138,0.22)"
//           }
//           strokeWidth="1"
//         />

//         <rect
//           x={p.x - 12}
//           y={p.y - 14}
//           width="24"
//           height="3"
//           rx="1"
//           fill={
//             darkMode
//               ? "rgba(0,229,255,0.3)"
//               : "rgba(30,58,138,0.25)"
//           }
//         />

//         <rect
//           x={p.x - 12}
//           y={p.y - 7}
//           width="17"
//           height="2.5"
//           rx="1"
//           fill={
//             darkMode
//               ? "rgba(0,229,255,0.18)"
//               : "rgba(30,58,138,0.16)"
//           }
//         />

//         <rect
//           x={p.x - 12}
//           y={p.y - 1}
//           width="20"
//           height="2.5"
//           rx="1"
//           fill={
//             darkMode
//               ? "rgba(0,229,255,0.15)"
//               : "rgba(30,58,138,0.13)"
//           }
//         />

//         <circle
//           cx={p.x}
//           cy={p.y - 22}
//           r="3.5"
//           fill={darkMode ? "#00E5FF" : "#1E3A8A"}
//           opacity="0.7"
//         />
//       </g>
//     ))}

//     <circle
//       cx="480"
//       cy="120"
//       r="22"
//       fill="transparent"
//       stroke={
//         darkMode
//           ? "rgba(239,68,68,0.2)"
//           : "rgba(30,58,138,0.15)"
//       }
//       strokeWidth="1"
//     />

//     <circle
//       cx="480"
//       cy="120"
//       r="14"
//       fill="transparent"
//       stroke={
//         darkMode
//           ? "rgba(239,68,68,0.3)"
//           : "rgba(30,58,138,0.2)"
//       }
//       strokeWidth="1"
//     />

//     <circle
//       cx="480"
//       cy="120"
//       r="5"
//       fill={
//         darkMode
//           ? "rgba(239,68,68,0.5)"
//           : "rgba(30,58,138,0.35)"
//       }
//       stroke={
//         darkMode
//           ? "rgba(239,68,68,0.8)"
//           : "rgba(30,58,138,0.55)"
//       }
//       strokeWidth="1.5"
//     />

//     <text
//       x="20"
//       y="368"
//       fontSize="8"
//       fill={
//         darkMode
//           ? "rgba(0,229,255,0.25)"
//           : "rgba(30,58,138,0.25)"
//       }
//       fontFamily="monospace"
//     >
//       PARAHOOR FORENSICS // CASE ANALYSIS
//     </text>
//   </svg>
// );



// const CATEGORY_FALLBACK = "بدون دسته‌بندی";

// const BLOG_CATEGORIES = [
//   { id: "forensic-reports", label: "گزارش‌های جرم‌شناسی" },
//   { id: "legal-news", label: "اخبار حقوقی" },
//   { id: "solved-cases", label: "پرونده‌های حل‌شده" },
//   { id: "security-alerts", label: "هشدارهای امنیتی" },
//   { id: "security-education", label: "آموزش امنیت و تهدیدات سایبری" },
// ];

// function findMedia(
//   featuredImage: string | null | undefined,
//   mediaItems: MediaItem[]
// ) {
//   if (!featuredImage) return undefined;

//   return mediaItems.find(
//     (item) =>
//       item.id === featuredImage ||
//       item.url === featuredImage ||
//       `/api/media/${item.id}` === featuredImage
//   );
// }

// function getMediaUrl(
//   featuredImage: string | null | undefined,
//   mediaItems: MediaItem[]
// ) {
//   const media = findMedia(featuredImage, mediaItems);

//   if (media?.url) return media.url;
//   if (featuredImage?.startsWith("/api/media/")) return featuredImage;
//   return "";
// }

// function getMediaAlt(
//   featuredImage: string | null | undefined,
//   mediaItems: MediaItem[],
//   fallback = ""
// ) {
//   const media = findMedia(featuredImage, mediaItems);
//   return media?.alt?.trim() || fallback;
// }

// function stripHtml(value?: string) {
//   if (!value) return "";

//   return value
//     .replace(/<br\s*\/?>(\s*)/gi, " ")
//     .replace(/<\/(p|div|li|h[1-6])>/gi, " ")
//     .replace(/<[^>]*>/g, "")
//     .replace(/&nbsp;/gi, " ")
//     .replace(/&amp;/gi, "&")
//     .replace(/&quot;/gi, '"')
//     .replace(/&#39;/gi, "'")
//     .replace(/&lt;/gi, "<")
//     .replace(/&gt;/gi, ">")
//     .replace(/\s+/g, " ")
//     .trim();
// }

// function getPostExcerpt(content?: string, maxLength = 170) {
//   const text = stripHtml(content);
//   if (!text) return "";
//   if (text.length <= maxLength) return text;

//   return `${text.slice(0, maxLength).trimEnd()}…`;
// }

// function formatPersianDate(value?: string) {
//   if (!value) return "";

//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "";

//   return new Intl.DateTimeFormat("fa-IR", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   }).format(date);
// }

// // ── component ─────────────────────────────────────────────────────────────────

// function getCategoryBadgeClass(category: string, darkMode: boolean): string {
//   const badges: Record<string, string> = {
//     "تهدیدات سایبری": darkMode ? "text-[#FF6B7A] bg-[#32151D] ring-[#5A242E]" : "text-red-700 bg-red-50 ring-red-100",
//     "اخبار حقوقی": darkMode ? "text-[#9EAFFF] bg-[#171B3A] ring-[#303665]" : "text-indigo-700 bg-indigo-50 ring-indigo-100",
//     "گزارش‌های جرم‌شناسی": darkMode ? "text-[#54B8FF] bg-[#09263D] ring-[#164B70]" : "text-[#1565C0] bg-[#EBF3FF] ring-blue-100",
//     "پرونده‌های حل‌شده": darkMode ? "text-[#7BE495] bg-[#102A1C] ring-[#245B36]" : "text-emerald-700 bg-emerald-50 ring-emerald-100",
//     "هشدارهای امنیتی": darkMode ? "text-[#F8C85A] bg-[#302612] ring-[#5A461C]" : "text-amber-700 bg-amber-50 ring-amber-100",
//     "آموزش امنیت و تهدیدات سایبری": darkMode ? "text-[#7DD3FC] bg-[#0B2940] ring-[#1F5C7A]" : "text-sky-700 bg-sky-50 ring-sky-100",
//   };
//   return badges[category] || (darkMode ? "text-[#54B8FF] bg-[#09263D] ring-[#164B70]" : "text-[#1565C0] bg-[#EBF3FF] ring-blue-100");
// }

// export default function App() {
//   const { darkMode } = useTheme();
//   const pathname = usePathname();

//   const [activeCategory, setActiveCategory] = useState("همه");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [loading, setLoading] = useState(true);
// const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
// const [blogs, setBlogs] = useState<BlogPost[]>([]);
// const [filterFixed, setFilterFixed] = useState(false);
// const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
//     const [seo, setSeo] = useState({
//     h1Title: "رادار پاراهور",
//   });


// useEffect(() => {
//   fetch("/api/admin/seo")
//     .then((res) => res.json())
//     .then((data) => {
//       const homeSeo = data?.pages?.find(
//         (page: any) => page.pageKey === "blogs"
//       );

//       if (homeSeo?.h1Title) {
//         setSeo({
//           h1Title: homeSeo.h1Title,
//         });
//       }
//     })
//     .catch(() => {});
// }, []);



// useEffect(() => {
//   const handleScroll = () => {
//     setFilterFixed(window.scrollY >= 425);
//   };

//   window.addEventListener("scroll", handleScroll, {
//     passive: true,
//   });

//   handleScroll();

//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);

//   // Live search with a small debounce
// useEffect(() => {
//   const loadPosts = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch("/api/posts", {
//         cache: "no-store",
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "خطا در دریافت پست‌ها");
//       }

//       const posts: RawBlogPost[] = Array.isArray(result)
//         ? result
//         : Array.isArray(result?.posts)
//         ? result.posts
//         : [];

//       const normalizedPosts: BlogPost[] = [];

//       for (const post of posts) {
//         const id = post?._id || post?.id;
//         if (!id) continue;

//         const normalizedStatus: BlogPost["status"] =
//           post.status === "published" ? "published" : "draft";

//         const normalizedPostType: BlogPost["postType"] =
//           post.postType === "special" ? "special" : "normal";

//         normalizedPosts.push({
//           _id: String(id),
//           title: String(post.title || ""),
//           slug: String(post.slug || ""),
//           author: String(post.author || ""),
//           categoryId: String(post.categoryId || ""),
//           tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
//           status: normalizedStatus,
//           postType: normalizedPostType,
//           featuredImage: post.featuredImage || null,
//           featuredImageAlt: post.featuredImageAlt || null,
//           content: String(post.content || ""),
//           wordCount: Number(post.wordCount || 0),
//           readingTime: Number(post.readingTime || 0),
//           metaTitle: String(post.metaTitle || ""),
//           metaDescription: String(post.metaDescription || ""),
//           createdAt: post.createdAt,
//           updatedAt: post.updatedAt,
//         });
//       }
// console.log(normalizedPosts)
//       setBlogs(normalizedPosts);
//     } catch (error) {
//       console.error("GET posts error:", error);
//       setBlogs([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadPosts();
// }, []);






// useEffect(() => {
//   const loadMedia = async () => {
//     try {
//       const response = await fetch("/api/media", {
//         cache: "no-store",
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "خطا در دریافت تصاویر");
//       }

//       console.log("MEDIA:", result);

//       setMediaItems(
//         Array.isArray(result)
//           ? result
//           : Array.isArray(result?.media)
//           ? result.media
//           : Array.isArray(result?.items)
//           ? result.items
//           : []
//       );
//     } catch (error) {
//       console.error("GET media error:", error);
//       setMediaItems([]);
//     }
//   };

//   loadMedia();
// }, []);

//   useEffect(() => {
//     const timer = window.setTimeout(() => {
//       setSearchQuery(searchInput);
//       setCurrentPage(1);
//     }, 300);

//     return () => window.clearTimeout(timer);
//   }, [searchInput]);

//   const publishedBlogs = useMemo(
//     () => blogs.filter((post) => post.status === "published"),
//     [blogs]
//   );

//  const dynamicArticles = useMemo<Article[]>(() => {
//   return publishedBlogs.map((post) => {
//     const categoryId = post.categoryId?.trim() || "";

//     const category =
//       BLOG_CATEGORIES.find((item) => item.id === categoryId)?.label ||
//       CATEGORY_FALLBACK;

//     const initials = post.author
//       ? post.author
//           .trim()
//           .split(/\s+/)
//           .map((word) => word[0] || "")
//           .join("")
//           .slice(0, 2)
//       : "";

//     return {
//       id: post._id,
//       slug: post.slug || post._id,
//       categoryId,
//       img: getMediaUrl(post.featuredImage, mediaItems),
//       featuredImageAlt: post.featuredImageAlt?.trim() || "",
//       date: formatPersianDate(post.createdAt || post.updatedAt),
//       readTime: `${post.readingTime || 0} دقیقه`,
//       category,
//       title: post.title,
//       excerpt: getPostExcerpt(post.content, 170),
//       author: post.author,
//       initials,
//       avatarColor: "bg-blue-100 text-[#1565C0]",
//     };
//   });
// }, [publishedBlogs, mediaItems]);

//   const categories = [
//     { id: "همه", label: "همه مطالب" },
//     ...BLOG_CATEGORIES,
//   ];

//   const featuredArticle = useMemo<Article | null>(() => {
//     const featuredPost = [...publishedBlogs]
//       .filter((post) => post.postType === "special")
//       .sort((a, b) => {
//         const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
//         const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
//         return dateB - dateA;
//       })[0];

//     if (!featuredPost) return null;

//     return (
//       dynamicArticles.find((article) => article.id === featuredPost._id) || null
//     );
//   }, [publishedBlogs, dynamicArticles]);

//   const smallArticles = useMemo(() => {
//     if (!featuredArticle) return dynamicArticles;
//     return dynamicArticles.filter((article) => article.id !== featuredArticle.id);
//   }, [dynamicArticles, featuredArticle]);

//   const filteredArticles = useMemo(() => {
//     let list = smallArticles;

//     if (activeCategory !== "همه") {
//       list = list.filter((article) => article.categoryId === activeCategory);
//     }

//     if (searchQuery.trim()) {
//       const q = searchQuery.trim().toLocaleLowerCase("fa");
//       list = list.filter(
//         (article) =>
//           article.title.toLocaleLowerCase("fa").includes(q) ||
//           article.excerpt.toLocaleLowerCase("fa").includes(q) ||
//           article.author.toLocaleLowerCase("fa").includes(q) ||
//           article.category.toLocaleLowerCase("fa").includes(q)
//       );
//     }

//     return list;
//   }, [smallArticles, activeCategory, searchQuery]);

//   // کارت ویژه همیشه مستقل از سرچ، دسته‌بندی و صفحه است.
//   const showFeatured = featuredArticle !== null;

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredArticles.length / PER_PAGE)
//   );

//   const page = Math.min(currentPage, totalPages);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const params = new URLSearchParams(window.location.search);
//     const requestedPage = Number(params.get("page") || "1");
//     const normalizedPage = Number.isFinite(requestedPage)
//       ? Math.max(1, Math.min(Math.floor(requestedPage), totalPages))
//       : 1;

//     if (normalizedPage !== currentPage) {
//       setCurrentPage(normalizedPage);
//     }
//   }, [totalPages, currentPage]);

// useEffect(() => {
//   if (typeof window === "undefined") return;

//   const nextUrl = getBlogsPageUrl(page, pathname);
//   const currentUrl = `${window.location.pathname}${window.location.search}`;

//   if (currentUrl !== nextUrl) {
//     window.history.replaceState(null, "", nextUrl);
//   }
// }, [page, pathname]);

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const pageArticles = useMemo(() => {
//     const start = (page - 1) * PER_PAGE;
//     return filteredArticles.slice(start, start + PER_PAGE);
//   }, [filteredArticles, page]);

//   const handleCategoryChange = (cat: string) => {
//     setActiveCategory(cat);
//     setCurrentPage(1);
//   };

//   const articleCount = (cat: string) =>
//     cat === "همه"
//       ? smallArticles.length
//       : smallArticles.filter((article) => article.categoryId === cat).length;

//  const canonicalUrl = getBlogsPageUrl(page, pathname);
// const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://parahoor.com";
// const absoluteCanonicalUrl = new URL(canonicalUrl, siteUrl).toString();
// const prevUrl = page > 1 ? new URL(getBlogsPageUrl(page - 1, pathname), siteUrl).toString() : null;
// const nextUrl = page < totalPages ? new URL(getBlogsPageUrl(page + 1, pathname), siteUrl).toString() : null;

//   return (
//     <>
//       <Head key={`blogs-seo-${page}`}>
//         <link key="canonical" rel="canonical" href={absoluteCanonicalUrl} />
//         {prevUrl && (
//           <link key="prev" rel="prev" href={prevUrl} />
//         )}
//         {nextUrl && (
//           <link key="next" rel="next" href={nextUrl} />
//         )}
//       </Head>
    
//     <div
//       dir="rtl"
//       className={`min-h-screen transition-colors duration-300 ${
//         darkMode
//           ? "bg-[#0A1128] text-[#E6F7FF]"
//           : "bg-white text-[#0F172A]"
//       }`}
//       style={{
//         fontFamily: "'Vazirmatn', sans-serif",
//         backgroundImage: darkMode
//           ? "linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)"
//           : "linear-gradient(rgba(30,58,138,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(30,58,138,0.045) 1px,transparent 1px)",
//         backgroundSize: "52px 52px",
//       backgroundAttachment: "fixed"
//       }}
//     >
//         {/* ─── HERO ─────────────────────────────────────────────────────────── */}


//       <main>
//            <motion.div
//          className={`border-b transition-colors duration-300 pt-24 ${
//             darkMode
//               ? "bg-transparent border-[#1E334A]"
//               : "bg-transparent border-[rgba(29,78,216,0.12)] shadow-[0_10px_35px_rgba(30,58,138,0.10)]"
//           }`}
//     initial={{ opacity: 0, y: 30 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   viewport={{ once: true, amount: 0.2 }}
// >

//           <div className="max-w-4xl mx-auto px-6 py-16 text-center"
//           style={{
//             background: darkMode
//               ? "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(0,229,255,0.065) 0%, transparent 70%)"
//               : "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(84, 128, 215, 0.18) 0%, transparent 70%)",
//           }}
//           >
            
//             <div
//               className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 ${
//                 darkMode
//                   ? "bg-[#062536] text-[#00E5FF]"
//                   : "bg-[rgba(30,58,138,0.06)] text-[#1E3A8A] border border-[rgba(29,78,216,0.20)]"
//               }`}
//             >
//               <BookOpen className="w-3.5 h-3.5" />
//               آرشیو گزارش‌های تحلیلی و حقوقی
//             </div>

// <h1
//   className="glow-text font-black leading-tight mb-6"
//   style={{
//     fontSize: "clamp(2rem, 5vw, 3.5rem)",
//     color: darkMode ? "#e8f4f8" : "#0c1a43",
//     lineHeight: "1.3",
//     fontWeight: 900,
//     textShadow: darkMode
//       ? undefined
//       : "0 0 18px rgba(30,58,138,0.10)",
//   }}
// >
//   {seo.h1Title}
// </h1>

//             <p
//               className={`text-base mb-10 ${
//                 darkMode ? "text-[#A7BACB]" : "text-[#475569]"
//               }`}
//             >
//               گزارش‌های جرم‌شناسی، هشدارهای امنیتی و اخبار حقوقی توسط تیم متخصصان پاراهور
//             </p>

//             {/* Search bar */}

//             <div className="max-w-2xl mx-auto">
//               <div
//                 className={`flex items-center rounded-xl shadow-sm overflow-hidden focus-within:shadow-md transition-all ${
//                   darkMode
//                     ? "bg-[#0D1A2B] border border-[#3A536B] focus-within:border-[#00E5FF]/70 focus-within:shadow-[0_0_25px_rgba(0,229,255,0.12)]"
//                     : "bg-white border border-[rgba(29,78,216,0.20)] focus-within:border-[rgba(29,78,216,0.52)] focus-within:shadow-[0_4px_20px_rgba(30,58,138,0.10)]"
//                 }`}
//               >
//                 <div
//                   className={`px-4 flex-shrink-0 ${
//                     darkMode
//                       ? "text-[#8FA5B8]"
//                       : "text-[#64748B]"
//                   }`}
//                 >
//                   <SearchIcon className="w-5 h-5" />
//                 </div>

//                 <input
//                   type="text"
//                   value={searchInput}
//                   onChange={(e) =>
//                     setSearchInput(e.target.value)
//                   }
//                   placeholder="جستجو در گزارش‌ها و مقالات..."
//                   className={`flex-1 py-4 text-sm bg-transparent outline-none ${
//                     darkMode
//                       ? "text-[#E6F7FF] placeholder:text-[#71869A]"
//                       : "text-[#0F172A] placeholder:text-[#94A3B8]"
//                   }`}
//                 />
//               </div>

//               {searchQuery && (
//                 <button
//                   onClick={() => {
//                     setSearchInput("");
//                     setSearchQuery("");
//                     setCurrentPage(1);
//                   }}
//                   className={`mt-3 text-xs hover:underline ${
//                     darkMode
//                       ? "text-[#00E5FF]"
//                       : "text-[#1E3A8A]"
//                   }`}
//                 >
//                   پاک کردن جستجو: «{searchQuery}»
//                 </button>
//               )}
//             </div>
//           </div>
// </motion.div>

//         {/* ─── CATEGORY TABS ────────────────────────────────────────────────── */}


//      <div className="relative">
//   {filterFixed && (
//     <div className="h-[58px] md:h-[76px]" />
//   )}

//   <motion.div
//     className={`${
//       filterFixed
//         ? "fixed top-[55px] md:top-[70px] left-0 right-0 z-40"
//         : "relative"
//     } border-b transition-colors duration-300 ${
//       darkMode
//         ? "bg-[#060E18] border-[#1E334A]"
//         : "bg-white border-[rgba(29,78,216,0.12)]"
//     }`}
//     initial={{ opacity: 0, y: 60 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.7 }}
//     viewport={{ once: true, amount: 0.2 }}
//   >
//     <div className="max-w-7xl mx-auto px-4 sm:px-6">

//       {/* ================= MOBILE ================= */}
//       <div className="md:hidden relative py-2">

//         <button
//           type="button"
//           onClick={() =>
//             setMobileCategoryOpen((prev) => !prev)
//           }
//           className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
//             darkMode
//               ? "bg-[#0B1724] border-[#1E334A] text-[#E6F7FF] hover:border-[#496276]"
//               : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
//           }`}
//         >
//           <div className="flex items-center gap-2 min-w-0">
//             <span className="font-semibold text-sm truncate">
//               {
//                 categories.find(
//                   (cat) => cat.id === activeCategory
//                 )?.label || "همه مقالات"
//               }
//             </span>

//             <span
//               className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
//                 darkMode
//                   ? "bg-[#073342] text-[#00E5FF]"
//                   : "bg-[rgba(30,58,138,0.08)] text-[#1E3A8A]"
//               }`}
//             >
//               {articleCount(activeCategory)}
//             </span>
//           </div>

//           <svg
//             width="18"
//             height="18"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className={`shrink-0 transition-transform duration-300 ${
//               mobileCategoryOpen ? "rotate-180" : ""
//             }`}
//           >
//             <path d="m6 9 6 6 6-6" />
//           </svg>
//         </button>

//         {/* Dropdown */}
//         {mobileCategoryOpen && (
//           <div
//             className={`absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border overflow-hidden shadow-xl ${
//               darkMode
//                 ? "bg-[#08121E] border-[#1E334A] shadow-black/40"
//                 : "bg-white border-slate-200 shadow-slate-300/40"
//             }`}
//           >
//             {categories.map((cat) => {
//               const active = activeCategory === cat.id;
//               const count = articleCount(cat.id);

//               return (
//                 <button
//                   key={cat.id}
//                   type="button"
//                   onClick={() => {
//                     handleCategoryChange(cat.id);
//                     setMobileCategoryOpen(false);
//                   }}
//                   className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold transition-all duration-200 ${
//                     active
//                       ? darkMode
//                         ? "bg-[#073342] text-[#00E5FF]"
//                         : "bg-[rgba(30,58,138,0.06)] text-[#1E3A8A]"
//                       : darkMode
//                         ? "text-[#8FA5B8] hover:bg-[#101C29] hover:text-[#E6F7FF]"
//                         : "text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     {active && (
//                       <svg
//                         width="15"
//                         height="15"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path d="m5 12 4 4L19 7" />
//                       </svg>
//                     )}

//                     <span>{cat.label}</span>
//                   </div>

//                   <span
//                     className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
//                       active
//                         ? darkMode
//                           ? "bg-[#00E5FF]/10 text-[#00E5FF]"
//                           : "bg-[rgba(30,58,138,0.08)] text-[#1E3A8A]"
//                         : darkMode
//                           ? "bg-[#101C29] text-[#71869A]"
//                           : "bg-[#F1F5F9] text-[#64748B]"
//                     }`}
//                   >
//                     {count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* ================= DESKTOP ================= */}
//       <div className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
//         {categories.map((cat) => {
//           const active = activeCategory === cat.id;
//           const count = articleCount(cat.id);

//           return (
//             <button
//               key={cat.id}
//               onClick={() => handleCategoryChange(cat.id)}
//               className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
//                 active
//                   ? darkMode
//                     ? "border-[#00E5FF] text-[#00E5FF]"
//                     : "border-[#1E3A8A] text-[#1E3A8A]"
//                   : darkMode
//                     ? "border-transparent text-[#8FA5B8] hover:text-[#E6F7FF] hover:border-[#496276]"
//                     : "border-transparent text-[#475569] hover:text-[#0F172A] hover:border-[rgba(29,78,216,0.30)]"
//               }`}
//             >
//               {cat.label}

//               <span
//                 className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
//                   active
//                     ? darkMode
//                       ? "bg-[#073342] text-[#00E5FF]"
//                       : "bg-[rgba(30,58,138,0.08)] text-[#1E3A8A]"
//                     : darkMode
//                       ? "bg-[#101C29] text-[#71869A]"
//                       : "bg-[#F1F5F9] text-[#64748B]"
//                 }`}
//               >
//                 {count}
//               </span>
//             </button>
//           );
//         })}
//       </div>

//     </div>
//   </motion.div>
// </div>






//         {/* ─── CONTENT ──────────────────────────────────────────────────────── */}

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
//           {/* ─── FEATURED ARTICLE ───────────────────────────────────────────── */}

//           <AnimatePresence mode="wait">
//             {loading ? (
//               <motion.div
//                 key="radar-skeleton"
//                 variants={skeletonContainerVariants}
//                 initial="hidden"
//                 animate="show"
//                 exit="exit"
//                 className="mb-14"
//               >
//                 <FeaturedSkeleton darkMode={darkMode} />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="radar-featured"
//                 variants={contentVariants}
//                 initial="hidden"
//                 animate="show"
//                 className="mb-14"
//               >
//                 {showFeatured && featuredArticle ? (

//                <motion.div
//        className="mb-14"
//   initial={{ opacity: 0, y: 60 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.7 }}
//   viewport={{ once: true, amount: 0.2 }}
// >
//               <div className="flex items-center gap-2 mb-5">
//                 <span
//                   className={`w-1 h-5 rounded-full block ${
//                     darkMode
//                       ? "bg-[#00E5FF]"
//                       : "bg-[#1E3A8A]"
//                   }`}
//                 />

//                 <span
//                   className={`text-xs font-bold uppercase tracking-widest ${
//                     darkMode
//                       ? "text-[#8FA5B8]"
//                       : "text-[#475569]"
//                   }`}
//                 >
//                   گزارش ویژه
//                 </span>
//               </div>

//               <article
//                 className={`group border rounded-2xl overflow-hidden transition-all duration-200 ${
//                   darkMode
//                     ? "bg-cyan-800/10 border-cyan-500/30 hover:border-cyan-800 hover:bg-cyan-900/15 hover:shadow-[0_8px_40px_rgba(0,229,255,0.2)]"
//                     : "bg-white border-[rgba(29,78,216,0.20)] hover:border-[rgba(29,78,216,0.52)] hover:bg-[rgba(237,242,255,0.52)] hover:shadow-[0_16px_40px_rgba(30,58,138,0.34)]"
//                 }`}

//               >
//                 <div className="grid md:grid-cols-5">
//                   {/* Image */}

//                   <div
//                     className={`relative md:col-span-2 aspect-video md:aspect-auto overflow-hidden ${
//                       darkMode
//                         ? "bg-[#0D1B29]"
//                         : "bg-[#F1F5F9]"
//                     }`}
//                   >

//     {featuredArticle.img ? (
// <img
//   src={featuredArticle.img}
//   alt={
//     featuredArticle.featuredImageAlt?.trim() ||
//     featuredArticle.title
//   }
//   className="block w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
//   loading="lazy"
// />
//     ) : (
// <div style={{
//   borderBottom: darkMode ? "none" : "1px solid #4362815e",
// }}
// className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
// >
//   <HeroImageFallback darkMode={darkMode} />
// </div>

//     )}

//                     {/* سایه‌ی لبه‌ی عکس: پایین عکس در موبایل، لبه‌ی داخلی عکس در دسکتاپ */}
//                     <div
//                       aria-hidden="true"
//                       className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t to-transparent md:inset-x-auto md:inset-y-0 md:left-0 md:h-auto md:w-2/5 md:bg-gradient-to-r ${
//                         darkMode ? "from-[#050C1E]/70" : "from-[#1E3A8A]/20"
//                       }`}
//                     />
//                   </div>

//                   {/* Content */}

//                   <div className="md:col-span-3 min-w-0 p-5 sm:p-8 md:p-10 flex flex-col justify-between transition-all duration-300 dark:hover:bg-cyan-800/5">
//                     <div>
//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
//                         <span
//                           className={`text-[11px] font-bold px-2.5 py-1 rounded-full ring-1 ring-inset ${
//                             getCategoryBadgeClass(featuredArticle.category, darkMode)
//                           }`}
//                         >
//                           {featuredArticle.category}
//                         </span>

//                         <span
//                           className={`text-xs font-medium ${
//                             darkMode
//                               ? "text-[#71869A]"
//                               : "text-[#64748B]"
//                           }`}
//                         >
//                           {featuredArticle.date}
//                         </span>

//                         <span
//                           className={`flex items-center gap-1 text-xs ${
//                             darkMode
//                               ? "text-[#71869A]"
//                               : "text-[#64748B]"
//                           }`}
//                         >
//                           <Clock className="w-3 h-3" />
//                           {featuredArticle.readTime} مطالعه
//                         </span>
//                       </div>

//                       <h2
//                         className={`text-xl md:text-2xl font-bold leading-snug mb-4 transition-colors ${
//                           darkMode
//                             ? "text-[#E6F7FF] group-hover:text-[#E6F7FF]"
//                             : "text-[#1E3A8A] group-hover:text-[#1E3A8A]"
//                         }`}
//                       >
//                         {featuredArticle.title}

//                       </h2>

//                       <p
//                         className={`text-sm md:text-base leading-relaxed line-clamp-3 ${
//                           darkMode
//                             ? "text-[#9DB0C0]"
//                             : "text-[#475569]"
//                         }`}
//                       >
//                         {featuredArticle.excerpt}
//                       </p>
//                     </div>

//                     <div
//                       className={`flex flex-wrap items-center justify-between gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t ${
//                         darkMode
//                           ? "border-[#1E334A]"
//                           : "border-[#E2E8F0]"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${featuredArticle.avatarColor}`}
//                         >
//                           {featuredArticle.initials}
//                         </div>

//                         <span
//                           className={`text-sm font-medium ${
//                             darkMode
//                               ? "text-[#9DB0C0]"
//                               : "text-[#475569]"
//                           }`}
//                         >
//                           {/* {featuredArticle.author} */}
//                           تیم تخصصی پاراهور
//                         </span>
//                       </div>

//                       <Link
//                         href={`/blogs/${featuredArticle.slug || featuredArticle.id}`}
//                         className={`inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all ${
//                           darkMode
//                             ? "text-[#00E5FF]"
//                             : "text-[#1E3A8A]"
//                         }`}
//                       >
//                         مطالعه گزارش کامل
//                         <ChevronLeft className="w-4 h-4" />
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//           </motion.div>
//                 ) : null}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* ─── RESULTS COUNT ──────────────────────────────────────────────── */}

            

//              <motion.div
//       className="flex items-center justify-between gap-3 mb-6 sm:mb-8"
//   initial={{ opacity: 0, y: 60 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.7 }}
//   viewport={{ once: true, amount: 0.2 }}
// >
//             <div
//               className={`flex items-center gap-2 text-sm ${
//                 darkMode
//                   ? "text-[#8FA5B8]"
//                   : "text-[#475569]"
//               }`}
//             >
//               <span>
//                 نمایش{" "}
//                 <span
//                   className={`font-semibold ${
//                     darkMode
//                       ? "text-[#E6F7FF]"
//                       : "text-[#0F172A]"
//                   }`}
//                 >
//                   {filteredArticles.length}
//                 </span>{" "}
//                 مطلب

//                 {activeCategory !== "همه" && (
//                   <span>
//                     {" "}
//                     در{" "}
//                     <span
//                       className={`font-semibold ${
//                         darkMode
//                           ? "text-[#E6F7FF]"
//                           : "text-[#0F172A]"
//                       }`}
//                     >
//                       {activeCategory}
//                     </span>
//                   </span>
//                 )}
//               </span>
//             </div>

//             <span
//               className={`text-xs ${
//                 darkMode
//                   ? "text-[#71869A]"
//                   : "text-[#64748B]"
//               }`}
//             >
//               صفحه {page} از {totalPages}
//             </span>
// </motion.div>
          

//           {/* ─── ARTICLE GRID ────────────────────────────────────────────────── */}
//           <AnimatePresence mode="wait">
//             {loading ? (
//               <motion.div
//                 key="article-skeletons"
//                 variants={skeletonContainerVariants}
//                 initial="hidden"
//                 animate="show"
//                 exit="exit"
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
//               >
//                 {[1, 2, 3].map((item) => (
//                   <ArticleSkeleton key={item} darkMode={darkMode} />
//                 ))}
//               </motion.div>
//             ) : pageArticles.length > 0 ? (
//               <motion.div
//                 key={`article-page-${page}-${activeCategory}-${searchQuery}`}
//                 variants={contentVariants}
//                 initial="hidden"
//                 animate="show"
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
//               >
//                 {pageArticles.map((article, index) => (
//                   <motion.div
//                     key={article.id}
//                     className="h-full min-w-0"
//                     initial={{ opacity: 0, y: 14 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
//                   >
//                     <ArticleCard
//                       article={article}
//                       darkMode={darkMode}
//                       mediaItems={mediaItems}
//                     />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="empty-results"
//                 initial={{ opacity: 0, y: 14 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//                 className="py-24 flex flex-col items-center justify-center text-center"
//               >
//                 <div
//                   className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
//                     darkMode ? "bg-[#101C29]" : "bg-[#F1F5F9]"
//                   }`}
//                 >
//                   <SearchIcon
//                     className={`w-6 h-6 ${
//                       darkMode ? "text-[#60788C]" : "text-[#64748B]"
//                     }`}
//                   />
//                 </div>
//                 <p
//                   className={`text-base font-semibold mb-1 ${
//                     darkMode ? "text-[#A7BACB]" : "text-[#475569]"
//                   }`}
//                 >
//                   مطلبی یافت نشد
//                 </p>
//                 <p
//                   className={`text-sm ${
//                     darkMode ? "text-[#71869A]" : "text-[#64748B]"
//                   }`}
//                 >
//                   معیارهای جستجو یا فیلتر را تغییر دهید
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* ─── PAGINATION ──────────────────────────────────────────────────── */}

//           {totalPages > 1 && (
//             <div className="flex flex-wrap items-center justify-center gap-2 mt-10 sm:mt-12 pb-12">
//               {/* صفحه قبل */}

//               <button
//                 type="button"
//                 onClick={() =>
//                   setCurrentPage((prev) =>
//                     Math.max(prev - 1, 1)
//                   )
//                 }
//                 disabled={page === 1}
//                 className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
//                   darkMode
//                     ? "border-[#263B4E] text-[#8FA5B8] hover:border-[#496276] hover:text-[#E6F7FF]"
//                     : "border-[rgba(29,78,216,0.20)] text-[#475569] hover:border-[rgba(29,78,216,0.52)] hover:text-[#1E3A8A]"
//                 } disabled:opacity-30`}
//                 aria-label="صفحه قبل"
//               >
//                 <ChevronRight size={18} />
//               </button>

//               {/* شماره صفحات */}

//               {Array.from(
//                 { length: totalPages },
//                 (_, index) => {
//                   const pageNumber = index + 1;

//                   return (
//                     <button
//                       key={pageNumber}
//                       type="button"
//                       onClick={() =>
//                         setCurrentPage(pageNumber)
//                       }
//                       className={`w-10 h-10 rounded-lg border flex items-center justify-center text-sm font-medium transition-all ${
//                         page === pageNumber
//                           ? darkMode
//                             ? "bg-[#00B8D4] text-[#031018] shadow-[0_4px_15px_rgba(0,229,255,0.15)]"
//                             : "bg-[#1E3A8A] text-white shadow-[0_4px_15px_rgba(30,58,138,0.20)]"
//                           : darkMode
//                           ? "border-[#263B4E] text-[#8FA5B8] hover:border-[#496276] hover:text-[#E6F7FF]"
//                           : "border-[rgba(29,78,216,0.20)] text-[#475569] hover:border-[rgba(29,78,216,0.52)] hover:text-[#1E3A8A]"
//                       }`}
//                     >
//                       {pageNumber}
//                     </button>
//                   );
//                 }
//               )}

//               {/* صفحه بعد */}

//               <button
//                 type="button"
//                 onClick={() =>
//                   setCurrentPage((prev) =>
//                     Math.min(prev + 1, totalPages)
//                   )
//                 }
//                 disabled={page === totalPages}
//                 className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
//                   darkMode
//                     ? "border-[#263B4E] text-[#8FA5B8] hover:border-[#496276] hover:text-[#E6F7FF]"
//                     : "border-[rgba(29,78,216,0.20)] text-[#475569] hover:border-[rgba(29,78,216,0.52)] hover:text-[#1E3A8A]"
//                 } disabled:opacity-30`}
//                 aria-label="صفحه بعد"
//               >
//                 <ChevronLeft size={18} />
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//     </>
//   );
// }

// // ── Motion skeletons ──────────────────────────────────────────────────────────

// const skeletonContainerVariants: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { duration: 0.35, staggerChildren: 0.07 },
//   },
//   exit: {
//     opacity: 0,
//     transition: { duration: 0.25 },
//   },
// };

// const skeletonItemVariants: Variants = {
//   hidden: { opacity: 0, y: 12 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
//   exit: {
//     opacity: 0,
//     y: -8,
//     transition: { duration: 0.2, ease: "easeIn" },
//   },
// };

// const contentVariants: Variants = {
//   hidden: { opacity: 0, y: 18 },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// function SkeletonBlock({
//   darkMode,
//   className,
// }: {
//   darkMode: boolean;
//   className?: string;
// }) {
//   return (
//     <div
//       className={`relative overflow-hidden rounded-md ${
//         darkMode ? "bg-[#193249]" : "bg-[#E7EEF6]"
//       } ${className || ""}`}
//     >
//       <motion.div
//         className={`absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent ${
//           darkMode ? "via-white/[0.06]" : "via-white/70"
//         } to-transparent`}
//         animate={{ x: ["-20%", "300%"] }}
//         transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
//       />
//     </div>
//   );
// }

// function FeaturedSkeleton({ darkMode }: { darkMode: boolean }) {
//   return (
//     <motion.article
//       variants={skeletonItemVariants}
//       className={`border rounded-2xl overflow-hidden ${
//         darkMode
//           ? "bg-[#0D1B29] border-[#1E334A]"
//           : "bg-white border-[rgba(29,78,216,0.16)] shadow-[0_8px_30px_rgba(30,58,138,0.06)]"
//       }`}
//     >
//       <div className="grid md:grid-cols-5">
//         <SkeletonBlock
//           darkMode={darkMode}
//           className="md:col-span-2 aspect-video md:aspect-auto min-h-[260px] rounded-none"
//         />
//         <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-between">
//           <div>
//             <div className="flex items-center gap-3 mb-6">
//               <SkeletonBlock darkMode={darkMode} className="h-6 w-32 rounded-full" />
//               <SkeletonBlock darkMode={darkMode} className="h-3 w-20" />
//               <SkeletonBlock darkMode={darkMode} className="h-3 w-24" />
//             </div>
//             <SkeletonBlock darkMode={darkMode} className="h-7 w-[90%] mb-3" />
//             <SkeletonBlock darkMode={darkMode} className="h-7 w-[68%] mb-6" />
//             <SkeletonBlock darkMode={darkMode} className={`h-4 w-full mb-2 ${darkMode ? "bg-[#172D41]" : "bg-[#EEF3F8]"}`} />
//             <SkeletonBlock darkMode={darkMode} className={`h-4 w-[94%] mb-2 ${darkMode ? "bg-[#172D41]" : "bg-[#EEF3F8]"}`} />
//             <SkeletonBlock darkMode={darkMode} className={`h-4 w-[76%] ${darkMode ? "bg-[#172D41]" : "bg-[#EEF3F8]"}`} />
//           </div>
//           <div className={`flex items-center justify-between mt-8 pt-6 border-t ${darkMode ? "border-[#1E334A]" : "border-[#E3E9F0]"}`}>
//             <div className="flex items-center gap-3">
//               <SkeletonBlock darkMode={darkMode} className="w-8 h-8 rounded-full" />
//               <SkeletonBlock darkMode={darkMode} className="h-3 w-28" />
//             </div>
//             <SkeletonBlock darkMode={darkMode} className="h-3 w-28" />
//           </div>
//         </div>
//       </div>
//     </motion.article>
//   );
// }

// function ArticleSkeleton({ darkMode }: { darkMode: boolean }) {
//   return (
//     <motion.article
//       variants={skeletonItemVariants}
//       className={`flex flex-col border rounded-2xl overflow-hidden ${
//         darkMode
//           ? "bg-[#0D1B29] border-[#1E334A]"
//           : "bg-white border-[#D5E3F0]"
//       }`}
//     >
//       <SkeletonBlock
//         darkMode={darkMode}
//         className="aspect-video flex-shrink-0 rounded-none"
//       />
//       <div className="flex flex-col p-6">
//         <SkeletonBlock darkMode={darkMode} className="h-6 w-28 rounded-full mb-5" />
//         <SkeletonBlock darkMode={darkMode} className="h-5 w-[88%] mb-2" />
//         <SkeletonBlock darkMode={darkMode} className="h-5 w-[68%] mb-5" />
//         <SkeletonBlock darkMode={darkMode} className={`h-3.5 w-full mb-2 ${darkMode ? "bg-[#172D41]" : "bg-[#EEF3F8]"}`} />
//         <SkeletonBlock darkMode={darkMode} className={`h-3.5 w-[92%] mb-2 ${darkMode ? "bg-[#172D41]" : "bg-[#EEF3F8]"}`} />
//         <SkeletonBlock darkMode={darkMode} className={`h-3.5 w-[72%] mb-7 ${darkMode ? "bg-[#172D41]" : "bg-[#EEF3F8]"}`} />
//         <div className={`pt-4 border-t flex items-center justify-between ${darkMode ? "border-[#1E334A]" : "border-[#E3E9F0]"}`}>
//           <div className="flex items-center gap-2.5">
//             <SkeletonBlock darkMode={darkMode} className="w-7 h-7 rounded-full" />
//             <div>
//               <SkeletonBlock darkMode={darkMode} className="h-3 w-24 mb-1" />
//               <SkeletonBlock darkMode={darkMode} className={`h-2.5 w-16 ${darkMode ? "bg-[#172D41]" : "bg-[#EEF3F8]"}`} />
//             </div>
//           </div>
//           <SkeletonBlock darkMode={darkMode} className="h-3 w-16" />
//         </div>
//       </div>
//     </motion.article>
//   );
// }

// function ArticleCard({
//   article,
//   darkMode,
//   mediaItems,
// }: {
//   article: Article;
//   darkMode: boolean;
//   mediaItems: MediaItem[];
// }) {
//   return (
//     <article
//       className={`group flex h-full min-w-0 flex-col border rounded-2xl overflow-hidden transition-all duration-200 ${
//         darkMode
//           ? "bg-cyan-800/10 border-cyan-500/30 hover:border-cyan-800 hover:bg-cyan-900/15 hover:shadow-[0_8px_40px_rgba(0,229,255,0.2)]"
//           : "bg-white border-[rgba(29,78,216,0.20)] hover:border-[rgba(29,78,216,0.52)] hover:bg-[rgba(237,242,255,0.52)] hover:shadow-[0_16px_40px_rgba(30,58,138,0.34)]"
//       }`}
//     >
//       {/* Thumbnail */}

//       <div
//         className={`relative aspect-video overflow-hidden flex-shrink-0 ${
//           darkMode ? "bg-[#0D1B29]" : "bg-[#F1F5F9]"
//         }`}
//       >
//         {article.img ? (
//           <img
//             src={article.img || "/placeholder.svg"}
//             alt={article.featuredImageAlt?.trim() || article.title}
//             className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             loading="lazy"
//           />
//         ) : (
//           <div
//             className="w-full h-full group-hover:scale-105 transition-transform duration-500"
//             style={{
//               borderBottom: darkMode ? "none" : "1px solid #43628123",
//             }}
//           >
//             <HeroImageFallback darkMode={darkMode} />
//           </div>
//         )}

//         {/* سایه‌ی پایین عکس تا از بدنه‌ی کارت جدا بشه */}
//         <div
//           aria-hidden="true"
//           className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t to-transparent ${
//             darkMode ? "from-[#050C1E]/70" : "from-[#1E3A8A]/20"
//           }`}
//         />
//       </div>

//       {/* Content */}

//       <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6 transition-all duration-300 dark:hover:bg-cyan-800/5">
//         {/* Category */}

//         <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4">
//           <span
//             className={`text-[11px] font-bold px-2.5 py-1 rounded-full ring-1 ring-inset ${getCategoryBadgeClass(
//               article.category,
//               darkMode
//             )}`}
//           >
//             {article.category}
//           </span>
//         </div>

//         {/* Title */}

//         <h3
//           className={`text-base font-bold leading-snug mb-3 break-words transition-colors line-clamp-2 ${
//             darkMode
//               ? "text-[#E6F7FF] group-hover:text-[#E6F7FF]"
//               : "text-[#1E3A8A] group-hover:text-[#1E3A8A]"
//           }`}
//         >
//           {article.title}
//         </h3>

//         {/* Excerpt */}

//         <p
//           className={`text-sm leading-relaxed line-clamp-3 break-words mb-5 flex-1 ${
//             darkMode ? "text-[#9DB0C0]" : "text-[#475569]"
//           }`}
//         >
//           {article.excerpt.length > 50 ?
//           article.excerpt.slice(0.50).trim() + "..." :
//           article.excerpt
//         }
//         </p>

//         {/* Footer */}

//         <div
//           className={`mt-auto pt-4 border-t flex flex-wrap items-center justify-between gap-x-3 gap-y-3 ${
//             darkMode ? "border-[#1E334A]" : "border-[#E2E8F0]"
//           }`}
//         >
//           <div className="flex items-center gap-2.5 min-w-0">
//             <div
//               className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${article.avatarColor}`}
//             >
//               {article.initials}
//             </div>

//             <div className="min-w-0">
//               <p
//                 className={`text-xs font-semibold truncate pb-1 ${
//                   darkMode ? "text-[#9DB0C0]" : "text-[#475569]"
//                 }`}
//               >
//                 {/* {article.author} */}
//                 تیم تخصصی پاراهور
//               </p>

//               <div
//                 className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] ${
//                   darkMode ? "text-[#71869A]" : "text-[#64748B]"
//                 }`}
//               >
//                 <span>{article.date}</span>
//                 <span>·</span>
//                 <span className="inline-flex items-center gap-1">
//                   <Clock className="w-2.5 h-2.5" />
//                   {article.readTime}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <Link
//             href={`/blogs/${article.slug || article.id}`}
//             className={`flex items-center gap-1 text-xs font-semibold whitespace-nowrap hover:gap-1.5 transition-all flex-shrink-0 ${
//               darkMode ? "text-[#00E5FF]" : "text-[#1E3A8A]"
//             }`}
//           >
//             ادامه مطلب
//             <ChevronLeft className="w-3 h-3" />
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// }
import { headers } from "next/headers";
import type { Metadata } from "next";
import BlogPageClient, { type BlogPageInitialData } from "./BlogPageClient";
import { buildBlogsPaginationLinks, getPageMetadata } from "@/lib/seo";

const PER_PAGE = 6;

type RawBlogPost = {
  _id?: string;
  id?: string;
  title?: string;
  slug?: string;
  author?: string;
  categoryId?: string;
  tags?: string[];
  status?: "draft" | "published";
  postType?: "normal" | "special";
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  content?: string;
  wordCount?: number;
  readingTime?: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt?: string;
  updatedAt?: string;
};

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  author: string;
  categoryId: string;
  tags: string[];
  status: "draft" | "published";
  postType: "normal" | "special";
  featuredImage: string | null;
  featuredImageAlt: string | null;
  content: string;
  wordCount: number;
  readingTime: number;
  metaTitle: string;
  metaDescription: string;
  createdAt?: string;
  updatedAt?: string;
};

type MediaItem = {
  id: string;
  name: string;
  alt: string;
  url: string;
};

function normalizePost(post: RawBlogPost): BlogPost | null {
  const id = post._id || post.id;
  if (!id) return null;

  return {
    _id: String(id),
    title: String(post.title || ""),
    slug: String(post.slug || ""),
    author: String(post.author || ""),
    categoryId: String(post.categoryId || ""),
    tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
    status: post.status === "published" ? "published" : "draft",
    postType: post.postType === "special" ? "special" : "normal",
    featuredImage: post.featuredImage || null,
    featuredImageAlt: post.featuredImageAlt || null,
    content: String(post.content || ""),
    wordCount: Number(post.wordCount || 0),
    readingTime: Number(post.readingTime || 0),
    metaTitle: String(post.metaTitle || ""),
    metaDescription: String(post.metaDescription || ""),
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

async function fetchServerJson(
  url: string,
  timeoutMs = 10000
): Promise<{ response: Response; data: any }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
    const data = await response.json();
    return { response, data };
  } finally {
    clearTimeout(timeout);
  }
}

async function getBaseUrl() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  if (!host) return null;
  const protocol = requestHeaders.get("x-forwarded-proto") || "http";
  return `${protocol}://${host}`;
}

async function getPublishedPosts(baseUrl: string): Promise<BlogPost[]> {
  const { response, data } = await fetchServerJson(`${baseUrl}/api/posts`);
  if (!response.ok) return [];

  const rawPosts: RawBlogPost[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.posts)
    ? data.posts
    : [];

  return rawPosts
    .map(normalizePost)
    .filter((item): item is BlogPost => item !== null)
    .filter((item) => item.status === "published");
}

function getSafePage(pageParam: string | undefined, totalPages: number) {
  const requested = Number(pageParam || "1");
  if (!Number.isFinite(requested)) return 1;
  return Math.max(1, Math.min(Math.floor(requested), totalPages));
}

export const dynamic = "force-dynamic";

type BlogsSearchParams = { page?: string };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<BlogsSearchParams>;
}): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const baseMetadata = await getPageMetadata("blogs");

  const baseUrl = await getBaseUrl();
  if (!baseUrl) return baseMetadata;

  try {
    const publishedPosts = await getPublishedPosts(baseUrl);
    const totalPages = Math.max(1, Math.ceil(publishedPosts.length / PER_PAGE));
    const currentPage = getSafePage(pageParam, totalPages);

    const { canonical } = buildBlogsPaginationLinks({
      basePath: "/blogs",
      currentPage,
      totalPages,
    });

    return {
      ...baseMetadata,
      alternates: {
        ...(baseMetadata.alternates || {}),
        canonical,
      },
    };
  } catch (error) {
    console.error("generateMetadata /blogs error:", error);
    return baseMetadata;
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<BlogsSearchParams>;
}) {
  const { page: pageParam } = await searchParams;
  const baseUrl = await getBaseUrl();

  const emptyData: BlogPageInitialData = {
    blogs: [],
    mediaItems: [],
    seo: { h1Title: "بلاگ پاراهور" },
    initialPage: 1,
  };

  if (!baseUrl) {
    return (
      <div className="min-h-screen">
        <BlogPageClient initialData={emptyData} />
      </div>
    );
  }

  try {
    const [postsResult, mediaResult] = await Promise.allSettled([
      fetchServerJson(`${baseUrl}/api/posts`),
      fetchServerJson(`${baseUrl}/api/media`),
    ]);

    if (postsResult.status === "rejected") {
      throw postsResult.reason;
    }

    const { response: postsResponse, data: postsData } = postsResult.value;

    if (!postsResponse.ok) {
      throw new Error(postsData?.message || "خطا در دریافت پست‌ها");
    }

    const rawPosts: RawBlogPost[] = Array.isArray(postsData)
      ? postsData
      : Array.isArray(postsData?.posts)
      ? postsData.posts
      : [];

    const publishedPosts = rawPosts
      .map(normalizePost)
      .filter((item): item is BlogPost => item !== null)
      .filter((item) => item.status === "published");

    let mediaItems: MediaItem[] = [];

    if (mediaResult.status === "fulfilled") {
      const { response: mediaResponse, data: mediaData } = mediaResult.value;
      if (mediaResponse.ok) {
        mediaItems = Array.isArray(mediaData)
          ? mediaData
          : Array.isArray(mediaData?.media)
          ? mediaData.media
          : Array.isArray(mediaData?.items)
          ? mediaData.items
          : [];
      }
    }

    const totalPages = Math.max(1, Math.ceil(publishedPosts.length / PER_PAGE));
    const initialPage = getSafePage(pageParam, totalPages);

    const initialData: BlogPageInitialData = {
      blogs: publishedPosts,
      mediaItems,
      seo: { h1Title: "بلاگ پاراهور" },
      initialPage,
    };

    return (
      <div className="min-h-screen">
        <BlogPageClient initialData={initialData} />
      </div>
    );
  } catch (error) {
    console.error("GET blogs list error:", error);

    return (
      <div className="min-h-screen">
        <BlogPageClient initialData={emptyData} />
      </div>
    );
  }
}
