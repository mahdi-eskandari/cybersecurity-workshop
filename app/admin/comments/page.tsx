"use client";

import { useEffect, useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */

type CommentStatus = "pending" | "approved" | "rejected";

type CommentItem = {
  id: string;
  postId?: string;
  postTitle?: string;
  name: string;
  contact: string;
  message: string;
  approvalStatus: CommentStatus;
  createdAt: string;
};

type ModalType = "approve" | "reject" | "delete" | null;

/* -------------------------------------------------------------------------- */
/* CONSTANTS */
/* -------------------------------------------------------------------------- */

const ITEMS_PER_PAGE = 12;

const STATUS_LABELS: Record<CommentStatus, string> = {
  pending: "در انتظار بررسی",
  approved: "تأیید شده",
  rejected: "رد شده",
};

const VALID_STATUSES = new Set<CommentStatus>([
  "pending",
  "approved",
  "rejected",
]);

/* -------------------------------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------------------------------- */

function normalizeComment(item: any): CommentItem {
  const approvalStatus: CommentStatus = VALID_STATUSES.has(item?.approvalStatus)
    ? item.approvalStatus
    : "pending";

  return {
    id: String(item?._id ?? item?.id ?? ""),
    postId: String(item?.postId?._id ?? item?.postId ?? item?.post?._id ?? ""),
    postTitle: String(item?.postId?.title ?? item?.postTitle ?? item?.post?.title ?? "پست مربوطه"),
    name: String(item?.name ?? item?.user?.name ?? "کاربر مهمان"),
    contact: String(item?.contact ?? item?.email ?? ""),
    message: String(item?.content ?? item?.text ?? item?.message ?? item?.body ?? item?.comment ?? ""),
    approvalStatus,
    createdAt: item?.createdAt ? String(item.createdAt) : "",
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
  if (Number.isNaN(date.getTime())) return value;

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 0) return formatDate(value);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (diff < minute) return "همین الان";
  if (diff < hour) return `${Math.floor(diff / minute)} دقیقه پیش`;
  if (diff < day) return `${Math.floor(diff / hour)} ساعت پیش`;

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

  if (diff < week) return `${Math.floor(diff / day)} روز پیش`;
  const weeks = Math.floor(diff / week);
  if (weeks < 5) return `${weeks} هفته پیش`;

  return formatDate(value);
}

function truncateText(value: string, maxLength = 75) {
  if (!value) return "—";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

/* -------------------------------------------------------------------------- */
/* ICONS */
/* -------------------------------------------------------------------------- */

const IconEye = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const IconChevronLeft = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 6 9 12 15 18" />
  </svg>
);

function IconFeedback() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4 8.5 8.5 0 0 1-6.6 3.1 8.38 8.38 0 0 1-3.9-.95L3 21l1.95-5.6A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 0 1 3.1-6.6A8.38 8.38 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.3 2.3L16 9" />
    </svg>
  );
}

function IconXCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6" />
      <path d="m15 9-6 6" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7 7 10 10" />
      <path d="m17 7-10 10" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3 3.8 2.4 18a2 2 0 0 0 1.75 3h15.7a2 2 0 0 0 1.75-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN PAGE */
/* -------------------------------------------------------------------------- */

