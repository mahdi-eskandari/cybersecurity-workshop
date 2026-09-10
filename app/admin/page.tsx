"use client";

import { useEffect, useMemo, useState } from "react";

/* ─── ICONS ─── */

const IconSiren = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M19.07 4.93l-1.41 1.41M22 12h-2" />
    <path d="M6 16c0-3.31 2.69-6 6-6s6 2.69 6 6" />
    <rect x="4" y="16" width="16" height="4" rx="1" />
  </svg>
);

const IconShieldActive = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IconCalendar = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconCheckCircle = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

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

const IconFilter = () => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const IconTrendUp = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

/* ─── TYPES ─── */

type StatusKey =
  | "emergency"
  | "reviewing"
  | "consulting"
  | "resolved"
  | "new";

interface Report {
  _id: string;
  trackingCode: string;
  incidentType: string;
  description: string;
  contact: string;
  status: string;
  createdAt: string;
}

interface StatusConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
}

/* ─── STATUS CONFIG ─── */

const statusConfig: Record<StatusKey, StatusConfig> = {
  emergency: {
    label: "اورژانسی / جدید",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(107, 41, 41, 0.28)",
  },

  reviewing: {
    label: "در حال بررسی",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.28)",
  },

  consulting: {
    label: "ارجاع به مشاوره",
    color: "#00E5FF",
    bg: "rgba(0,229,255,0.08)",
    border: "rgba(0,229,255,0.28)",
  },

  resolved: {
    label: "مختومه",
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.28)",
  },

  new: {
    label: "جدید",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.28)",
  },
};

/* ─── INCIDENT TYPES ─── */

const incidentTypes: Record<
  string,
  {
    label: string;
    color: string;
  }
> = {
  crypto: {
    label: "سرقت کریپتو",
    color: "#00E5FF",
  },

  hack: {
    label: "هک و نفوذ",
    color: "#A78BFA",
  },

  extort: {
    label: "اخاذی / باج‌افزار",
    color: "#EF4444",
  },

  consult: {
    label: "درخواست مشاوره",
    color: "#F59E0B",
  },

  phish: {
    label: "فیشینگ",
    color: "#F97316",
  },

  identity: {
    label: "سرقت هویت",
    color: "#EC4899",
  },
};

/* ─── STATUS MAP ─── */

const statusMap: Record<string, StatusKey> = {
  pending: "new",
  reviewing: "reviewing",
  consulting: "consulting",
  resolved: "resolved",
  emergency: "emergency",
  new: "new",
};

/* ─── DATE FORMATTER ─── */

