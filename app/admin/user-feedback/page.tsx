
// "use client";

// import { useEffect, useMemo, useState } from "react";

// /* -------------------------------------------------------------------------- */
// /* TYPES */
// /* -------------------------------------------------------------------------- */

// type FeedbackStatus = "pending" | "approved" | "rejected";

// type FeedbackSubject =
//   | "service-feedback"
//   | "website-suggestion"
//   | "content-suggestion"
//   | "technical-feedback"
//   | "partnership"
//   | "feature-request"
//   | "other";

// type Feedback = {
//   id: string;
//   name: string;
//   contact: string;
//   subject: FeedbackSubject;
//   message: string;
//   approvalStatus: FeedbackStatus;
//   createdAt: string;
// };

// type ModalType = "reject" | "delete" | null;

// /* -------------------------------------------------------------------------- */
// /* CONSTANTS */
// /* -------------------------------------------------------------------------- */

// const SUBJECT_LABELS: Record<FeedbackSubject, string> = {
//   "service-feedback": "انتقاد از خدمات و تجربه کاربری",
//   "website-suggestion": "پیشنهاد برای بهبود سایت",
//   "content-suggestion": "پیشنهاد محتوایی",
//   "technical-feedback": "مشکل فنی یا خطای سایت",
//   partnership: "پیشنهاد همکاری با پاراهور",
//   "feature-request": "پیشنهاد قابلیت یا ایده جدید",
//   other: "سایر انتقادات و پیشنهادات",
// };

// const STATUS_LABELS: Record<FeedbackStatus, string> = {
//   pending: "در انتظار بررسی",
//   approved: "تأیید شده",
//   rejected: "رد شده",
// };

// const VALID_SUBJECTS = new Set<FeedbackSubject>([
//   "service-feedback",
//   "website-suggestion",
//   "content-suggestion",
//   "technical-feedback",
//   "partnership",
//   "feature-request",
//   "other",
// ]);

// const VALID_STATUSES = new Set<FeedbackStatus>([
//   "pending",
//   "approved",
//   "rejected",
// ]);

// /* -------------------------------------------------------------------------- */
// /* HELPERS */
// /* -------------------------------------------------------------------------- */

// function normalizeFeedback(item: any): Feedback {
//   const subject: FeedbackSubject = VALID_SUBJECTS.has(
//     item?.subject
//   )
//     ? item.subject
//     : "other";

//   const approvalStatus: FeedbackStatus =
//     VALID_STATUSES.has(item?.approvalStatus)
//       ? item.approvalStatus
//       : "pending";

//   return {
//     id: String(item?._id ?? item?.id ?? ""),
//     name: String(item?.name ?? ""),
//     contact: String(item?.contact ?? ""),
//     subject,
//     message: String(item?.message ?? ""),
//     approvalStatus,
//     createdAt: item?.createdAt
//       ? String(item.createdAt)
//       : "",
//   };
// }

// function formatDate(value: string) {
//   if (!value) return "—";

//   try {
//     return new Intl.DateTimeFormat("fa-IR", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(new Date(value));
//   } catch {
//     return value;
//   }
// }

// function formatRelativeDate(value: string) {
//   if (!value) return "—";

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return value;
//   }

//   const now = new Date();
//   const diff = now.getTime() - date.getTime();

//   if (diff < 0) {
//     return formatDate(value);
//   }

//   const minute = 60 * 1000;
//   const hour = 60 * minute;
//   const day = 24 * hour;
//   const week = 7 * day;

//   if (diff < minute) {
//     return "همین الان";
//   }

//   if (diff < hour) {
//     const minutes = Math.floor(diff / minute);
//     return `${minutes} دقیقه پیش`;
//   }

//   if (diff < day) {
//     const hours = Math.floor(diff / hour);
//     return `${hours} ساعت پیش`;
//   }

//   const yesterday = new Date(now);
//   yesterday.setDate(now.getDate() - 1);