export default function PostCommentsAdminPage() {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [selectedComment, setSelectedComment] = useState<CommentItem | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | CommentStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const loadComments = async (pageToFetch = 1, status = statusFilter) => {
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: String(pageToFetch),
        limit: String(ITEMS_PER_PAGE),
      });

      if (status !== "all") {
        params.append("status", status);
      }

      const response = await fetch(`/api/comments?${params.toString()}`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "دریافت نظرات انجام نشد.");
      }

      const items = Array.isArray(data?.comments) ? data.comments : [];
      setComments(items.map(normalizeComment));
      setTotalPages(data?.totalPages || 1);
      setCurrentPage(data?.page || pageToFetch);
      setTotalCount(data?.total || items.length);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "دریافت نظرات انجام نشد.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadComments(1, statusFilter);
  }, [statusFilter]);

  const updateCommentStatus = async (comment: CommentItem, approvalStatus: CommentStatus) => {
    if (updatingId || deletingId) return;
    const previousStatus = comment.approvalStatus;

    setUpdatingId(comment.id);
    setError("");

    setComments((prev) =>
      prev.map((item) => (item.id === comment.id ? { ...item, approvalStatus } : item))
    );
    setSelectedComment((prev) => (prev?.id === comment.id ? { ...prev, approvalStatus } : prev));

    try {
      const response = await fetch("/api/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: comment.id, approvalStatus }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "تغییر وضعیت انجام نشد.");

      // روتر PATCH مستقیماً خودِ سند نظر رو برمی‌گردونه (نه { comment: {...} }).
      // قبلاً data?.comment اشتباهاً با فیلدِ متنِ خودِ نظر (که اسمش هم
      // "comment"ه) قاطی می‌شد و باعث می‌شد name/createdAt/postTitle
      // همه گم بشن. اینجا مستقیماً از data استفاده می‌کنیم.
      const updatedComment = normalizeComment(data);
      setComments((prev) => prev.map((item) => (item.id === comment.id ? updatedComment : item)));
      setSelectedComment(null);
      setSelectedComment((prev) => (prev?.id === comment.id ? updatedComment : prev));
    } catch (error) {
      console.error(error);
      setComments((prev) =>
        prev.map((item) => (item.id === comment.id ? { ...item, approvalStatus: previousStatus } : item))
      );
      setSelectedComment((prev) => (prev?.id === comment.id ? { ...prev, approvalStatus: previousStatus } : prev));
      setError(error instanceof Error ? error.message : "تغییر وضعیت انجام نشد.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleModalConfirm = async () => {
    if (!selectedComment || !modalType) return;
    const targetComment = selectedComment;
    const currentModal = modalType;
    setModalType(null);

    if (currentModal === "approve") {
      await updateCommentStatus(targetComment, "approved");
    } else if (currentModal === "reject") {
      await updateCommentStatus(targetComment, "rejected");
    } else if (currentModal === "delete") {
      await deleteCommentAction(targetComment.id);
    }
  };

  const deleteCommentAction = async (commentId: string) => {
    if (deletingId) return;

    setDeletingId(commentId);
    setError("");

    try {
      const response = await fetch("/api/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: commentId }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "حذف نظر انجام نشد.");

      setSelectedComment(null);
      void loadComments(currentPage, statusFilter);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "حذف نظر انجام نشد.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredComments = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    if (!searchValue) return comments;

    return comments.filter(
      (comment) =>
        comment.name.toLowerCase().includes(searchValue) ||
        (comment.postTitle ?? "").toLowerCase().includes(searchValue) ||
        comment.message.toLowerCase().includes(searchValue)
    );
  }, [comments, search]);

  const pendingCount = comments.filter((i) => i.approvalStatus === "pending").length;
  const approvedCount = comments.filter((i) => i.approvalStatus === "approved").length;
  const rejectedCount = comments.filter((i) => i.approvalStatus === "rejected").length;

  return (
    <main dir="rtl" className="min-h-screen w-full bg-[#050814] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* HEADER */}
        <section className="mb-7">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-[#00E5FF]" />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5FF", boxShadow: "0 0 7px rgba(0,229,255,0.9)" }} />
                <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(0,229,255,0.5)", letterSpacing: "0.18em" }}>
                  COMMENTS MANAGEMENT
                </span>
              </div>
              <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
                مدیریت نظرات پست‌ها
              </h1>
            </div>
          </div>
          <p className="mr-4 text-[12px] font-bold text-slate-400">
            بررسی، تایید یا رد نظرات ثبت‌شده کاربران
          </p>
        </section>

        {/* STATS */}
        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard label="کل نظرات" value={totalCount} description="تمام نظرات ثبت‌شده" icon={<IconFeedback />} accent="cyan" />
          <StatCard label="در انتظار بررسی" value={pendingCount} description="نیازمند بررسی مدیر" icon={<IconClock />} accent="amber" />
          <StatCard label="تأیید شده" value={approvedCount} description="قابل نمایش عمومی" icon={<IconCheckCircle />} accent="emerald" />
          <StatCard label="رد شده" value={rejectedCount} description="نمایش داده نمی‌شوند" icon={<IconXCircle />} accent="red" />
        </section>

        {/* ERROR */}
        {error && (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-[10px] border border-red-400/10 bg-red-400/[0.035] px-4 py-3">
            <span className="text-[10px] font-bold text-red-300">{error}</span>
            <button
              type="button"
              onClick={() => void loadComments(currentPage, statusFilter)}
              className="shrink-0 rounded-[7px] border border-red-400/15 bg-red-400/[0.05] px-3 py-1.5 text-[9px] font-black text-red-300"
            >
              تلاش مجدد
            </button>
          </div>
        )}

        {/* FILTERS */}
        <section className="mb-5 overflow-visible rounded-[14px] border border-[rgba(0,229,255,0.09)] bg-[#0A1128]">
          <div className="h-0.5 bg-gradient-to-l from-[#00E5FF]/40 via-[#00E5FF]/10 to-transparent" />
          <div className="p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[12px] font-black text-slate-300">جستجو و فیلتر</span>
              <span className="text-[10px] font-bold text-slate-600">{filteredFeedbacksCount(filteredComments)} مورد</span>
            </div>
            <div className="grid gap-3 lg:grid-cols-[1fr_240px]">
              <div className="relative">
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[17px] text-slate-600">⌕</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="جستجو در نام، عنوان پست یا متن نظر..."
                  className="h-10 w-full rounded-[8px] border border-white/[0.07] bg-[#0B1224] pr-10 pl-4 text-[11px] font-bold text-slate-300 outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/30"
                />
              </div>
              <CustomSelect
                value={statusFilter}
                onChange={(value) => setStatusFilter(value as "all" | CommentStatus)}
                options={[
                  { value: "all", label: "همه وضعیت‌ها" },
                  { value: "pending", label: "در انتظار بررسی" },
                  { value: "approved", label: "تأیید شده" },
                  { value: "rejected", label: "رد شده" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* TABLE & MOBILE RESPONSIVE CARDS */}
        <section className="overflow-hidden rounded-[14px] border border-[rgba(0,229,255,0.09)] bg-[#0A1128]">
          {/* Desktop Table View */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[980px] border-collapse">
              <thead>
                <tr className="border-b border-white/[0.05] bg-white/[0.015]">
                  <th className="px-5 py-4 text-right text-[10px] font-black text-slate-600">کاربر</th>
                  <th className="px-5 py-4 text-right text-[10px] font-black text-slate-600">پست مربوطه</th>
                  <th className="px-5 py-4 text-right text-[10px] font-black text-slate-600">متن نظر</th>
                  <th className="px-5 py-4 text-right text-[10px] font-black text-slate-600">وضعیت</th>
                  <th className="px-5 py-4 text-right text-[10px] font-black text-slate-600">تاریخ</th>
                  <th className="w-[70px] px-5 py-4 text-left text-[10px] font-black text-slate-600">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <LoadingRow />
                ) : filteredComments.length === 0 ? (
                  <EmptyRow />
                ) : (
                  filteredComments.map((comment) => (
                    <tr key={comment.id} className="border-b border-white/[0.04] transition-all hover:bg-cyan-400/[0.025]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-cyan-400/10 bg-cyan-400/[0.04] text-[12px] font-black text-cyan-300">
                            {comment.name.charAt(0) || "؟"}
                          </div>
                          <div className="text-[12px] font-black text-slate-200">{comment.name || "بدون نام"}</div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex max-w-[210px] truncate rounded-[7px] border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5 text-[10px] font-bold text-slate-400">
                          {comment.postTitle}
                        </span>
                      </td>
                      <td className="max-w-[360px] px-5 py-4">
                        <p className="line-clamp-2 text-[11px] font-semibold leading-5 text-slate-500">
                          {truncateText(comment.message, 75)}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={comment.approvalStatus} />
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="text-[10px] font-semibold text-slate-600">
                          {formatRelativeDate(comment.createdAt)}
                        </span>
                      </td>
                      <td className="w-[70px] px-5 py-4 text-left">
                        <button
                          className="service-eye-button"
                          onClick={() => setSelectedComment(comment)}
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
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#475569",
                            transition: "all 0.18s ease",
                          }}
                        >
                          <IconEye />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card-Based Responsive View */}
          <div className="divide-y divide-white/[0.04] md:hidden">
            {loading ? (
              <div className="py-12 text-center text-slate-500 text-[11px]">در حال دریافت اطلاعات...</div>
            ) : filteredComments.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-[11px]">نظری یافت نشد.</div>
            ) : (
              filteredComments.map((comment) => (
                <div key={comment.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] border border-cyan-400/10 bg-cyan-400/[0.04] text-[11px] font-black text-cyan-300">
                        {comment.name.charAt(0) || "؟"}
                      </div>
                      <span className="text-[12px] font-black text-slate-200">{comment.name}</span>
                    </div>
                    <StatusBadge status={comment.approvalStatus} />
                  </div>

                  <div className="text-[10px] font-bold text-cyan-400/90 bg-cyan-400/[0.03] border border-cyan-400/10 rounded-[6px] px-2.5 py-1.5 truncate">
                    پست: {comment.postTitle}
                  </div>

                  <p className="text-[11px] font-semibold text-slate-400 line-clamp-3 leading-relaxed">
                    {comment.message}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] font-semibold text-slate-500">{formatRelativeDate(comment.createdAt)}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedComment(comment)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-cyan-400/25 bg-cyan-400/10 text-[10px] font-bold text-cyan-300"
                    >
                      <IconEye /> بررسی و جزئیات
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="قبلی"
             disabled={currentPage <= 1}
             onClick={() => void loadComments(currentPage - 1, statusFilter)}
              className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-white/[0.07] bg-[#0B1224] text-slate-400 transition-all disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconChevronRight />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => void loadComments(p, statusFilter)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-[8px] border px-2 text-[11px] font-black transition-all ${
                  p === currentPage
                    ? "border-[#00E5FF]/60 bg-[#00E5FF] text-[#050814]"
                    : "border-white/[0.07] bg-[#0B1224] text-slate-400 hover:border-[#00E5FF]/25 hover:text-cyan-300"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              type="button"
             aria-label="بعدی"
             disabled={currentPage >= totalPages}
             onClick={() => void loadComments(currentPage + 1, statusFilter)}
              className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-white/[0.07] bg-[#0B1224] text-slate-400 transition-all disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconChevronLeft />
            </button>
          </div>
        )}
      </div>

      {/* DRAWER */}
      {selectedComment && (
        <div className="fixed inset-0 z-[100]">
          <button type="button" aria-label="بستن" onClick={() => setSelectedComment(null)} className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm" />
          <aside className="absolute left-0 top-0 flex h-full w-full max-w-[540px] flex-col border-r border-white/[0.07] bg-[#080D1C] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5">
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400/60">COMMENT DETAILS</div>
                <h2 className="mt-1 text-[16px] font-black text-white">جزئیات نظر کاربر</h2>
              </div>
              <button type="button" onClick={() => setSelectedComment(null)} className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-white/[0.07] bg-white/[0.025] text-[17px] text-slate-600">×</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="overflow-hidden rounded-[12px] border border-[rgba(0,229,255,0.08)] bg-[#0A1128] p-4">
                <div className="text-[9px] font-black tracking-wide text-slate-600 mb-2">USER & POST</div>
                <div className="text-[12px] font-black text-slate-200">{selectedComment.name}</div>
                <div className="text-[10px] font-bold text-cyan-400 mt-1">پست: {selectedComment.postTitle}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <InfoBox label="وضعیت" value={STATUS_LABELS[selectedComment.approvalStatus]} />
                <InfoBox label="تاریخ ثبت" value={formatDate(selectedComment.createdAt)} />
              </div>
              <div className="overflow-hidden rounded-[12px] border border-white/[0.06] bg-[#0A1128]">
                <div className="border-b border-white/[0.04] px-4 py-3 text-[9px] font-black text-slate-600">MESSAGE CONTENT</div>
                <div className="p-4">
                  <p className="whitespace-pre-wrap text-[12px] font-semibold leading-7 text-slate-300">{selectedComment.message || "متنی ثبت نشده است."}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.06] bg-[#070B17] p-4 space-y-2">
              <div className="flex gap-2">
                {selectedComment.approvalStatus !== "approved" && (
                  <button
                    type="button"
                    disabled={updatingId === selectedComment.id}
                    onClick={() => void updateCommentStatus(selectedComment, "approved")}
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] border border-emerald-400/35 bg-emerald-400/[0.11] text-[11px] font-black text-emerald-300 disabled:opacity-60"
                  >
                    <IconCheck /> {updatingId === selectedComment.id ? "در حال تأیید..." : "تأیید و انتشار"}
                  </button>
                )}
                {selectedComment.approvalStatus !== "rejected" && (
                  <button
                    type="button"
                    onClick={() => setModalType("reject")}
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] border border-red-400/35 bg-red-400/[0.10] text-[11px] font-black text-red-300"
                  >
                    <IconX /> رد کردن
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setModalType("delete")}
                className="flex h-9 w-full items-center justify-center gap-2 rounded-[8px] border border-red-400/[18] bg-red-400/[0.045] text-[10px] font-black text-red-400"
              >
                <IconTrash /> حذف نظر
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* CONFIRM MODAL */}
      {modalType && selectedComment && (
        <ConfirmModal
          type={modalType}
          comment={selectedComment}
          loading={modalType === "delete" ? deletingId === selectedComment.id : updatingId === selectedComment.id}
          onCancel={() => setModalType(null)}
          onConfirm={() => void handleModalConfirm()}
        />
      )}

      <style jsx global>{`
        .service-eye-button:hover {
          background: rgba(0, 229, 255, 0.08) !important;
          border-color: rgba(0, 229, 255, 0.28) !important;
          color: #00E5FF !important;
          transform: translateY(-1px);
          box-shadow: 0 0 12px rgba(0, 229, 255, 0.12);
        }
      `}</style>
    </main>
  );
}

function ConfirmModal({ type, comment, loading, onCancel, onConfirm }: any) {
  const isDelete = type === "delete";
  const isApprove = type === "approve";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <button type="button" aria-label="بستن" onClick={onCancel} className="absolute inset-0 cursor-default" />
      <div className="relative z-10 w-full max-w-[430px] overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#0A1128] shadow-2xl p-5">
        <div className="mb-5 flex items-start gap-3">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border ${isDelete ? "border-red-400/35 bg-red-400/[0.11] text-red-300" : isApprove ? "border-emerald-400/35 bg-emerald-400/[0.11] text-emerald-300" : "border-amber-400/35 bg-amber-400/[0.10] text-amber-300"}`}>
            {isDelete ? <IconTrash /> : <IconWarning />}
          </div>
          <div>
            <h3 className="text-[14px] font-black text-white">
              {isDelete ? "حذف نظر" : isApprove ? "تأیید و انتشار نظر" : "رد کردن نظر"}
            </h3>
            <p className="mt-1 text-[10px] font-bold leading-5 text-slate-400">
              {isDelete ? "این عملیات قابل بازگشت نیست." : "آیا از انجام این عملیات اطمینان دارید؟"}
            </p>
          </div>
        </div>
        <div className="mb-5 rounded-[9px] border border-white/[0.05] bg-[#050814]/50 p-3">
          <div className="mb-1 text-[9px] font-black text-slate-500">متن نظر کاربر</div>
          <div className="text-[11px] font-semibold text-slate-300 line-clamp-2">{comment.message}</div>
        </div>
        <div className="flex gap-2">
          <button type="button" disabled={loading} onClick={onCancel} className="h-10 flex-1 rounded-[8px] border border-white/[0.07] bg-white/[0.025] text-[10px] font-black text-slate-400">انصراف</button>
          <button type="button" disabled={loading} onClick={onConfirm} className="h-10 flex-1 rounded-[8px] border border-red-400/35 bg-red-400/20 text-red-300 text-[10px] font-black">
            {loading ? "در حال انجام..." : "تایید نهایی"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CustomSelect({ value, onChange, options }: { value: string; onChange: (val: string) => void; options: { value: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value) || options[0];
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(!open)} className="flex h-10 w-full items-center justify-between rounded-[8px] border border-white/[0.07] bg-[#0B1224] px-3 text-right text-[11px] font-bold text-slate-300">
        <span>{selected.label}</span>
        <span>⌄</span>
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-full rounded-[9px] border border-white/[0.08] bg-[#0B1224] p-1 shadow-2xl">
          {options.map((o) => (
            <button key={o.value} type="button" onClick={() => { onChange(o.value); setOpen(false); }} className="w-full rounded-[6px] px-3 py-2 text-right text-[11px] font-bold text-slate-300 hover:bg-white/[0.05]">
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, description, icon, accent }: any) {
  const styles: any = {
    cyan: "border-cyan-400/10 bg-cyan-400/[0.035] text-cyan-300",
    amber: "border-amber-400/10 bg-amber-400/[0.035] text-amber-300",
    emerald: "border-emerald-400/10 bg-emerald-400/[0.035] text-emerald-300",
    red: "border-red-400/10 bg-red-400/[0.035] text-red-300",
  };
  return (
    <div className="overflow-hidden rounded-[14px] border border-[rgba(0,229,255,0.09)] bg-[#0A1128] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-black text-slate-600">{label}</div>
          <div className="mt-2 text-2xl font-black text-white">{value}</div>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-[8px] border ${styles[accent]}`}>{icon}</div>
      </div>
      <div className="mt-3 text-[9px] font-bold text-slate-700">{description}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: CommentStatus }) {
  const classes = {
    pending: "border-amber-400/20 bg-amber-400/[0.06] text-amber-300",
    approved: "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400",
    rejected: "border-red-400/20 bg-red-400/[0.06] text-red-300",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[7px] border px-2.5 py-1.5 text-[9px] font-black ${classes[status]}`}>
      <span className="h-1 w-1 rounded-full bg-current" />
      {STATUS_LABELS[status]}
    </span>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[9px] border border-white/[0.05] bg-[#050814]/50 px-3 py-2.5">
      <div className="mb-1 text-[8px] font-black text-slate-700">{label}</div>
      <div className="truncate text-[10px] font-black text-slate-400">{value}</div>
    </div>
  );
}

function LoadingRow() {
  return <tr><td colSpan={6} className="px-6 py-16 text-center text-slate-500 text-[10px]">در حال دریافت اطلاعات...</td></tr>;
}

function EmptyRow() {
  return <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-500 text-[10px]">نظری یافت نشد.</td></tr>;
}

function filteredFeedbacksCount(list: any[]) {
  return list.length;
}