const formatRelativeDate = (date: string) => {
  const created = new Date(date);

  if (Number.isNaN(created.getTime())) {
    return "-";
  }

  const now = new Date();

  const diffMs = now.getTime() - created.getTime();

  const diffMinutes = Math.floor(
    diffMs / (1000 * 60)
  );

  const diffHours = Math.floor(
    diffMs / (1000 * 60 * 60)
  );

  const diffDays = Math.floor(
    diffMs / (1000 * 60 * 60 * 24)
  );

  const time = created.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  if (diffMinutes < 1) {
    return "همین الان";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes.toLocaleString(
      "fa-IR"
    )} دقیقه پیش`;
  }

  if (diffHours < 24) {
    return `${diffHours.toLocaleString(
      "fa-IR"
    )} ساعت پیش`;
  }

  if (diffDays === 1) {
    return `دیروز، ${time}`;
  }

  if (diffDays < 7) {
    return `${diffDays.toLocaleString(
      "fa-IR"
    )} روز پیش`;
  }

  return created.toLocaleDateString("fa-IR");
};

/* ─── SPARKLINE ─── */

const Sparkline = ({
  color,
  points,
}: {
  color: string;
  points: number[];
}) => {
  const max = Math.max(...points);
  const min = Math.min(...points);

  const w = 64;
  const h = 28;

  const coords = points.map((p, i) => {
    const x =
      (i / (points.length - 1)) * w;

    const y =
      h -
      ((p - min) / (max - min || 1)) *
        (h - 4) -
      2;

    return `${x},${y}`;
  });

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
    >
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />

      <polyline
        points={`0,${h} ${coords.join(
          " "
        )} ${w},${h}`}
        fill={color}
        fillOpacity="0.08"
        stroke="none"
      />
    </svg>
  );
};



















/* ─── MAIN COMPONENT ─── */

export default function App() {
  const [hoveredRow, setHoveredRow] =
    useState<string | null>(null);

  const [filterStatus, setFilterStatus] =
    useState<string>("all");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [reports, setReports] =
    useState<Report[]>([]);

const [selectedReport, setSelectedReport] =
  useState<Report | null>(null);  /* ─── FETCH REPORTS ─── */

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "/api/crisis-reports",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error(
            "خطا در دریافت پرونده‌ها"
          );
        }

        const data = await res.json();

        console.log("API DATA:", data);

        setReports(
          Array.isArray(data.reports)
            ? data.reports
            : []
        );
      } catch (err) {
        console.error(
          "Fetch crisis reports error:",
          err
        );

        setError(
          "دریافت پرونده‌ها با خطا مواجه شد."
        );

        setReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  /* ─── FILTERED DATA ─── */

  const filteredData = useMemo(() => {
    if (filterStatus === "all") {
      return reports;
    }

    return reports.filter((report) => {
      const currentStatus =
        statusMap[report.status] || "new";

      return (
        currentStatus === filterStatus
      );
    });
  }, [reports, filterStatus]);

  /* ─── STATS ─── */

  const stats = useMemo(() => {
    const unresolved = reports.filter(
      (report) =>
        report.status === "pending" ||
        report.status === "new" ||
        report.status === "emergency"
    ).length;

    const inProgress = reports.filter(
      (report) =>
        report.status === "reviewing" ||
        report.status === "consulting"
    ).length;

const consultations = reports.filter(
  (report) =>
    report.status === "consulting"
).length;

    const resolved = reports.filter(
      (report) =>
        report.status === "resolved"
    ).length;

    return {
      unresolved,
      inProgress,
      consultations,
      resolved,
    };
  }, [reports]);

  /* ─── STAT CARDS ─── */

  const statCards = [
    {
      title: "درخواست‌های بررسی‌نشده",
      value: stats.unresolved.toLocaleString(
        "fa-IR"
      ),
      icon: <IconSiren />,
      iconBg: "rgba(239,68,68,0.12)",
      iconColor: "#EF4444",
      iconBorder:
        "rgba(239,68,68,0.25)",
      trend: `${stats.unresolved.toLocaleString(
        "fa-IR"
      )} مورد`,
      trendColor: "#EF4444",
      glow: "rgba(239,68,68,0.08)",
      points: [1, 2, 2, 3, 3, 4, stats.unresolved],
    },

    {
      title: "پرونده‌های در جریان",
      value: stats.inProgress.toLocaleString(
        "fa-IR"
      ),
      icon: <IconShieldActive />,
      iconBg:
        "rgba(0,229,255,0.1)",
      iconColor: "#00E5FF",
      iconBorder:
        "rgba(0,229,255,0.22)",
      trend: `${stats.inProgress.toLocaleString(
        "fa-IR"
      )} فعال`,
      trendColor: "#00E5FF",
      glow:
        "rgba(0,229,255,0.06)",
      points: [1, 2, 3, 3, 4, 4, stats.inProgress],
    },

    {
      title: "جلسات مشاوره رزرو شده",
      value:
        stats.consultations.toLocaleString(
          "fa-IR"
        ),
      icon: <IconCalendar />,
      iconBg:
        "rgba(245,158,11,0.1)",
      iconColor: "#F59E0B",
      iconBorder:
        "rgba(245,158,11,0.22)",
      trend: `${stats.consultations.toLocaleString(
        "fa-IR"
      )} درخواست`,
      trendColor: "#F59E0B",
      glow:
        "rgba(245,158,11,0.06)",
      points: [1, 1, 2, 2, 3, 3, stats.consultations],
    },

    {
      title: "پرونده‌های مختومه (موفق)",
      value: stats.resolved.toLocaleString(
        "fa-IR"
      ),
      icon: <IconCheckCircle />,
      iconBg:
        "rgba(16,185,129,0.1)",
      iconColor: "#10B981",
      iconBorder:
        "rgba(16,185,129,0.22)",
      trend: `${stats.resolved.toLocaleString(
        "fa-IR"
      )} مختومه`,
      trendColor: "#10B981",
      glow:
        "rgba(16,185,129,0.06)",
      points: [1, 2, 3, 4, 5, 6, stats.resolved],
    },
  ];





const statusOrder: Record<string, string> = {
  new: "reviewing",
  reviewing: "consulting",
  consulting: "resolved",
};

const statusApiMap: Record<string, string> = {
  new: "pending",
  reviewing: "reviewing",
  consulting: "consulting",
  resolved: "resolved",
};

const updateReportStatus = async (report: Report) => {
  const currentStatus =
    statusMap[report.status] || "new";

  const nextStatus =
    statusOrder[currentStatus];

  if (!nextStatus) return;

  try {
    const response = await fetch(
      "/api/crisis-reports",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: report._id,
          status: statusApiMap[nextStatus],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "خطا در بروزرسانی وضعیت"
      );
    }

    setReports((prev) =>
      prev.map((item) =>
        item._id === report._id
          ? {
              ...item,
              status: data.report.status,
            }
          : item
      )
    );

    if (
      selectedReport?._id ===
      report._id
    ) {
      setSelectedReport((prev) =>
        prev
          ? {
              ...prev,
              status: data.report.status,
            }
          : null
      );
    }
  } catch (error) {
    console.error(
      "Update report status error:",
      error
    );
  }
};









  return (












    
    <div
      style={{
        background: "#050814",
        minHeight: "100vh",
        width: "100%",
        fontFamily:
          "Vazirmatn, sans-serif",
        color: "#E2E8F0",
        boxSizing: "border-box",
      }}
    >
      {/* Admin pages should not be indexed */}
      <meta
        name="robots"
        content="noindex, nofollow, noarchive"
      />

      <main
        style={{
          width: "100%",
          minHeight: "100vh",
          padding: "28px 24px",
          boxSizing: "border-box",
        }}
      >
        {/* ─── PAGE TITLE ─── */}

        <div
          style={{
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background:
                  "#00E5FF",
                display:
                  "inline-block",
                boxShadow:
                  "0 0 7px rgba(0,229,255,0.9)",
              }}
            />

            <span
              style={{
                fontFamily:
                  "monospace",
                fontSize:
                  "0.6rem",
                color:
                  "rgba(0,229,255,0.5)",
                letterSpacing:
                  "0.18em",
              }}
            >
              SOC // LIVE
            </span>

            <span
              style={{
                width: 4,
                height: 4,
                borderRadius:
                  "50%",
                background:
                  "#10B981",
                display:
                  "inline-block",
                boxShadow:
                  "0 0 5px rgba(16,185,129,0.9)",
                animation:
                  "soc-pulse 1.8s ease-in-out infinite",
              }}
            />
          </div>

          <h1
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize:
                "1.35rem",
              margin: 0,
            }}
          >
            پیشخوان فرماندهی
          </h1>
        </div>

        {/* ─── STAT CARDS ─── */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {statCards.map(
            (card) => (
              <div
                key={
                  card.title
                }
                style={{
                  background:
                    "#0A1128",
                  border:
                    "1px solid rgba(255,255,255,0.05)",
                  borderRadius:
                    14,
                  padding:
                    "18px 18px 16px",
                  position:
                    "relative",
                  overflow:
                    "hidden",
                  boxShadow: `0 0 40px ${card.glow}`,
                  transition:
                    "border-color 0.2s, transform 0.2s",
                  cursor:
                    "default",
                }}
                onMouseEnter={(
                  e
                ) => {
                  (
                    e.currentTarget as HTMLElement
                  ).style.borderColor =
                    card.iconBorder;

                  (
                    e.currentTarget as HTMLElement
                  ).style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(
                  e
                ) => {
                  (
                    e.currentTarget as HTMLElement
                  ).style.borderColor =
                    "rgba(255,255,255,0.05)";

                  (
                    e.currentTarget as HTMLElement
                  ).style.transform =
                    "none";
                }}
              >
                <div
                  style={{
                    position:
                      "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${card.iconColor}66, transparent)`,
                  }}
                />

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "flex-start",
                    justifyContent:
                      "space-between",
                    marginBottom:
                      14,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        color:
                          "#475569",
                        fontSize:
                          "0.76rem",
                        lineHeight:
                          1.5,
                        marginBottom:
                          8,
                        marginTop:
                          0,
                      }}
                    >
                      {
                        card.title
                      }
                    </p>

                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "baseline",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          color:
                            "#fff",
                          fontWeight:
                            900,
                          fontSize:
                            "2rem",
                          lineHeight:
                            1,
                          letterSpacing:
                            "-0.02em",
                        }}
                      >
                        {
                          card.value
                        }
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius:
                        10,
                      background:
                        card.iconBg,
                      border: `1px solid ${card.iconBorder}`,
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      color:
                        card.iconColor,
                      flexShrink: 0,
                    }}
                  >
                    {
                      card.icon
                    }
                  </div>
                </div>

                <div
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        color:
                          card.trendColor,
                      }}
                    >
                      <IconTrendUp />
                    </span>

                    <span
                      style={{
                        color:
                          card.trendColor,
                        fontSize:
                          "0.7rem",
                        fontFamily:
                          "monospace",
                      }}
                    >
                      {
                        card.trend
                      }
                    </span>
                  </div>

                  <Sparkline
                    color={
                      card.iconColor
                    }
                    points={
                      card.points
                    }
                  />
                </div>
              </div>
            )
          )}
        </div>

        {/* ─── DATA TABLE ─── */}

        <div
          style={{
            background:
              "#0A1128",
            border:
              "1px solid rgba(0,229,255,0.08)",
            borderRadius: 16,
            overflow:
              "hidden",
          }}
        >
          {/* Table header */}

          <div
            style={{
              padding:
                "18px 22px",
              borderBottom:
                "1px solid rgba(0,229,255,0.07)",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
              gap: 12,
            }}
          >
            <div>
              <h2
                style={{
                  color:
                    "#fff",
                  fontWeight:
                    700,
                  fontSize:
                    "0.95rem",
                  marginBottom:
                    2,
                  marginTop:
                    0,
                }}
              >
                آخرین گزارش‌های بحران و درخواست‌ها
              </h2>

              <p
                style={{
                  color:
                    "#334155",
                  fontSize:
                    "0.68rem",
                  fontFamily:
                    "monospace",
                  margin: 0,
                }}
              >
                {filteredData.length.toLocaleString(
                  "fa-IR"
                )}{" "}
                پرونده نمایش داده می‌شود
              </p>
            </div>

            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: 8,
              }}
            >
              {/* Filter pills */}

              {[
                {
                  key: "all",
                  label: "همه",
                },
                {
                  key: "emergency",
                  label: "اورژانسی",
                },
                {
                  key: "reviewing",
                  label: "در بررسی",
                },
                {
                  key: "consulting",
                  label: "مشاوره",
                },
                {
                  key: "resolved",
                  label: "مختومه",
                },
              ].map(
                ({
                  key,
                  label,
                }) => (
                  <button
                    key={
                      key
                    }
                    type="button"
                    onClick={() =>
                      setFilterStatus(
                        key
                      )
                    }
                    style={{
                      padding:
                        "4px 10px",
                      borderRadius:
                        6,
                      fontSize:
                        "0.72rem",
                      cursor:
                        "pointer",
                      background:
                        filterStatus ===
                        key
                          ? "rgba(0,229,255,0.1)"
                          : "rgba(255,255,255,0.03)",
                      border:
                        filterStatus ===
                        key
                          ? "1px solid rgba(0,229,255,0.35)"
                          : "1px solid rgba(255,255,255,0.06)",
                      color:
                        filterStatus ===
                        key
                          ? "#00E5FF"
                          : "#475569",
                      fontFamily:
                        "Vazirmatn,sans-serif",
                      transition:
                        "all 0.15s",
                    }}
                  >
                    {
                      label
                    }
                  </button>
                )
              )}

              <button
                type="button"
                style={{
                  display:
                    "flex",
                  alignItems:
                    "center",
                  gap: 5,
                  padding:
                    "5px 10px",
                  borderRadius:
                    8,
                  background:
                    "rgba(255,255,255,0.03)",
                  border:
                    "1px solid rgba(255,255,255,0.07)",
                  color:
                    "#475569",
                  cursor:
                    "pointer",
                  fontSize:
                    "0.72rem",
                  fontFamily:
                    "Vazirmatn,sans-serif",
                }}
              >
                <IconFilter />
                فیلتر
              </button>
            </div>
          </div>

          {/* Table */}

          <div
            style={{
              overflowX:
                "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse:
                  "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom:
                      "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {[
                    "شناسه پرونده",
                    "نام / شناسه تماس",
                    "نوع حادثه",
                    "تاریخ ثبت",
                    "وضعیت",
                    "عملیات",
                  ].map(
                    (col) => (
                      <th
                        key={
                          col
                        }
                        style={{
                          padding:
                            "11px 20px",
                          textAlign:
                            "right",
                          color:
                            "#334155",
                          fontSize:
                            "0.7rem",
                          fontWeight:
                            600,
                          fontFamily:
                            "monospace",
                          letterSpacing:
                            "0.05em",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          col
                        }
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={
                        6
                      }
                      style={{
                        padding:
                          "40px 20px",
                        textAlign:
                          "center",
                        color:
                          "#475569",
                        fontSize:
                          "0.8rem",
                      }}
                    >
                      در حال دریافت پرونده‌ها...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={
                        6
                      }
                      style={{
                        padding:
                          "40px 20px",
                        textAlign:
                          "center",
                        color:
                          "#EF4444",
                        fontSize:
                          "0.8rem",
                      }}
                    >
                      {
                        error
                      }
                    </td>
                  </tr>
                ) : filteredData.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan={
                        6
                      }
                      style={{
                        padding:
                          "40px 20px",
                        textAlign:
                          "center",
                        color:
                          "#475569",
                        fontSize:
                          "0.8rem",
                      }}
                    >
                      پرونده‌ای برای نمایش وجود ندارد.
                    </td>
                  </tr>
                ) : (
                  filteredData.map(
                    (row) => {
                      const currentStatus =
                        statusMap[
                          row.status
                        ] ||
                        "new";

                      const status =
                        statusConfig[
                          currentStatus
                        ];

                      const incident =
                        incidentTypes[
                          row.incidentType
                        ];

                      const isHovered =
                        hoveredRow ===
                        row.trackingCode;

                      return (
                        <tr
                          key={
                            row._id
                          }
                          onMouseEnter={() =>
                            setHoveredRow(
                              row.trackingCode
                            )
                          }
                          onMouseLeave={() =>
                            setHoveredRow(
                              null
                            )
                          }
                          style={{
                            borderBottom:
                              "1px solid rgba(255,255,255,0.03)",
                            background:
                              isHovered
                                ? "rgba(0,229,255,0.035)"
                                : "transparent",
                            transition:
                              "background 0.15s",
                            cursor:
                              "default",
                          }}
                        >
                          {/* Case ID */}

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <span
                              style={{
                                fontFamily:
                                  "monospace",
                                fontSize:
                                  "0.78rem",
                                color:
                                  "#00E5FF",
                                fontWeight:
                                  600,
                                letterSpacing:
                                  "0.06em",
                              }}
                            >
                              {
                                row.trackingCode
                              }
                            </span>
                          </td>

                          {/* Contact */}

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <span
                              style={{
                                fontSize:
                                  "0.82rem",
                                color:
                                  "#94A3B8",
                                fontFamily:
                                  "monospace",
                              }}
                            >
                              {
                                row.contact
                              }
                            </span>
                          </td>

                          {/* Incident type */}

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <div
                              style={{
                                display:
                                  "flex",
                                alignItems:
                                  "center",
                                gap: 6,
                              }}
                            >
                              <span
                                style={{
                                  width: 5,
                                  height: 5,
                                  borderRadius:
                                    "50%",
                                  background:
                                    incident?.color ||
                                    "#64748B",
                                  display:
                                    "inline-block",
                                  boxShadow: `0 0 5px ${
                                    incident?.color ||
                                    "#64748B"
                                  }88`,
                                }}
                              />

                              <span
                                style={{
                                  fontSize:
                                    "0.8rem",
                                  color:
                                    "#CBD5E1",
                                }}
                              >
                                {
                                  incident?.label ||
                                  row.incidentType
                                }
                              </span>
                            </div>
                          </td>

                          {/* Date */}

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            <span
                              style={{
                                fontSize:
                                  "0.76rem",
                                color:
                                  "#475569",
                                fontFamily:
                                  "monospace",
                              }}
                            >
                              {formatRelativeDate(
                                row.createdAt
                              )}
                            </span>
                          </td>

                          {/* Status */}

{/* Status */}

<td
  style={{
    padding: "13px 20px",
    whiteSpace: "nowrap",
  }}
>
  <button
    type="button"
    onClick={() =>
      updateReportStatus(row)
    }
    disabled={
      currentStatus === "resolved"
    }
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "3px 10px",
      borderRadius: 99,
      fontSize: "0.7rem",
      fontWeight: 600,
      background: status.bg,
      border: `1px solid ${status.border}`,
      color: status.color,
      cursor:
        currentStatus === "resolved"
          ? "default"
          : "pointer",
      fontFamily:
        "Vazirmatn,sans-serif",
      opacity:
        currentStatus === "resolved"
          ? 0.7
          : 1,
      transition: "all 0.15s",
    }}
  >
    <span
      style={{
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: status.color,
        display: "inline-block",
      }}
    />

    {status.label}
  </button>
</td>

                          {/* Action */}

                          <td
                            style={{
                              padding:
                                "13px 20px",
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                           <button
  type="button"
  onClick={() => setSelectedReport(row)}
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "5px 12px",
    borderRadius: 7,
    fontSize: "0.74rem",
    fontWeight: 600,
    background: isHovered
      ? "rgba(0,229,255,0.12)"
      : "rgba(0,229,255,0.06)",
    border: "1px solid rgba(0,229,255,0.28)",
    color: "#00E5FF",
    cursor: "pointer",
    fontFamily: "Vazirmatn,sans-serif",
    transition: "all 0.15s",
  }}
>
  <IconEye />
  مشاهده پرونده
</button>
                          </td>
                        </tr>
                      );
                    }

































                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}

          <div
            style={{
              padding:
                "12px 22px",
              borderTop:
                "1px solid rgba(255,255,255,0.04)",
              display:
                "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
            }}
          >
            <span
              style={{
                color:
                  "#515f76",
                fontSize:
                  "0.68rem",
                fontFamily:
                  "monospace",
              }}
            >
              نمایش{" "}
              {filteredData.length.toLocaleString(
                "fa-IR"
              )}{" "}
              از{" "}
              {reports.length.toLocaleString(
                "fa-IR"
              )}{" "}
              پرونده
            </span>

            <div
              style={{
                display:
                  "flex",
                gap: 6,
              }}
            >
              {[
                "←",
                "۱",
                "۲",
                "۳",
                "→",
              ].map(
                (p, i) => (
                  <button
                    key={
                      i
                    }
                    type="button"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius:
                        6,
                      fontSize:
                        "0.72rem",
                      cursor:
                        "pointer",
                      background:
                        p === "۱"
                          ? "rgba(0,229,255,0.1)"
                          : "rgba(255,255,255,0.03)",
                      border:
                        p === "۱"
                          ? "1px solid rgba(0,229,255,0.3)"
                          : "1px solid rgba(255,255,255,0.06)",
                      color:
                        p === "۱"
                          ? "#00E5FF"
                          : "#334155",
                      fontFamily:
                        "Vazirmatn,sans-serif",
                    }}
                  >
                    {
                      p
                    }
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ─── KEYFRAMES ─── */}

      <style>{`
        @keyframes soc-pulse {
          0%,100% {
            opacity: 1;
            box-shadow: 0 0 5px rgba(16,185,129,0.9);
          }

          50% {
            opacity: 0.5;
            box-shadow: 0 0 2px rgba(16,185,129,0.4);
          }
        }
      `}</style>




{selectedReport && (
  <div
    onClick={() => setSelectedReport(null)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 1000,
      background: "rgba(0,0,0,0.72)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: 680,
        maxHeight: "85vh",
        overflowY: "auto",
        background: "#0A1128",
        border: "1px solid rgba(0,229,255,0.16)",
        borderRadius: 16,
        boxShadow:
          "0 0 60px rgba(0,229,255,0.08), 0 25px 80px rgba(0,0,0,0.5)",
        position: "relative",
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(0,229,255,0.7), transparent)",
        }}
      />

      {/* Header */}
      <div
        style={{
          padding: "20px 22px",
          borderBottom: "1px solid rgba(0,229,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              marginBottom: 5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00E5FF",
                boxShadow: "0 0 7px rgba(0,229,255,0.9)",
              }}
            />

            <span
              style={{
                color: "rgba(0,229,255,0.55)",
                fontSize: "0.6rem",
                fontFamily: "monospace",
                letterSpacing: "0.12em",
              }}
            >
              CASE // DETAILS
            </span>
          </div>

          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 800,
            }}
          >
            جزئیات پرونده
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setSelectedReport(null)}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.03)",
            color: "#64748B",
            cursor: "pointer",
            fontSize: "1.1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: 22 }}>
        {/* Tracking Code */}
        <div
          style={{
            background: "rgba(0,229,255,0.035)",
            border: "1px solid rgba(0,229,255,0.09)",
            borderRadius: 10,
            padding: "13px 15px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              color: "#475569",
              fontSize: "0.65rem",
              marginBottom: 5,
            }}
          >
            شناسه پرونده
          </div>

          <div
            style={{
              color: "#00E5FF",
              fontSize: "0.85rem",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.06em",
            }}
          >
            {selectedReport.trackingCode}
          </div>
        </div>

        {/* Info Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 10,
            marginBottom: 12,
          }}
        >
          {/* Contact */}
          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10,
              padding: "13px 15px",
            }}
          >
            <div
              style={{
                color: "#475569",
                fontSize: "0.65rem",
                marginBottom: 6,
              }}
            >
              اطلاعات تماس
            </div>

            <div
              style={{
                color: "#CBD5E1",
                fontSize: "0.8rem",
                fontFamily: "monospace",
                wordBreak: "break-word",
              }}
            >
              {selectedReport.contact}
            </div>
          </div>

          {/* Incident */}
          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10,
              padding: "13px 15px",
            }}
          >
            <div
              style={{
                color: "#475569",
                fontSize: "0.65rem",
                marginBottom: 6,
              }}
            >
              نوع حادثه
            </div>

            <div
              style={{
                color: "#CBD5E1",
                fontSize: "0.8rem",
              }}
            >
              {incidentTypes[
                selectedReport.incidentType as keyof typeof incidentTypes
              ]?.label || selectedReport.incidentType}
            </div>
          </div>

          {/* Status */}
          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10,
              padding: "13px 15px",
            }}
          >
            <div
              style={{
                color: "#475569",
                fontSize: "0.65rem",
                marginBottom: 6,
              }}
            >
              وضعیت پرونده
            </div>