//   if (
//     date.getFullYear() === yesterday.getFullYear() &&
//     date.getMonth() === yesterday.getMonth() &&
//     date.getDate() === yesterday.getDate()
//   ) {
//     return `دیروز ${new Intl.DateTimeFormat("fa-IR", {
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date)}`;
//   }

//   if (diff < week) {
//     const days = Math.floor(diff / day);
//     return `${days} روز پیش`;
//   }

//   const weeks = Math.floor(diff / week);

//   if (weeks < 5) {
//     return `${weeks} هفته پیش`;
//   }

//   return formatDate(value);
// }

// function truncateText(
//   value: string,
//   maxLength = 75
// ) {
//   if (!value) return "—";

//   if (value.length <= maxLength) {
//     return value;
//   }

//   return `${value.slice(0, maxLength).trim()}...`;
// }

// /* -------------------------------------------------------------------------- */
// /* ICONS */
// /* -------------------------------------------------------------------------- */

// const IconEye = () => (
//   <svg
//     width="13"
//     height="13"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//     <circle cx="12" cy="12" r="3" />
//   </svg>
// );

// function IconFeedback() {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.7"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4 8.5 8.5 0 0 1-6.6 3.1 8.38 8.38 0 0 1-3.9-.95L3 21l1.95-5.6A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 3.1-6.6A8.38 8.38 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z" />
//       <path d="M8 10h8" />
//       <path d="M8 14h5" />
//     </svg>
//   );
// }

// function IconClock() {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.7"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="9" />
//       <path d="M12 7v5l3 2" />
//     </svg>
//   );
// }

// function IconCheckCircle() {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.7"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="9" />
//       <path d="m8.5 12 2.3 2.3L16 9" />
//     </svg>
//   );
// }

// function IconXCircle() {
//   return (
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.7"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="9" />
//       <path d="m9 9 6 6" />
//       <path d="m15 9-6 6" />
//     </svg>
//   );
// }

// function IconCheck() {
//   return (
//     <svg
//       width="13"
//       height="13"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2.2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m5 12 4 4L19 6" />
//     </svg>
//   );
// }

// function IconX() {
//   return (
//     <svg
//       width="13"
//       height="13"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2.2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m7 7 10 10" />
//       <path d="m17 7-10 10" />
//     </svg>
//   );
// }

// function IconTrash() {
//   return (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 6h18" />
//       <path d="M8 6V4h8v2" />
//       <path d="M19 6l-1 15H6L5 6" />
//       <path d="M10 11v6" />
//       <path d="M14 11v6" />
//     </svg>
//   );
// }

// function IconWarning() {
//   return (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M10.3 3.8 2.4 18a2 2 0 0 0 1.75 3h15.7a2 2 0 0 0 1.75-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
//       <path d="M12 9v4" />
//       <path d="M12 17h.01" />
//     </svg>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* MAIN PAGE */
// /* -------------------------------------------------------------------------- */

// export default function FeedbackAdminPage() {
//   const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
//   const [selectedFeedback, setSelectedFeedback] =
//     useState<Feedback | null>(null);

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] = useState<
//     "all" | FeedbackStatus
//   >("all");

//   const [subjectFilter, setSubjectFilter] = useState<
//     "all" | FeedbackSubject
//   >("all");

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [updatingId, setUpdatingId] =
//     useState<string | null>(null);

//   const [deletingId, setDeletingId] =
//     useState<string | null>(null);

//   const [modalType, setModalType] =
//     useState<ModalType>(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 12;

//   const loadFeedbacks = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("/api/feedback", {
//         method: "GET",
//         cache: "no-store",
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             data?.error ||
//             "دریافت بازخوردها انجام نشد."
//         );
//       }

//       const items = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.feedbacks)
//           ? data.feedbacks
//           : [];

//       setFeedbacks(items.map(normalizeFeedback));
//     } catch (error) {
//       console.error(error);

//       setError(
//         error instanceof Error
//           ? error.message
//           : "دریافت بازخوردها انجام نشد."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     void loadFeedbacks();
//   }, []);

//   const updateFeedbackStatus = async (
//     feedback: Feedback,
//     approvalStatus: FeedbackStatus
//   ) => {
//     if (updatingId || deletingId) return;

//     const previousStatus =
//       feedback.approvalStatus;

//     setUpdatingId(feedback.id);
//     setError("");

//     setFeedbacks((prev) =>
//       prev.map((item) =>
//         item.id === feedback.id
//           ? {
//               ...item,
//               approvalStatus,
//             }
//           : item
//       )
//     );

//     setSelectedFeedback((prev) =>
//       prev?.id === feedback.id
//         ? {
//             ...prev,
//             approvalStatus,
//           }
//         : prev
//     );

//     try {
//       const response = await fetch(
//         "/api/feedback",
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             id: feedback.id,
//             approvalStatus,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             data?.error ||
//             "تغییر وضعیت انجام نشد."
//         );
//       }

//       const updatedFeedback =
//         normalizeFeedback(data);

//       setFeedbacks((prev) =>
//         prev.map((item) =>
//           item.id === feedback.id
//             ? updatedFeedback
//             : item
//         )
//       );

//       setSelectedFeedback((prev) =>
//         prev?.id === feedback.id
//           ? updatedFeedback
//           : prev
//       );
//     } catch (error) {
//       console.error(error);

//       setFeedbacks((prev) =>
//         prev.map((item) =>
//           item.id === feedback.id
//             ? {
//                 ...item,
//                 approvalStatus: previousStatus,
//               }
//             : item
//         )
//       );

//       setSelectedFeedback((prev) =>
//         prev?.id === feedback.id
//           ? {
//               ...prev,
//               approvalStatus: previousStatus,
//             }
//           : prev
//       );

//       setError(
//         error instanceof Error
//           ? error.message
//           : "تغییر وضعیت انجام نشد."
//       );
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const rejectFeedback = async () => {
//     if (!selectedFeedback) return;

//     setModalType(null);

//     await updateFeedbackStatus(
//       selectedFeedback,
//       "rejected"
//     );
//   };

//   const deleteFeedback = async () => {
//     if (!selectedFeedback) return;

//     const feedbackId = selectedFeedback.id;

//     if (deletingId) return;

//     setDeletingId(feedbackId);
//     setModalType(null);
//     setError("");

//     try {
//       const response = await fetch(
//         "/api/feedback",
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             id: feedbackId,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data?.message ||
//             data?.error ||
//             "حذف بازخورد انجام نشد."
//         );
//       }

//       setFeedbacks((prev) =>
//         prev.filter(
//           (item) => item.id !== feedbackId
//         )
//       );

//       setSelectedFeedback(null);
//     } catch (error) {
//       console.error(error);

//       setError(
//         error instanceof Error
//           ? error.message
//           : "حذف بازخورد انجام نشد."
//       );
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const filteredFeedbacks = useMemo(() => {
//     const searchValue = search
//       .trim()
//       .toLowerCase();

//     return feedbacks.filter((feedback) => {
//       const matchesSearch =
//         !searchValue ||
//         feedback.name
//           .toLowerCase()
//           .includes(searchValue) ||
//         feedback.contact
//           .toLowerCase()
//           .includes(searchValue) ||
//         feedback.message
//           .toLowerCase()
//           .includes(searchValue);

//       const matchesStatus =
//         statusFilter === "all" ||
//         feedback.approvalStatus ===
//           statusFilter;

//       const matchesSubject =
//         subjectFilter === "all" ||
//         feedback.subject === subjectFilter;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesSubject
//       );
//     });
//   }, [
//     feedbacks,
//     search,
//     statusFilter,
//     subjectFilter,
//   ]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, statusFilter, subjectFilter]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredFeedbacks.length / pageSize)
//   );

//   useEffect(() => {
//     setCurrentPage((prev) => Math.min(prev, totalPages));
//   }, [totalPages]);

//   const paginatedFeedbacks = useMemo(
//     () =>
//       filteredFeedbacks.slice(
//         (currentPage - 1) * pageSize,
//         currentPage * pageSize
//       ),
//     [filteredFeedbacks, currentPage]
//   );

//   const totalCount = feedbacks.length;

//   const pendingCount = feedbacks.filter(
//     (item) =>
//       item.approvalStatus === "pending"
//   ).length;

//   const approvedCount = feedbacks.filter(
//     (item) =>
//       item.approvalStatus === "approved"
//   ).length;

//   const rejectedCount = feedbacks.filter(
//     (item) =>
//       item.approvalStatus === "rejected"
//   ).length;

//   return (
//     <main
//       dir="rtl"
//       className="min-h-screen w-full bg-[#050814] px-4 py-6 text-white sm:px-6 lg:px-8"
//     >
//       <div className="mx-auto max-w-[1600px]">
//         {/* HEADER */}
//         <section className="mb-7">
//           <div className="mb-2 flex items-center gap-3">
//             <div className="h-8 w-1 rounded-full bg-[#00E5FF]" />

//             <div>
//                <div
//               style={{
//                 display: "flex",
//                 alignItems:
//                   "center",
//                 gap: 7,
//                 marginBottom: 4,
//               }}
//             >
//               <span
//                 style={{
//                   width: 6,
//                   height: 6,
//                   borderRadius:
//                     "50%",
//                   background:
//                     "#00E5FF",
//                   boxShadow:
//                     "0 0 7px rgba(0,229,255,0.9)",
                    
//                 }}
//               />

//               <span
//                 style={{
//                   fontFamily:
//                     "monospace",
//                   fontSize:
//                     "0.6rem",
//                   color:
//                     "rgba(0,229,255,0.5)",
//                   letterSpacing:
//                     "0.18em",
//                 }}
//               >
//                 USER FEEDBACK
//               </span>
//             </div>
              

//               <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
//                 بازخورد کاربران
//               </h1>
//             </div>
//           </div>

//           <p className="mr-4 text-[12px] font-bold text-slate-400">
//             مدیریت، بررسی و تأیید بازخوردهای
//             ارسال‌شده توسط کاربران
//           </p>
//         </section>

//         {/* STATS */}
//         <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
//           <StatCard
//             label="کل بازخوردها"
//             value={totalCount}
//             description="تمام بازخوردهای ثبت‌شده"
//             icon={<IconFeedback />}
//             accent="cyan"
//           />

//           <StatCard
//             label="در انتظار بررسی"
//             value={pendingCount}
//             description="نیازمند بررسی مدیر"
//             icon={<IconClock />}
//             accent="amber"
//           />

//           <StatCard
//             label="تأیید شده"
//             value={approvedCount}
//             description="قابل نمایش عمومی"
//             icon={<IconCheckCircle />}
//             accent="emerald"
//           />

//           <StatCard
//             label="رد شده"
//             value={rejectedCount}
//             description="نمایش داده نمی‌شوند"
//             icon={<IconXCircle />}
//             accent="red"
//           />
//         </section>

//         {/* ERROR */}
//         {error && (
//           <div className="mb-5 flex items-center justify-between gap-3 rounded-[10px] border border-red-400/10 bg-red-400/[0.035] px-4 py-3">
//             <span className="text-[10px] font-bold text-red-300">
//               {error}
//             </span>

//             <button
//               type="button"
//               onClick={() => void loadFeedbacks()}
//               className="shrink-0 rounded-[7px] border border-red-400/15 bg-red-400/[0.05] px-3 py-1.5 text-[9px] font-black text-red-300 transition-all hover:bg-red-400/[0.09]"
//             >
//               تلاش مجدد
//             </button>
//           </div>
//         )}

//         {/* FILTERS */}
//         <section className="mb-5 overflow-visible rounded-[14px] border border-[rgba(0,229,255,0.09)] bg-[#0A1128]">
//           <div className="h-0.5 bg-gradient-to-l from-[#00E5FF]/40 via-[#00E5FF]/10 to-transparent" />

//           <div className="p-4">
//             <div className="mb-3 flex items-center gap-2">
//               <span className="text-[12px] font-black text-slate-300">
//                 جستجو و فیلتر
//               </span>

//               <span className="text-[10px] font-bold text-slate-600">
//                 {filteredFeedbacks.length} مورد
//               </span>
//             </div>

//             <div className="grid gap-3 lg:grid-cols-[minmax(280px,1fr)_220px_260px]">
//               {/* SEARCH */}
//               <div className="relative">
//                 <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[17px] text-slate-600">
//                   ⌕
//                 </span>

//                 <input
//                   value={search}
//                   onChange={(e) =>
//                     setSearch(e.target.value)
//                   }
//                   placeholder="جستجوی نام، راه ارتباطی یا متن بازخورد..."
//                   className="h-10 w-full rounded-[8px] border border-white/[0.07] bg-[#0B1224] pr-10 pl-4 text-[11px] font-bold text-slate-300 outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/30"
//                 />
//               </div>

//               {/* STATUS */}
//               <CustomSelect
//                 value={statusFilter}
//                 onChange={(value) =>
//                   setStatusFilter(
//                     value as
//                       | "all"
//                       | FeedbackStatus
//                   )
//                 }
//                 options={[
//                   {
//                     value: "all",
//                     label: "همه وضعیت‌ها",
//                   },
//                   {
//                     value: "pending",
//                     label: "در انتظار بررسی",
//                   },
//                   {
//                     value: "approved",
//                     label: "تأیید شده",
//                   },
//                   {
//                     value: "rejected",
//                     label: "رد شده",
//                   },
//                 ]}
//               />

//               {/* SUBJECT */}
//               <CustomSelect
//                 value={subjectFilter}
//                 onChange={(value) =>
//                   setSubjectFilter(
//                     value as
//                       | "all"
//                       | FeedbackSubject
//                   )
//                 }
//                 options={[
//                   {
//                     value: "all",
//                     label: "همه موضوعات",
//                   },
//                   ...Object.entries(
//                     SUBJECT_LABELS
//                   ).map(([value, label]) => ({
//                     value,
//                     label,
//                   })),
//                 ]}
//               />
//             </div>
//           </div>
//         </section>

//         {/* TABLE */}
//         <section className="overflow-hidden rounded-[14px] border border-[rgba(0,229,255,0.09)] bg-[#0A1128]">
//           <div className="hidden overflow-x-auto md:block">
//             <table className="w-full min-w-[980px] border-collapse">
//               <thead>
//                 <tr className="border-b border-white/[0.05] bg-white/[0.015]">
//                   <th className="px-5 py-4 text-right text-[10px] font-black text-slate-600">
//                     کاربر
//                   </th>

//                   <th className="px-5 py-4 text-right text-[10px] font-black text-slate-600">
//                     موضوع
//                   </th>

//                   <th className="px-5 py-4 text-right text-[10px] font-black text-slate-600">
//                     پیام
//                   </th>

//                   <th className="px-5 py-4 text-right text-[10px] font-black text-slate-600">
//                     وضعیت
//                   </th>

//                   <th className="px-5 py-4 text-right text-[10px] font-black text-slate-600">
//                     تاریخ
//                   </th>

//                   <th className="w-[70px] px-5 py-4 text-left text-[10px] font-black text-slate-600">
//                     عملیات
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {loading ? (
//                   <LoadingRow />
//                 ) : filteredFeedbacks.length ===
//                   0 ? (
//                   <EmptyRow />
//                 ) : (
//                   paginatedFeedbacks.map(
//                     (feedback) => (
//                       <tr
//                         key={feedback.id}
//                         className="border-b border-white/[0.04] transition-all hover:bg-cyan-400/[0.025]"
//                       >
//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-3">
//                             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-cyan-400/10 bg-cyan-400/[0.04] text-[12px] font-black text-cyan-300">
//                               {feedback.name.charAt(
//                                 0
//                               ) || "؟"}
//                             </div>

//                             <div className="text-[12px] font-black text-slate-200">
//                               {feedback.name ||
//                                 "بدون نام"}
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-5 py-4">
//                           <span className="inline-flex max-w-[210px] rounded-[7px] border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-[10px] font-bold text-slate-400">
//                             {
//                               SUBJECT_LABELS[
//                                 feedback.subject
//                               ]
//                             }
//                           </span>
//                         </td>

//                         <td className="max-w-[360px] px-5 py-4">
//                           <p className="line-clamp-2 text-[11px] font-semibold leading-5 text-slate-500">
//                             {truncateText(
//                               feedback.message,
//                               75
//                             )}
//                           </p>
//                         </td>

//                         <td className="px-5 py-4">
//                           <StatusBadge
//                             status={
//                               feedback.approvalStatus
//                             }
//                           />
//                         </td>

//                         <td className="whitespace-nowrap px-5 py-4">
//                           <span className="text-[10px] font-semibold text-slate-600">
//                             {formatRelativeDate(
//                               feedback.createdAt
//                             )}
//                           </span>
//                         </td>

//                         <td className="w-[70px] px-5 py-4 text-left">
//                           <button
//                             className="service-eye-button"
//                             onClick={() => {
//                               setSelectedFeedback(feedback);
//                             }}
//                             type="button"
//                             title="مشاهده"
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               width: 30,
//                               height: 30,
//                               borderRadius: 10,
//                               cursor: "pointer",
//                               background: "rgba(255,255,255,0.03)",
//                               border: "1px solid rgba(255,255,255,0.07)",
//                               color: "#475569",
//                               transition: "all 0.18s ease",
//                             }}
//                           >
//                             <IconEye />
//                           </button>
//                         </td>
//                       </tr>
//                     )
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* MOBILE */}
//           <div className="divide-y divide-white/[0.04] md:hidden">
//             {loading ? (
//               <div className="px-6 py-16 text-center">
//                 <LoadingSpinner />

//                 <div className="mt-3 text-[10px] font-bold text-slate-600">
//                   در حال دریافت بازخوردها...
//                 </div>
//               </div>
//             ) : filteredFeedbacks.length ===
//               0 ? (
//               <div className="px-6 py-20 text-center">
//                 <div className="mb-3 text-3xl text-slate-700">
//                   ⌕
//                 </div>

//                 <div className="text-[12px] font-black text-slate-400">
//                   بازخوردی پیدا نشد
//                 </div>

//                 <div className="mt-1 text-[10px] font-bold text-slate-700">
//                   فیلترها یا عبارت جستجو را تغییر
//                   دهید.
//                 </div>
//               </div>
//             ) : (
//               paginatedFeedbacks.map((feedback) => (
//                 <div
//                   key={feedback.id}
//                   className="block w-full p-4 text-right transition-all hover:bg-cyan-400/[0.025]"
//                 >
//                   <div className="mb-3 flex items-start justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-cyan-400/10 bg-cyan-400/[0.04] text-[12px] font-black text-cyan-300">
//                         {feedback.name.charAt(0) ||
//                           "؟"}
//                       </div>

//                       <div>
//                         <div className="text-[12px] font-black text-slate-200">
//                           {feedback.name ||
//                             "بدون نام"}
//                         </div>

//                         <div className="mt-1 text-[9px] font-bold text-slate-600">
//                           {formatRelativeDate(
//                             feedback.createdAt
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <StatusBadge
//                       status={
//                         feedback.approvalStatus
//                       }
//                     />
//                   </div>

//                   <div className="mb-2 text-[10px] font-bold text-cyan-400/65">
//                     {
//                       SUBJECT_LABELS[
//                         feedback.subject
//                       ]
//                     }
//                   </div>

//                   <p className="line-clamp-3 text-[11px] font-semibold leading-6 text-slate-500">
//                     {truncateText(
//                       feedback.message,
//                       75
//                     )}
//                   </p>

//                   <div className="mt-3 flex justify-end">
//                     <button
//                       className="service-eye-button"
//                       onClick={() => {
//                         setSelectedFeedback(
//                           feedback
//                         );
//                       }}
//                       type="button"
//                       title="مشاهده"
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         width: 30,
//                         height: 30,
//                         borderRadius: 10,
//                         cursor: "pointer",
//                         background:
//                           "rgba(255,255,255,0.03)",
//                         border:
//                           "1px solid rgba(255,255,255,0.07)",
//                         color: "#475569",
//                         transition:
//                           "all 0.18s ease",
//                       }}
//                     >
//                       <IconEye />
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </section>

//         {totalPages > 1 && (
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onChange={setCurrentPage}
//           />
//         )}
//       </div>

//       {/* DRAWER */}
//       {selectedFeedback && (
//         <div className="fixed inset-0 z-[100]">
//           <button
//             type="button"
//             aria-label="بستن"
//             onClick={() =>
//               setSelectedFeedback(null)
//             }
//             className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
//           />

//           <aside className="absolute left-0 top-0 flex h-full w-full max-w-[540px] flex-col border-r border-white/[0.07] bg-[#080D1C] shadow-2xl">
//             {/* DRAWER HEADER */}
//             <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5">
//               <div>
//                 <div className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400/60">
//                   FEEDBACK DETAILS
//                 </div>

//                 <h2 className="mt-1 text-[16px] font-black text-white">
//                   جزئیات بازخورد
//                 </h2>
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setSelectedFeedback(null)
//                 }
//                 className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-white/[0.07] bg-white/[0.025] text-[17px] text-slate-600 transition-all hover:border-cyan-400/15 hover:text-slate-300"
//               >
//                 ×
//               </button>
//             </div>

//             {/* DRAWER BODY */}
//             <div className="flex-1 overflow-y-auto p-5">
//               {/* USER */}
//               <div className="mb-4 overflow-hidden rounded-[12px] border border-[rgba(0,229,255,0.08)] bg-[#0A1128]">
//                 <div className="h-0.5 bg-gradient-to-l from-cyan-400/35 via-cyan-400/10 to-transparent" />

//                 <div className="p-4">
//                   <div className="mb-3 text-[9px] font-black tracking-wide text-slate-600">
//                     USER
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className="flex h-11 w-11 items-center justify-center rounded-[9px] border border-cyan-400/10 bg-cyan-400/[0.04] text-sm font-black text-cyan-300">
//                       {selectedFeedback.name.charAt(
//                         0
//                       ) || "؟"}
//                     </div>

//                     <div>
//                       <div className="text-[12px] font-black text-slate-200">
//                         {selectedFeedback.name ||
//                           "بدون نام"}
//                       </div>

//                       <div className="mt-1 text-[10px] font-bold text-slate-600">
//                         {selectedFeedback.contact ||
//                           "راه ارتباطی ثبت نشده"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* INFO */}
//               <div className="mb-4 grid grid-cols-2 gap-2">
//                 <InfoBox
//                   label="موضوع"
//                   value={
//                     SUBJECT_LABELS[
//                       selectedFeedback.subject
//                     ]
//                   }
//                 />

//                 <InfoBox
//                   label="وضعیت"
//                   value={
//                     STATUS_LABELS[
//                       selectedFeedback
//                         .approvalStatus
//                     ]
//                   }
//                 />

//                 <InfoBox
//                   label="تاریخ ارسال"
//                   value={formatDate(
//                     selectedFeedback.createdAt
//                   )}
//                 />

//                 <InfoBox
//                   label="راه ارتباطی"
//                   value={
//                     selectedFeedback.contact ||
//                     "—"
//                   }
//                 />
//               </div>

//               {/* MESSAGE */}
//               <div className="overflow-hidden rounded-[12px] border border-white/[0.06] bg-[#0A1128]">
//                 <div className="border-b border-white/[0.04] px-4 py-3">
//                   <div className="text-[9px] font-black tracking-wide text-slate-600">
//                     MESSAGE
//                   </div>
//                 </div>

//                 <div className="p-4">
//                   <p className="whitespace-pre-wrap text-[12px] font-semibold leading-7 text-slate-400">
//                     {selectedFeedback.message}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* DRAWER ACTIONS */}
//             <div className="border-t border-white/[0.06] bg-[#070B17] p-4">
//               <div className="mb-2 flex gap-2">
//                 {selectedFeedback.approvalStatus ===
//                   "pending" && (
//                   <>
//                     <button
//                       type="button"
//                       disabled={
//                         updatingId ===
//                         selectedFeedback.id
//                       }
//                       onClick={() =>
//                         void updateFeedbackStatus(
//                           selectedFeedback,
//                           "approved"
//                         )
//                       }
//                       className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] border border-emerald-400/35 bg-emerald-400/[0.11] text-[11px] font-black text-emerald-300 transition-all hover:border-emerald-400/50 hover:bg-emerald-400/[0.16] hover:shadow-[0_0_14px_rgba(52,211,153,0.10)] disabled:opacity-50"
//                     >
//                       {updatingId ===
//                       selectedFeedback.id ? (
//                         <SmallSpinner />
//                       ) : (
//                         <IconCheck />
//                       )}

//                       تأیید و انتشار
//                     </button>

//                     <button
//                       type="button"
//                       disabled={
//                         updatingId ===
//                         selectedFeedback.id
//                       }
//                       onClick={() =>
//                         setModalType("reject")
//                       }
//                       className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] border border-red-400/35 bg-red-400/[0.10] text-[11px] font-black text-red-300 transition-all hover:border-red-400/50 hover:bg-red-400/[0.15] hover:shadow-[0_0_14px_rgba(248,113,113,0.10)] disabled:opacity-50"
//                     >
//                       <IconX />
//                       رد کردن
//                     </button>
//                   </>
//                 )}
//               </div>

//               {/* DELETE */}
//               <button
//                 type="button"
//                 disabled={
//                   deletingId ===
//                   selectedFeedback.id
//                 }
//                 onClick={() =>
//                   setModalType("delete")
//                 }
//                 className="flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-red-400/[0.18] bg-red-400/[0.045] text-[10px] font-black text-red-400/85 transition-all hover:border-red-400/30 hover:bg-red-400/[0.075] hover:text-red-300 hover:shadow-[0_0_14px_rgba(248,113,113,0.08)] disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {deletingId ===
//                 selectedFeedback.id ? (
//                   <SmallSpinner />
//                 ) : (
//                   <IconTrash />
//                 )}

//                 حذف بازخورد
//               </button>
//             </div>
//           </aside>
//         </div>
//       )}

//       {/* CONFIRM MODAL */}
//       {modalType && selectedFeedback && (
//         <ConfirmModal
//           type={modalType}
//           feedback={selectedFeedback}
//           loading={
//             modalType === "delete"
//               ? deletingId ===
//                 selectedFeedback.id
//               : updatingId ===
//                 selectedFeedback.id
//           }
//           onCancel={() =>
//             setModalType(null)
//           }
//           onConfirm={() => {
//             if (modalType === "reject") {
//               void rejectFeedback();
//             } else {
//               void deleteFeedback();
//             }
//           }}
//         />
//       )}
//     </main>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* CONFIRM MODAL */
// /* -------------------------------------------------------------------------- */

// function ConfirmModal({
//   type,
//   feedback,
//   loading,
//   onCancel,
//   onConfirm,
// }: {
//   type: "reject" | "delete";
//   feedback: Feedback;
//   loading: boolean;
//   onCancel: () => void;
//   onConfirm: () => void;
// }) {
//   const isDelete = type === "delete";

//   return (
//     <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
//       <button
//         type="button"
//         aria-label="بستن"
//         onClick={onCancel}
//         className="absolute inset-0 cursor-default"
//       />

//       <div className="relative z-10 w-full max-w-[430px] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0A1128] shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
//         <div
//           className={`h-0.5 ${
//             isDelete
//               ? "bg-red-400/75"
//               : "bg-red-400/60"
//           }`}
//         />

//         <div className="p-5">
//           <div className="mb-5 flex items-start gap-3">
//             <div
//               className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border ${
//                 isDelete
//                   ? "border-red-400/35 bg-red-400/[0.11] text-red-300"
//                   : "border-amber-400/35 bg-amber-400/[0.10] text-amber-300"
//               }`}
//             >
//               {isDelete ? (
//                 <IconTrash />
//               ) : (
//                 <IconWarning />
//               )}
//             </div>

//             <div>
//               <h3 className="text-[14px] font-black text-white">
//                 {isDelete
//                   ? "حذف بازخورد"
//                   : "رد کردن بازخورد"}
//               </h3>

//               <p className="mt-1 text-[10px] font-bold leading-5 text-slate-600">
//                 {isDelete
//                   ? "این عملیات قابل بازگشت نیست."
//                   : "این بازخورد به وضعیت رد شده تغییر خواهد کرد."}
//               </p>
//             </div>
//           </div>

//           <div className="mb-5 rounded-[9px] border border-white/[0.05] bg-[#050814]/50 p-3">
//             <div className="mb-1 text-[9px] font-black text-slate-600">
//               بازخورد کاربر
//             </div>

//             <div className="text-[11px] font-black text-slate-300">
//               {feedback.name || "بدون نام"}
//             </div>

//             <div className="mt-1 line-clamp-2 text-[10px] font-semibold leading-5 text-slate-600">
//               {feedback.message}
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               type="button"
//               disabled={loading}
//               onClick={onCancel}
//               className="h-10 flex-1 rounded-[8px] border border-white/[0.07] bg-white/[0.025] text-[10px] font-black text-slate-400 transition-all hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
//             >
//               انصراف
//             </button>

//             <button
//               type="button"
//               disabled={loading}
//               onClick={onConfirm}
//               className={`h-10 flex-1 rounded-[8px] border text-[10px] font-black transition-all disabled:opacity-50 ${
//                 isDelete
//                   ? "border-red-400/35 bg-red-400/[0.11] text-red-300 hover:border-red-400/50 hover:bg-red-400/[0.17] hover:shadow-[0_0_14px_rgba(248,113,113,0.10)]"
//                   : "border-red-400/35 bg-red-400/[0.10] text-red-300 hover:border-red-400/50 hover:bg-red-400/[0.16] hover:shadow-[0_0_14px_rgba(248,113,113,0.10)]"
//               }`}
//             >
//               {loading && <SmallSpinner />}

//               {isDelete
//                 ? "بله، حذف شود"
//                 : "بله، رد شود"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* PAGINATION */
// /* -------------------------------------------------------------------------- */

// function IconChevronLeft() {
//   return (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2.3"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polyline points="15 18 9 12 15 6" />
//     </svg>
//   );
// }

// function IconChevronRight() {
//   return (
//     <svg
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2.3"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polyline points="9 18 15 12 9 6" />
//     </svg>
//   );
// }

// function getPaginationRange(
//   currentPage: number,
//   totalPages: number
// ): (number | "...")[] {
//   // تا ۴ صفحه، همه‌شون رو کامل نشون بده — نقطه‌گذاری فقط از
//   // ۵ صفحه به بالا شروع می‌شه (مطابق همون رفتاری که توی خدمات داریم).
//   if (totalPages <= 4) {
//     return Array.from({ length: totalPages }, (_, i) => i + 1);
//   }

//   const range: (number | "...")[] = [];
//   const siblingCount = 1;

//   const start = Math.max(2, currentPage - siblingCount);
//   const end = Math.min(
//     totalPages - 1,
//     currentPage + siblingCount
//   );

//   range.push(1);

//   if (start > 2) {
//     range.push("...");
//   }

//   for (let page = start; page <= end; page++) {
//     range.push(page);
//   }

//   if (end < totalPages - 1) {
//     range.push("...");
//   }

//   if (totalPages > 1) {
//     range.push(totalPages);
//   }

//   return range;
// }

// function Pagination({
//   currentPage,
//   totalPages,
//   onChange,
// }: {
//   currentPage: number;
//   totalPages: number;
//   onChange: (page: number) => void;
// }) {
//   const pages = getPaginationRange(
//     currentPage,
//     totalPages
//   ).reverse();

//   return (
//    <div
//   dir="ltr"
//   className="mt-6 flex items-center justify-center gap-2"
// >
//   <button
//     type="button"
//     onClick={() =>
//       onChange(Math.min(totalPages, currentPage + 1))
//     }
//     disabled={currentPage === totalPages}
//     className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.07] bg-[#0B1224] text-slate-500 transition-all hover:border-cyan-400/25 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/[0.07] disabled:hover:text-slate-500"
//   >
//     <IconChevronLeft />
//   </button>

//   {pages.map((page, index) =>
//     page === "..." ? (
//       <span
//         key={`ellipsis-${index}`}
//         className="flex h-9 w-9 shrink-0 items-center justify-center text-[12px] font-black text-slate-700"
//       >
//         …
//       </span>
//     ) : (
//       <button
//         key={page}
//         type="button"
//         onClick={() => onChange(page)}
//         className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border text-[12px] font-black transition-all ${
//           page === currentPage
//             ? "border-cyan-400 bg-cyan-400 text-[#050814] shadow-[0_0_16px_rgba(0,229,255,0.35)]"
//             : "border-white/[0.07] bg-[#0B1224] text-slate-400 hover:border-cyan-400/25 hover:text-cyan-300"
//         }`}
//       >
//         {page}
//       </button>
//     )
//   )}

//   <button
//     type="button"
//     onClick={() =>
//       onChange(Math.max(1, currentPage - 1))
//     }
//     disabled={currentPage === 1}
//     className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.07] bg-[#0B1224] text-slate-500 transition-all hover:border-cyan-400/25 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/[0.07] disabled:hover:text-slate-500"
//   >
//     <IconChevronRight />
//   </button>
// </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* CUSTOM SELECT */
// /* -------------------------------------------------------------------------- */

// function CustomSelect({
//   value,
//   onChange,
//   options,
// }: {
//   value: string;
//   onChange: (value: string) => void;
//   options: {
//     value: string;
//     label: string;
//   }[];
// }) {
//   const [open, setOpen] = useState(false);

//   const selectedOption =
//     options.find(
//       (option) => option.value === value
//     ) ?? options[0];

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() =>
//           setOpen((prev) => !prev)
//         }
//         className={`flex h-10 w-full items-center justify-between rounded-[8px] border bg-[#0B1224] px-3 text-right text-[11px] font-bold outline-none transition-all ${
//           open
//             ? "border-cyan-400/35 shadow-[0_0_16px_rgba(0,229,255,0.04)]"
//             : "border-white/[0.07] hover:border-cyan-400/15"
//         }`}
//       >
//         <span className="truncate text-slate-300">
//           {selectedOption.label}
//         </span>

//         <span
//           className={`mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-white/[0.05] bg-white/[0.025] text-slate-500 transition-all duration-200 ${
//             open
//               ? "border-cyan-400/15 bg-cyan-400/[0.05] text-cyan-300"
//               : ""
//           }`}
//         >
//           <svg
//             width="11"
//             height="11"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className={`transition-transform duration-200 ${
//               open ? "rotate-180" : ""
//             }`}
//           >
//             <path d="m6 9 6 6 6-6" />
//           </svg>
//         </span>
//       </button>

//       {open && (
//         <>
//           <button
//             type="button"
//             aria-label="بستن منو"
//             onClick={() => setOpen(false)}
//             className="fixed inset-0 z-40 cursor-default"
//           />

//           <div className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[280px] w-full overflow-y-auto rounded-[9px] border border-white/[0.08] bg-[#0B1224] p-[6px] shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
//             {options.map((option) => {
//               const selected =
//                 option.value === value;

//               return (
//                 <button
//                   key={option.value}
//                   type="button"
//                   onClick={() => {
//                     onChange(option.value);
//                     setOpen(false);
//                   }}
//                   className={`flex w-full items-center justify-between rounded-[7px] px-3 py-2.5 text-right text-[11px] font-bold transition-all ${
//                     selected
//                       ? "bg-cyan-400/[0.08] text-cyan-300"
//                       : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
//                   }`}
//                 >
//                   <span className="truncate">
//                     {option.label}
//                   </span>

//                   {selected && (
//                     <span className="mr-2 shrink-0 text-cyan-300">
//                       <IconCheck />
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </>
//       )}

//       <style>
//         {`
//           .service-eye-button:hover {
//             background: rgba(0, 229, 255, 0.08) !important;
//             border-color: rgba(0, 229, 255, 0.28) !important;
//             color: #00E5FF !important;
//             transform: translateY(-1px);
//             box-shadow: 0 0 12px rgba(0, 229, 255, 0.12);
//           }

//           .service-eye-button:active {
//             transform: translateY(0);
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* STAT CARD */
// /* -------------------------------------------------------------------------- */

// function StatCard({
//   label,
//   value,
//   description,
//   icon,
//   accent,
// }: {
//   label: string;
//   value: number;
//   description: string;
//   icon: React.ReactNode;
//   accent:
//     | "cyan"
//     | "amber"
//     | "emerald"
//     | "red";
// }) {
//   const styles = {
//     cyan: {
//       icon: "border-cyan-400/10 bg-cyan-400/[0.035] text-cyan-300",
//       line: "from-cyan-400/35 via-cyan-400/10",
//     },
//     amber: {
//       icon: "border-amber-400/10 bg-amber-400/[0.035] text-amber-300",
//       line: "from-amber-400/30 via-amber-400/10",
//     },
//     emerald: {
//       icon: "border-emerald-400/10 bg-emerald-400/[0.035] text-emerald-300",
//       line: "from-emerald-400/30 via-emerald-400/10",
//     },
//     red: {
//       icon: "border-red-400/10 bg-red-400/[0.035] text-red-300",
//       line: "from-red-400/30 via-red-400/10",
//     },
//   };

//   const current = styles[accent];

//   return (
//     <div className="overflow-hidden rounded-[14px] border border-[rgba(0,229,255,0.09)] bg-[#0A1128]">
//       <div
//         className={`h-0.5 bg-gradient-to-l ${current.line} to-transparent`}
//       />

//       <div className="p-4 sm:p-5">
//         <div className="flex items-start justify-between gap-3">
//           <div>
//             <div className="text-[10px] font-black text-slate-600">
//               {label}
//             </div>

//             <div className="mt-2 text-2xl font-black text-white">
//               {value}
//             </div>
//           </div>

//           <div
//             className={`flex h-10 w-10 items-center justify-center rounded-[8px] border ${current.icon}`}
//           >
//             {icon}
//           </div>
//         </div>

//         <div className="mt-3 text-[9px] font-bold text-slate-700">
//           {description}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* STATUS BADGE */
// /* -------------------------------------------------------------------------- */

// function StatusBadge({
//   status,
// }: {
//   status: FeedbackStatus;
// }) {
//   const classes = {
//     pending:
//       "border-amber-400/20 bg-amber-400/[0.06] text-amber-300",
//     approved:
//       "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400",
//     rejected:
//       "border-red-400/20 bg-red-400/[0.06] text-red-300",
//   };

//   return (
//     <span
//       className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-[7px] border px-2.5 py-1.5 text-[9px] font-black ${classes[status]}`}
//     >
//       <span className="h-1 w-1 rounded-full bg-current" />
//       {STATUS_LABELS[status]}
//     </span>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* INFO BOX */
// /* -------------------------------------------------------------------------- */

// function InfoBox({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="rounded-[9px] border border-white/[0.05] bg-[#050814]/50 px-3 py-2.5">
//       <div className="mb-1 text-[8px] font-black text-slate-700">
//         {label}
//       </div>

//       <div className="truncate text-[10px] font-black text-slate-400">
//         {value}
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* TABLE STATES */
// /* -------------------------------------------------------------------------- */

// function LoadingRow() {
//   return (
//     <tr>
//       <td
//         colSpan={6}
//         className="px-6 py-16 text-center"
//       >
//         <LoadingSpinner />

//         <div className="mt-3 text-[10px] font-bold text-slate-600">
//           در حال دریافت بازخوردها...
//         </div>
//       </td>
//     </tr>
//   );
// }

// function EmptyRow() {
//   return (
//     <tr>
//       <td
//         colSpan={6}
//         className="px-6 py-20 text-center"
//       >
//         <div className="mb-3 text-3xl text-slate-700">
//           ⌕
//         </div>

//         <div className="text-[12px] font-black text-slate-400">
//           بازخوردی پیدا نشد
//         </div>

//         <div className="mt-1 text-[10px] font-bold text-slate-700">
//           فیلترها یا عبارت جستجو را تغییر دهید.
//         </div>
//       </td>
//     </tr>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* SPINNERS */
// /* -------------------------------------------------------------------------- */

// function LoadingSpinner() {
//   return (
//     <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />
//   );
// }

// function SmallSpinner() {
//   return (
//     <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current/20 border-t-current" />
//   );
// }





"use client";

import { useEffect, useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */

type FeedbackStatus = "pending" | "approved" | "rejected";

type FeedbackSubject =
  | "service-feedback"
  | "website-suggestion"
  | "content-suggestion"
  | "technical-feedback"
  | "partnership"
  | "feature-request"
  | "other";

type Feedback = {
  id: string;
  name: string;
  contact: string;
  subject: FeedbackSubject;
  message: string;
  approvalStatus: FeedbackStatus;
  createdAt: string;
};

type ModalType = "reject" | "delete" | null;

/* -------------------------------------------------------------------------- */
/* CONSTANTS */
/* -------------------------------------------------------------------------- */

const SUBJECT_LABELS: Record<FeedbackSubject, string> = {
  "service-feedback": "انتقاد از خدمات و تجربه کاربری",
  "website-suggestion": "پیشنهاد برای بهبود سایت",
  "content-suggestion": "پیشنهاد محتوایی",
  "technical-feedback": "مشکل فنی یا خطای سایت",
  partnership: "پیشنهاد همکاری با پاراهور",
  "feature-request": "پیشنهاد قابلیت یا ایده جدید",
  other: "سایر انتقادات و پیشنهادات",
};

const STATUS_LABELS: Record<FeedbackStatus, string> = {
  pending: "در انتظار بررسی",
  approved: "تأیید شده",
  rejected: "رد شده",
};

const VALID_SUBJECTS = new Set<FeedbackSubject>([
  "service-feedback",
  "website-suggestion",
  "content-suggestion",
  "technical-feedback",
  "partnership",
  "feature-request",
  "other",
]);

const VALID_STATUSES = new Set<FeedbackStatus>([
  "pending",
  "approved",
  "rejected",
]);

/* -------------------------------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------------------------------- */

function normalizeFeedback(item: any): Feedback {
  const subject: FeedbackSubject = VALID_SUBJECTS.has(
    item?.subject
  )
    ? item.subject
    : "other";

  const approvalStatus: FeedbackStatus =
    VALID_STATUSES.has(item?.approvalStatus)
      ? item.approvalStatus
      : "pending";

  return {
    id: String(item?._id ?? item?.id ?? ""),
    name: String(item?.name ?? ""),
    contact: String(item?.contact ?? ""),
    subject,
    message: String(item?.message ?? ""),
    approvalStatus,
    createdAt: item?.createdAt
      ? String(item.createdAt)
      : "",
  };
}

function formatDate(value: string) {
  if (!value) return "—";

  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function formatRelativeDate(value: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 0) {
    return formatDate(value);
  }

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diff < minute) {
    return "همین الان";
  }

  if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} دقیقه پیش`;
  }

  if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} ساعت پیش`;
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate()
  ) {
    return `دیروز ${new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)}`;
  }

  if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days} روز پیش`;
  }

  const weeks = Math.floor(diff / week);

  if (weeks < 5) {
    return `${weeks} هفته پیش`;
  }

  return formatDate(value);
}

function truncateText(
  value: string,
  maxLength = 75
) {
  if (!value) return "—";

  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength).trim()}...`;
}

