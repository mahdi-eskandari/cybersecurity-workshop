"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── ICONS ─── */

const IconGrid = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const IconDoc = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconWrench = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const IconImage = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const IconSettings = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconLogout = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);


/* ─── NAVIGATION ─── */

const navItems = [
  {
    id: "dashboard",
    label: "پیشخوان فرماندهی",
    href: "/admin",
    icon: <IconGrid />,
  },
  {
    id: "cases",
    label: "مدیریت پرونده‌ها",
    href: "/admin/cases",
    icon: <IconDoc />,
    badge: "۳",
  },
  {
    id: "services",
    label: "مدیریت خدمات",
    href: "/admin/services",
    icon: <IconWrench />,
  },
  {
    id: "media",
    label: "رسانه‌ها",
    href: "/admin/media",
    icon: <IconImage />,
  },

];


/* ─── SIDEBAR ─── */

export default function AdminSidebar({
  open,
  onLogout,
}) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside
      dir="rtl"
      style={{
        width: open ? 220 : 60,
        flexShrink: 0,
        background: "#0A1128",
        borderLeft: "1px solid rgba(0,229,255,0.08)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        transition: "width 0.22s ease",
        overflow: "hidden",
      }}
    >

      {/* Logo */}

      <div
        style={{
          padding: "18px 14px 14px",
          borderBottom: "1px solid rgba(0,229,255,0.07)",
          display: "flex",
          alignItems: "center",
          gap: 9,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: "rgba(0,229,255,0.1)",
            border: "1px solid rgba(0,229,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#00E5FF",
              boxShadow: "0 0 7px rgba(0,229,255,0.9)",
              display: "inline-block",
            }}
          />
        </div>

        {open && (
          <span
            style={{
              color: "#fff",
              fontWeight: 900,
              fontSize: "1.05rem",
              whiteSpace: "nowrap",
            }}
          >
            پاراهور
          </span>
        )}
      </div>


      {/* Navigation */}

      <nav
        style={{
          flex: 1,
          padding: "10px 7px",
        }}
      >
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              title={!open ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: open ? "9px 11px" : "9px",
                borderRadius: 9,
                marginBottom: 2,
                textDecoration: "none",
                background: active
                  ? "rgba(0,229,255,0.07)"
                  : "transparent",
                borderRight: active
                  ? "2.5px solid #00E5FF"
                  : "2.5px solid transparent",
                color: active ? "#00E5FF" : "#475569",
                justifyContent: open ? "flex-start" : "center",
                whiteSpace: "nowrap",
                position: "relative",
                boxSizing: "border-box",
                transition: "all 0.15s ease",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  display: "flex",
                }}
              >
                {item.icon}
              </span>

              {open && (
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: active ? 600 : 400,
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.label}
                </span>
              )}

              {open && item.badge && (
                <span
                  style={{
                    background: "#EF4444",
                    color: "#fff",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    padding: "1px 5px",
                    borderRadius: 99,
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>


      {/* Logout */}

      <div
        style={{
          padding: "10px 7px",
          borderTop: "1px solid rgba(0,229,255,0.06)",
        }}
      >
        <button
          type="button"
          onClick={onLogout}
          title={!open ? "خروج از سیستم" : undefined}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: open ? "8px 11px" : "8px",
            borderRadius: 9,
            cursor: "pointer",
            color: "rgba(239,68,68,0.5)",
            justifyContent: open ? "flex-start" : "center",
            background: "transparent",
            border: "none",
            fontFamily: "inherit",
          }}
        >
          <IconLogout />

          {open && (
            <span
              style={{
                fontSize: "0.8rem",
              }}
            >
              خروج از سیستم
            </span>
          )}
        </button>
      </div>

    </aside>
  );
}