{(() => {
  const currentStatus =
    statusMap[selectedReport.status] || "new";

  const status =
    statusConfig[currentStatus];

  return (
    <button
      type="button"
      onClick={() =>
        updateReportStatus(selectedReport)
      }
      disabled={currentStatus === "resolved"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "5px 11px",
        borderRadius: 99,
        fontSize: "0.7rem",
        fontWeight: 600,
        background: status.bg,
        border: `1px solid ${status.border}`,
        color: status.color,
        cursor:
          currentStatus === "resolved"
            ? "default"
            : "pointer",
        fontFamily:
          "Vazirmatn,sans-serif",
        transition: "all 0.15s",
        opacity:
          currentStatus === "resolved"
            ? 0.7
            : 1,
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: status.color,
          display: "inline-block",
        }}
      />

      {status.label}
    </button>
  );
})()}
          </div>

          {/* Date */}
          <div
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: 10,
              padding: "13px 15px",
            }}
          >
            <div
              style={{
                color: "#475569",
                fontSize: "0.65rem",
                marginBottom: 6,
              }}
            >
              تاریخ ثبت
            </div>

            <div
              style={{
                color: "#CBD5E1",
                fontSize: "0.76rem",
                fontFamily: "monospace",
              }}
            >
              {formatRelativeDate(selectedReport.createdAt)}
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <div
            style={{
              color: "#475569",
              fontSize: "0.65rem",
              marginBottom: 9,
            }}
          >
            شرح مشکل
          </div>

          <div
            style={{
              color: "#94A3B8",
              fontSize: "0.78rem",
              lineHeight: 2,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {selectedReport.description ||
              "شرحی برای این پرونده ثبت نشده است."}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "14px 22px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="button"
          onClick={() => setSelectedReport(null)}
          style={{
            padding: "7px 16px",
            borderRadius: 7,
            background: "rgba(0,229,255,0.06)",
            border: "1px solid rgba(0,229,255,0.22)",
            color: "#00E5FF",
            cursor: "pointer",
            fontSize: "0.72rem",
            fontFamily: "Vazirmatn,sans-serif",
          }}
        >
          بستن
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}