/* -------------------------------------------------------------------------- */
/* ICONS */
/* -------------------------------------------------------------------------- */

const IconEye = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function IconFeedback() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4 8.5 8.5 0 0 1-6.6 3.1 8.38 8.38 0 0 1-3.9-.95L3 21l1.95-5.6A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 3.1-6.6A8.38 8.38 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.3 2.3L16 9" />
    </svg>
  );
}

function IconXCircle() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6" />
      <path d="m15 9-6 6" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function IconX() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 7 10 10" />
      <path d="m17 7-10 10" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 15H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function IconWarning() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.3 3.8 2.4 18a2 2 0 0 0 1.75 3h15.7a2 2 0 0 0 1.75-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN PAGE */
/* -------------------------------------------------------------------------- */

export default function FeedbackAdminPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] =
    useState<Feedback | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | FeedbackStatus
  >("all");

  const [subjectFilter, setSubjectFilter] = useState<
    "all" | FeedbackSubject
  >("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [modalType, setModalType] =
    useState<ModalType>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const loadFeedbacks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "دریافت بازخوردها انجام نشد."
        );
      }

      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.feedbacks)
          ? data.feedbacks
          : [];

      setFeedbacks(items.map(normalizeFeedback));
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "دریافت بازخوردها انجام نشد."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadFeedbacks();
  }, []);

  const updateFeedbackStatus = async (
    feedback: Feedback,
    approvalStatus: FeedbackStatus
  ) => {
    if (updatingId || deletingId) return;

    const previousStatus =
      feedback.approvalStatus;

    setUpdatingId(feedback.id);
    setError("");

    setFeedbacks((prev) =>
      prev.map((item) =>
        item.id === feedback.id
          ? {
              ...item,
              approvalStatus,
            }
          : item
      )
    );

    setSelectedFeedback((prev) =>
      prev?.id === feedback.id
        ? {
            ...prev,
            approvalStatus,
          }
        : prev
    );

    try {
      const response = await fetch(
        "/api/feedback",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: feedback.id,
            approvalStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "تغییر وضعیت انجام نشد."
        );
      }

      const updatedFeedback =
        normalizeFeedback(data);

      setFeedbacks((prev) =>
        prev.map((item) =>
          item.id === feedback.id
            ? updatedFeedback
            : item
        )
      );

      setSelectedFeedback((prev) =>
        prev?.id === feedback.id
          ? updatedFeedback
          : prev
      );
    } catch (error) {
      console.error(error);

      setFeedbacks((prev) =>
        prev.map((item) =>
          item.id === feedback.id
            ? {
                ...item,
                approvalStatus: previousStatus,
              }
            : item
        )
      );

      setSelectedFeedback((prev) =>
        prev?.id === feedback.id
          ? {
              ...prev,
              approvalStatus: previousStatus,
            }
          : prev
      );

      setError(
        error instanceof Error
          ? error.message
          : "تغییر وضعیت انجام نشد."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const rejectFeedback = async () => {
    if (!selectedFeedback) return;

    setModalType(null);

    await updateFeedbackStatus(
      selectedFeedback,
      "rejected"
    );
  };

  const deleteFeedback = async () => {
    if (!selectedFeedback) return;

    const feedbackId = selectedFeedback.id;

    if (deletingId) return;

    setDeletingId(feedbackId);
    setModalType(null);
    setError("");

    try {
      const response = await fetch(
        "/api/feedback",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: feedbackId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "حذف بازخورد انجام نشد."
        );
      }

      setFeedbacks((prev) =>
        prev.filter(
          (item) => item.id !== feedbackId
        )
      );

      setSelectedFeedback(null);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "حذف بازخورد انجام نشد."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredFeedbacks = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return feedbacks.filter((feedback) => {
      const matchesSearch =
        !searchValue ||
        feedback.name
          .toLowerCase()
          .includes(searchValue) ||
        feedback.contact
          .toLowerCase()
          .includes(searchValue) ||
        feedback.message
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        feedback.approvalStatus ===
          statusFilter;

      const matchesSubject =
        subjectFilter === "all" ||
        feedback.subject === subjectFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSubject
      );
    });
  }, [
    feedbacks,
    search,
    statusFilter,
    subjectFilter,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, subjectFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredFeedbacks.length / pageSize)
  );

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedFeedbacks = useMemo(
    () =>
      filteredFeedbacks.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      ),
    [filteredFeedbacks, currentPage]
  );

  const totalCount = feedbacks.length;

  const pendingCount = feedbacks.filter(
    (item) =>
      item.approvalStatus === "pending"
  ).length;

  const approvedCount = feedbacks.filter(
    (item) =>
      item.approvalStatus === "approved"
  ).length;

  const rejectedCount = feedbacks.filter(
    (item) =>
      item.approvalStatus === "rejected"
  ).length;

  return (
    <main
      dir="rtl"
      className="min-h-screen w-full bg-[#EEF3FA] text-slate-800"
      style={{ fontFamily: "var(--font-vazirmatn), sans-serif" }}
    > 
      <div className="mx-auto grid w-full gap-4 px-6 py-6 md:px-7">
        {/* HEADER */}
        <section className="mb-7">
          <div className="mb-2 flex items-center gap-3">
            <div>
               <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: 7,
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius:
                    "50%",
                  background:
                    "#1565C0",
                  boxShadow:
                    "0 0 7px rgba(21,101,192,0.9)",
                    
                }}
              />

              <span
                style={{
                  fontFamily:
                    "monospace",
                  fontSize:
                    "0.6rem",
                  color:
                    "rgba(21,101,192,0.77)",
                  letterSpacing:
                    "0.18em",
                }}
              >
                USER FEEDBACK
              </span>
            </div>
              

              <h1 className="text-xl font-black text-[#0F172A]">
                بازخورد کاربران
              </h1>
                        <p className="mt-2 text-xs font-medium text-slate-500">
            مدیریت، بررسی و تأیید بازخوردهای
            ارسال‌شده توسط کاربران
          </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="کل بازخوردها"
            value={totalCount}
            description="تمام بازخوردهای ثبت‌شده"
            icon={<IconFeedback />}
            accent="cyan"
          />

          <StatCard
            label="در انتظار بررسی"
            value={pendingCount}
            description="نیازمند بررسی مدیر"
            icon={<IconClock />}
            accent="amber"
          />

          <StatCard
            label="تأیید شده"
            value={approvedCount}
            description="قابل نمایش عمومی"
            icon={<IconCheckCircle />}
            accent="emerald"
          />

          <StatCard
            label="رد شده"
            value={rejectedCount}
            description="نمایش داده نمی‌شوند"
            icon={<IconXCircle />}
            accent="red"
          />
        </section>

        {/* ERROR */}
        {error && (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-[10px] border border-red-500/[0.255] bg-red-500/[0.075] px-4 py-3">
            <span className="text-[10px] font-bold text-red-700">
              {error}
            </span>

            <button
              type="button"
              onClick={() => void loadFeedbacks()}
              className="shrink-0 rounded-[7px] border border-red-500/[0.255] bg-red-500/[0.075] px-3 py-1.5 text-[9px] font-black text-red-700 transition-all hover:bg-red-500/[0.125]"
            >
              تلاش مجدد
            </button>
          </div>
        )}

        {/* FILTERS */}
        <section className="mb-5 overflow-visible rounded-[14px] border border-[#1565C0]/[0.15] bg-[#FFFFFF]">
          <div className="h-0.5 bg-gradient-to-l from-[#1565C0]/40 via-[#1565C0]/10 to-transparent" />

          <div className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[12px] font-black text-[#0F172A]">
                جستجو و فیلتر
              </span>

              <span className="text-[10px] font-bold text-slate-400">
                {filteredFeedbacks.length} مورد
              </span>
            </div>

            <div className="grid gap-3 lg:grid-cols-[minmax(280px,1fr)_220px_260px]">
              {/* SEARCH */}
              <div className="relative">
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[17px] text-slate-500">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="جستجوی نام، راه ارتباطی یا متن بازخورد..."
                  className="h-10 w-full rounded-[8px] border border-[#1E3A8A]/[0.14] bg-[#F6F9FD] pr-10 pl-4 text-[11px] font-bold text-slate-700 outline-none transition-all placeholder:text-slate-500 focus:border-[#1565C0]/[0.555]"
                />
              </div>

              {/* STATUS */}
              <CustomSelect
                value={statusFilter}
                onChange={(value) =>
                  setStatusFilter(
                    value as
                      | "all"
                      | FeedbackStatus
                  )
                }
                options={[
                  {
                    value: "all",
                    label: "همه وضعیت‌ها",
                  },
                  {
                    value: "pending",
                    label: "در انتظار بررسی",
                  },
                  {
                    value: "approved",
                    label: "تأیید شده",
                  },
                  {
                    value: "rejected",
                    label: "رد شده",
                  },
                ]}
              />

              {/* SUBJECT */}
              <CustomSelect
                value={subjectFilter}
                onChange={(value) =>
                  setSubjectFilter(
                    value as
                      | "all"
                      | FeedbackSubject
                  )
                }
                options={[
                  {
                    value: "all",
                    label: "همه موضوعات",
                  },
                  ...Object.entries(
                    SUBJECT_LABELS
                  ).map(([value, label]) => ({
                    value,
                    label,
                  })),
                ]}
              />
            </div>
          </div>
        </section>

        {/* TABLE */}
        <section className="overflow-hidden rounded-[14px] border border-[#1565C0]/[0.15] bg-[#FFFFFF]">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="border-b border-[#1E3A8A]/[0.08] bg-[#F6F9FD]">
                  <th className="px-5 py-4 text-right text-[10px] font-black text-slate-500">
                    کاربر
                  </th>

                  <th className="px-5 py-4 text-right text-[10px] font-black text-slate-500">
                    موضوع
                  </th>

                  <th className="px-5 py-4 text-right text-[10px] font-black text-slate-500">
                    پیام
                  </th>

                  <th className="px-5 py-4 text-right text-[10px] font-black text-slate-500">
                    وضعیت
                  </th>

                  <th className="px-5 py-4 text-right text-[10px] font-black text-slate-500">
                    تاریخ
                  </th>

                  <th className="w-[70px] px-5 py-4 text-left text-[10px] font-black text-slate-500">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <LoadingRow />
                ) : filteredFeedbacks.length ===
                  0 ? (
                  <EmptyRow />
                ) : (
                  paginatedFeedbacks.map(
                    (feedback) => (
                      <tr
                        key={feedback.id}
                        className="border-b border-[#1E3A8A]/[0.06] transition-all hover:bg-[#1565C0]/[0.043]"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-[#1565C0]/[0.18] bg-[#1565C0]/[0.075] text-[12px] font-black text-[#1565C0]">
                              {feedback.name.charAt(
                                0
                              ) || "؟"}
                            </div>

                            <div className="text-[12px] font-black text-slate-800">
                              {feedback.name ||
                                "بدون نام"}
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex max-w-[210px] rounded-[7px] border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.054] px-2.5 py-1.5 text-[10px] font-bold text-slate-600">
                            {
                              SUBJECT_LABELS[
                                feedback.subject
                              ]
                            }
                          </span>
                        </td>

                        <td className="max-w-[360px] px-5 py-4">
                          <p className="line-clamp-2 text-[11px] font-semibold leading-5 text-slate-600">
                            {truncateText(
                              feedback.message,
                              75
                            )}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={
                              feedback.approvalStatus
                            }
                          />
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                          <span className="text-[10px] font-semibold text-slate-500">
                            {formatRelativeDate(
                              feedback.createdAt
                            )}
                          </span>
                        </td>

                        <td className="w-[70px] px-5 py-4 text-left">
                          <button
                            className="service-eye-button"
                            onClick={() => {
                              setSelectedFeedback(feedback);
                            }}
                            type="button"
                            title="مشاهده"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 30,
                              height: 30,
                              borderRadius: 10,
                              cursor: "pointer",
                              background: "rgba(30,58,138,0.047)",
                              border: "1px solid rgba(30,58,138,0.14)",
                              color: "#475569",
                              transition: "all 0.18s ease",
                            }}
                          >
                            <IconEye />
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="divide-y divide-[#1E3A8A]/[0.06] md:hidden">
            {loading ? (
              <div className="px-6 py-16 text-center">
                <LoadingSpinner />

                <div className="mt-3 text-[10px] font-bold text-slate-500">
                  در حال دریافت بازخوردها...
                </div>
              </div>
            ) : filteredFeedbacks.length ===
              0 ? (
              <div className="px-6 py-20 text-center">
                <div className="mb-3 text-3xl text-slate-400">
                  ⌕
                </div>

                <div className="text-[12px] font-black text-slate-600">
                  بازخوردی پیدا نشد
                </div>

                <div className="mt-1 text-[10px] font-bold text-slate-400">
                  فیلترها یا عبارت جستجو را تغییر
                  دهید.
                </div>
              </div>
            ) : (
              paginatedFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="block w-full p-4 text-right transition-all hover:bg-[#1565C0]/[0.043]"
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-[#1565C0]/[0.18] bg-[#1565C0]/[0.075] text-[12px] font-black text-[#1565C0]">
                        {feedback.name.charAt(0) ||
                          "؟"}
                      </div>

                      <div>
                        <div className="text-[12px] font-black text-slate-800">
                          {feedback.name ||
                            "بدون نام"}
                        </div>

                        <div className="mt-1 text-[9px] font-bold text-slate-400">
                          {formatRelativeDate(
                            feedback.createdAt
                          )}
                        </div>
                      </div>
                    </div>

                    <StatusBadge
                      status={
                        feedback.approvalStatus
                      }
                    />
                  </div>

                  <div className="mb-2 text-[10px] font-bold text-[#1565C0]">
                    {
                      SUBJECT_LABELS[
                        feedback.subject
                      ]
                    }
                  </div>

                  <p className="line-clamp-3 text-[11px] font-semibold leading-6 text-slate-600">
                    {truncateText(
                      feedback.message,
                      75
                    )}
                  </p>

                  <div className="mt-3 flex justify-end">
                    <button
                      className="service-eye-button"
                      onClick={() => {
                        setSelectedFeedback(
                          feedback
                        );
                      }}
                      type="button"
                      title="مشاهده"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 30,
                        height: 30,
                        borderRadius: 10,
                        cursor: "pointer",
                        background:
                          "rgba(30,58,138,0.047)",
                        border:
                          "1px solid rgba(30,58,138,0.14)",
                        color: "#475569",
                        transition:
                          "all 0.18s ease",
                      }}
                    >
                      <IconEye />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        )}
      </div>

      {/* DRAWER */}
      {selectedFeedback && (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            aria-label="بستن"
            onClick={() =>
              setSelectedFeedback(null)
            }
            className="absolute inset-0 cursor-default bg-[#0F172A]/[0.39] backdrop-blur-sm"
          />

          <aside className="absolute left-0 top-0 flex h-full w-full max-w-[540px] flex-col border-r border-[#1E3A8A]/[0.14] bg-[#EEF3FA] shadow-2xl">
            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between border-b border-[#1E3A8A]/[0.1] px-5 py-5">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#1565C0]/[0.77]">
                  FEEDBACK DETAILS
                </div>

                <h2 className="mt-1 text-[16px] font-black text-[#0F172A]">
                  جزئیات بازخورد
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedFeedback(null)
                }
                className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.054] text-[17px] text-slate-500 transition-all hover:border-[#1565C0]/[0.255] hover:text-slate-700"
              >
                ×
              </button>
            </div>

            {/* DRAWER BODY */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* USER */}
              <div className="mb-4 overflow-hidden rounded-[12px] border border-[#1565C0]/[0.15] bg-[#FFFFFF]">
                <div className="h-0.5 bg-gradient-to-l from-[#1565C0]/35 via-[#1565C0]/10 to-transparent" />

                <div className="p-4">
                  <div className="mb-3 text-[9px] font-black tracking-wide text-slate-400">
                    USER
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[9px] border border-[#1565C0]/[0.18] bg-[#1565C0]/[0.075] text-sm font-black text-[#1565C0]">
                      {selectedFeedback.name.charAt(
                        0
                      ) || "؟"}
                    </div>

                    <div>
                      <div className="text-[12px] font-black text-slate-800">
                        {selectedFeedback.name ||
                          "بدون نام"}
                      </div>

                      <div className="mt-1 text-[10px] font-bold text-slate-500">
                        {selectedFeedback.contact ||
                          "راه ارتباطی ثبت نشده"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* INFO */}
              <div className="mb-4 grid grid-cols-2 gap-2">
                <InfoBox
                  label="موضوع"
                  value={
                    SUBJECT_LABELS[
                      selectedFeedback.subject
                    ]
                  }
                />

                <InfoBox
                  label="وضعیت"
                  value={
                    STATUS_LABELS[
                      selectedFeedback
                        .approvalStatus
                    ]
                  }
                />

                <InfoBox
                  label="تاریخ ارسال"
                  value={formatDate(
                    selectedFeedback.createdAt
                  )}
                />

                <InfoBox
                  label="راه ارتباطی"
                  value={
                    selectedFeedback.contact ||
                    "—"
                  }
                />
              </div>

              {/* MESSAGE */}
              <div className="overflow-hidden rounded-[12px] border border-[#1565C0]/[0.15] bg-[#FFFFFF]">
                <div className="border-b border-[#1E3A8A]/[0.08] px-4 py-3">
                  <div className="text-[9px] font-black tracking-wide text-slate-400">
                    MESSAGE
                  </div>
                </div>

                <div className="p-4">
                  <p className="whitespace-pre-wrap text-[12px] font-semibold leading-7 text-slate-700">
                    {selectedFeedback.message}
                  </p>
                </div>
              </div>
            </div>

            {/* DRAWER ACTIONS */}
            <div className="border-t border-[#1E3A8A]/[0.1] bg-[#F1F5FB] p-4">
              <div className="mb-2 flex gap-2">
                {selectedFeedback.approvalStatus ===
                  "pending" && (
                  <>
                    <button
                      type="button"
                      disabled={
                        updatingId ===
                        selectedFeedback.id
                      }
                      onClick={() =>
                        void updateFeedbackStatus(
                          selectedFeedback,
                          "approved"
                        )
                      }
                      className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] border border-emerald-500/[0.33] bg-emerald-500/[0.101] text-[11px] font-black text-emerald-700 transition-all hover:border-emerald-500/[0.555] hover:bg-emerald-500/[0.14] hover:shadow-[0_0_14px_rgba(16,185,129,0.12)] disabled:opacity-50"
                    >
                      {updatingId ===
                      selectedFeedback.id ? (
                        <SmallSpinner />
                      ) : (
                        <IconCheck />
                      )}

                      تأیید و انتشار
                    </button>

                    <button
                      type="button"
                      disabled={
                        updatingId ===
                        selectedFeedback.id
                      }
                      onClick={() =>
                        setModalType("reject")
                      }
                      className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] border border-red-500/[0.33] bg-red-500/[0.114] text-[11px] font-black text-red-700 transition-all hover:border-red-500/[0.555] hover:bg-red-500/[0.17] hover:shadow-[0_0_14px_rgba(239,68,68,0.12)] disabled:opacity-50"
                    >
                      <IconX />
                      رد کردن
                    </button>
                  </>
                )}
              </div>

              {/* DELETE */}
              <button
                type="button"
                disabled={
                  deletingId ===
                  selectedFeedback.id
                }
                onClick={() =>
                  setModalType("delete")
                }
                className="flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-red-500/[0.255] bg-red-500/[0.075] text-[10px] font-black text-red-700 transition-all hover:border-red-500/[0.4] hover:bg-red-500/[0.114] hover:text-red-700 hover:shadow-[0_0_14px_rgba(239,68,68,0.10)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingId ===
                selectedFeedback.id ? (
                  <SmallSpinner />
                ) : (
                  <IconTrash />
                )}

                حذف بازخورد
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* CONFIRM MODAL */}
      {modalType && selectedFeedback && (
        <ConfirmModal
          type={modalType}
          feedback={selectedFeedback}
          loading={
            modalType === "delete"
              ? deletingId ===
                selectedFeedback.id
              : updatingId ===
                selectedFeedback.id
          }
          onCancel={() =>
            setModalType(null)
          }
          onConfirm={() => {
            if (modalType === "reject") {
              void rejectFeedback();
            } else {
              void deleteFeedback();
            }
          }}
        />
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* CONFIRM MODAL */
/* -------------------------------------------------------------------------- */

function ConfirmModal({
  type,
  feedback,
  loading,
  onCancel,
  onConfirm,
}: {
  type: "reject" | "delete";
  feedback: Feedback;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const isDelete = type === "delete";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0F172A]/[0.39] px-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="بستن"
        onClick={onCancel}
        className="absolute inset-0 cursor-default"
      />

      <div className="relative z-10 w-full max-w-[430px] overflow-hidden rounded-[14px] border border-[#1E3A8A]/[0.16] bg-[#F6F9FD] shadow-[0_25px_80px_rgba(15,23,42,0.18)]">
        <div
          className={`h-0.5 ${
            isDelete
              ? "bg-red-500/75"
              : "bg-red-500/60"
          }`}
        />

        <div className="p-5">
          <div className="mb-5 flex items-start gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border ${
                isDelete
                  ? "border-red-500/[0.33] bg-red-500/[0.114] text-red-700"
                  : "border-amber-500/[0.33] bg-amber-500/[0.088] text-amber-700"
              }`}
            >
              {isDelete ? (
                <IconTrash />
              ) : (
                <IconWarning />
              )}
            </div>

            <div>
              <h3 className="text-[14px] font-black text-[#0F172A]">
                {isDelete
                  ? "حذف بازخورد"
                  : "رد کردن بازخورد"}
              </h3>

              <p className="mt-1 text-[10px] font-bold leading-5 text-slate-700">
                {isDelete
                  ? "این عملیات قابل بازگشت نیست."
                  : "این بازخورد به وضعیت رد شده تغییر خواهد کرد."}
              </p>
            </div>
          </div>

          <div className="mb-5 rounded-[9px] border border-[#1E3A8A]/[0.08] bg-[#EEF3FA]/80 p-3">
            <div className="mb-1 text-[9px] font-black text-slate-500">
              بازخورد کاربر
            </div>

            <div className="text-[11px] font-black text-slate-700">
              {feedback.name || "بدون نام"}
            </div>

            <div className="mt-1 line-clamp-2 text-[10px] font-semibold leading-5 text-slate-500">
              {feedback.message}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={onCancel}
              className="h-10 flex-1 rounded-[8px] border border-[#1E3A8A]/[0.14] bg-[#1E3A8A]/[0.054] text-[10px] font-black text-slate-700 transition-all hover:bg-[#1E3A8A]/[0.075] hover:text-[#0F172A] disabled:opacity-50"
            >
              انصراف
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={onConfirm}
              className={`h-10 flex-1 rounded-[8px] border text-[10px] font-black transition-all disabled:opacity-50 ${
                isDelete
                  ? "border-red-500/[0.33] bg-red-500/[0.114] text-red-700 hover:border-red-500/[0.555] hover:bg-red-500/[0.17] hover:shadow-[0_0_14px_rgba(239,68,68,0.12)]"
                  : "border-red-500/[0.33] bg-red-500/[0.114] text-red-700 hover:border-red-500/[0.555] hover:bg-red-500/[0.17] hover:shadow-[0_0_14px_rgba(239,68,68,0.12)]"
              }`}
            >
              {loading && <SmallSpinner />}

              {isDelete
                ? "بله، حذف شود"
                : "بله، رد شود"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PAGINATION */
/* -------------------------------------------------------------------------- */

function IconChevronLeft() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function getPaginationRange(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  // تا ۴ صفحه، همه‌شون رو کامل نشون بده — نقطه‌گذاری فقط از
  // ۵ صفحه به بالا شروع می‌شه (مطابق همون رفتاری که توی خدمات داریم).
  if (totalPages <= 4) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range: (number | "...")[] = [];
  const siblingCount = 1;

  const start = Math.max(2, currentPage - siblingCount);
  const end = Math.min(
    totalPages - 1,
    currentPage + siblingCount
  );

  range.push(1);

  if (start > 2) {
    range.push("...");
  }

  for (let page = start; page <= end; page++) {
    range.push(page);
  }

  if (end < totalPages - 1) {
    range.push("...");
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
}

function Pagination({
  currentPage,
  totalPages,
  onChange,
}: {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const pages = getPaginationRange(
    currentPage,
    totalPages
  ).reverse();

  return (
   <div
  dir="ltr"
  className="mt-6 flex items-center justify-center gap-2"
>
  <button
    type="button"
    onClick={() =>
      onChange(Math.min(totalPages, currentPage + 1))
    }
    disabled={currentPage === totalPages}
    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#1E3A8A]/[0.14] bg-[#F6F9FD] text-slate-500 transition-all hover:border-[#1565C0]/[0.405] hover:text-[#1565C0] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#1E3A8A]/[0.14] disabled:hover:text-slate-500"
  >
    <IconChevronLeft />
  </button>

  {pages.map((page, index) =>
    page === "..." ? (
      <span
        key={`ellipsis-${index}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center text-[12px] font-black text-slate-400"
      >
        …
      </span>
    ) : (
      <button
        key={page}
        type="button"
        onClick={() => onChange(page)}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border text-[12px] font-black transition-all ${
          page === currentPage
            ? "border-[#1565C0] bg-[#1565C0] text-[#FFFFFF] shadow-[0_0_16px_rgba(21,101,192,0.545)]"
            : "border-[#1E3A8A]/[0.14] bg-[#F6F9FD] text-slate-600 hover:border-[#1565C0]/[0.405] hover:text-[#1565C0]"
        }`}
      >
        {page}
      </button>
    )
  )}

  <button
    type="button"
    onClick={() =>
      onChange(Math.max(1, currentPage - 1))
    }
    disabled={currentPage === 1}
    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[#1E3A8A]/[0.14] bg-[#F6F9FD] text-slate-500 transition-all hover:border-[#1565C0]/[0.405] hover:text-[#1565C0] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#1E3A8A]/[0.14] disabled:hover:text-slate-500"
  >
    <IconChevronRight />
  </button>
</div>
  );
}

/* -------------------------------------------------------------------------- */
/* CUSTOM SELECT */
/* -------------------------------------------------------------------------- */

function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  const [open, setOpen] = useState(false);

  const selectedOption =
    options.find(
      (option) => option.value === value
    ) ?? options[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        className={`flex h-10 w-full items-center justify-between rounded-[8px] border bg-[#F6F9FD] px-3 text-right text-[11px] font-bold outline-none transition-all ${
          open
            ? "border-[#1565C0]/[0.555] shadow-[0_0_16px_rgba(21,101,192,0.08)]"
            : "border-[#1E3A8A]/[0.14] hover:border-[#1565C0]/[0.255]"
        }`}
      >
        <span className="truncate text-slate-700">
          {selectedOption.label}
        </span>

        <span
          className={`mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-[#1E3A8A]/[0.1] bg-[#1E3A8A]/[0.04] text-slate-500 transition-all duration-200 ${
            open
              ? "border-[#1565C0]/[0.255] bg-[#1565C0]/[0.075] text-[#1565C0]"
              : ""
          }`}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="بستن منو"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-[calc(100%+6px)] z-50 max-h-[280px] w-full overflow-y-auto rounded-[9px] border border-[#1E3A8A]/[0.16] bg-[#F6F9FD] p-[6px] shadow-[0_16px_40px_rgba(15,23,42,0.18)]">
            {options.map((option) => {
              const selected =
                option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-[7px] px-3 py-2.5 text-right text-[11px] font-bold transition-all ${
                    selected
                      ? "bg-[#1565C0]/[0.114] text-[#1565C0]"
                      : "text-slate-700 hover:bg-[#1E3A8A]/[0.075] hover:text-[#0F172A]"
                  }`}
                >
                  <span className="truncate">
                    {option.label}
                  </span>

                  {selected && (
                    <span className="mr-2 shrink-0 text-[#1565C0]">
                      <IconCheck />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}

      <style>
        {`
          .service-eye-button:hover {
            background: rgba(21, 101, 192, 0.08) !important;
            border-color: rgba(21, 101, 192, 0.28) !important;
            color: #1565C0 !important;
            transform: translateY(-1px);
            box-shadow: 0 0 12px rgba(21, 101, 192, 0.12);
          }

          .service-eye-button:active {
            transform: translateY(0);
          }
        `}
      </style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STAT CARD */
/* -------------------------------------------------------------------------- */

function StatCard({
  label,
  value,
  description,
  icon,
  accent,
}: {
  label: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  accent:
    | "cyan"
    | "amber"
    | "emerald"
    | "red";
}) {
  const styles = {
    cyan: {
      icon: "border-[#1565C0]/[0.18] bg-[#1565C0]/[0.075] text-[#1565C0]",
      line: "from-[#1565C0]/35 via-[#1565C0]/10",
    },
    amber: {
      icon: "border-amber-500/[0.33] bg-amber-500/[0.088] text-amber-700",
      line: "from-amber-500/35 via-amber-500/10",
    },
    emerald: {
      icon: "border-emerald-500/[0.33] bg-emerald-500/[0.101] text-emerald-600",
      line: "from-emerald-500/35 via-emerald-500/10",
    },
    red: {
      icon: "border-red-500/[0.255] bg-red-500/[0.075] text-red-700",
      line: "from-red-500/35 via-red-500/10",
    },
  };

  const current = styles[accent];

  return (
    <div className="overflow-hidden rounded-[14px] border border-[#1565C0]/[0.15] bg-[#FFFFFF]">
      <div
        className={`h-0.5 bg-gradient-to-l ${current.line} to-transparent`}
      />

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-black text-slate-500">
              {label}
            </div>

            <div className="mt-2 text-2xl font-black text-[#0F172A]">
              {value}
            </div>
          </div>

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-[8px] border ${current.icon}`}
          >
            {icon}
          </div>
        </div>

        <div className="mt-3 text-[9px] font-bold text-slate-400">
          {description}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STATUS BADGE */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: FeedbackStatus;
}) {
  const classes = {
    pending:
      "border-amber-500/[0.33] bg-amber-500/[0.088] text-amber-700",
    approved:
      "border-emerald-500/[0.33] bg-emerald-500/[0.101] text-emerald-600",
    rejected:
      "border-red-500/[0.255] bg-red-500/[0.075] text-red-700",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-[7px] border px-2.5 py-1.5 text-[9px] font-black ${classes[status]}`}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {STATUS_LABELS[status]}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* INFO BOX */
/* -------------------------------------------------------------------------- */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[9px] border border-[#1E3A8A]/[0.08] bg-[#EEF3FA]/80 px-3 py-2.5">
      <div className="mb-1 text-[8px] font-black text-slate-400">
        {label}
      </div>

      <div className="truncate text-[10px] font-black text-slate-700">
        {value}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TABLE STATES */
/* -------------------------------------------------------------------------- */

function LoadingRow() {
  return (
    <tr>
      <td
        colSpan={6}
        className="px-6 py-16 text-center"
      >
        <LoadingSpinner />

        <div className="mt-3 text-[10px] font-bold text-slate-500">
          در حال دریافت بازخوردها...
        </div>
      </td>
    </tr>
  );
}

function EmptyRow() {
  return (
    <tr>
      <td
        colSpan={6}
        className="px-6 py-20 text-center"
      >
        <div className="mb-3 text-3xl text-slate-400">
          ⌕
        </div>

        <div className="text-[12px] font-black text-slate-600">
          بازخوردی پیدا نشد
        </div>

        <div className="mt-1 text-[10px] font-bold text-slate-400">
          فیلترها یا عبارت جستجو را تغییر دهید.
        </div>
      </td>
    </tr>
  );
}

/* -------------------------------------------------------------------------- */
/* SPINNERS */
/* -------------------------------------------------------------------------- */

function LoadingSpinner() {
  return (
    <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-[#1565C0]/[0.2] border-t-[#1565C0]" />
  );
}

function SmallSpinner() {
  return (
    <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current/20 border-t-current" />
  );
}