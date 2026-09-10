"use client";

const IconMenu = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconSearch = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);


export default function AdminHeader({
  onMenuClick,
  title = "پیشخوان فرماندهی",
  search = "",
  onSearchChange,
  searchPlaceholder = "جستجو...",
}) {
  return (
    <header
      dir="rtl"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "rgba(10,17,40,0.95)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(0,229,255,0.08)",
        padding: "0 22px",
        height: 58,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        flexShrink: 0,
      }}
    >

      {/* Right side */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          minWidth: 0,
        }}
      >
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="باز و بسته کردن منوی کناری"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 8,
            padding: "5px 7px",
            cursor: "pointer",
            color: "#475569",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IconMenu />
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.78rem",
            minWidth: 0,
          }}
        >
          <span
            style={{
              color: "#1E293B",
            }}
          >
            پاراهور
          </span>

          <span
            style={{
              color: "#0F172A",
            }}
          >
            /
          </span>

          <span
            style={{
              color: "#94A3B8",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>
        </div>
      </div>


      {/* Left side */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >

       {/* Search */}

{/* Search */}
<div
  style={{
    position: "relative",
    width: 224,
    height: 40,
    flexShrink: 0,
  }}
>
  {/* Search icon */}
  <span
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      width: 40,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#29405F",
      pointerEvents: "none",
      zIndex: 2,
    }}
  >
    <IconSearch />
  </span>

  <input
    type="text"
    value={search}
    onChange={(e) => onSearchChange(e.target.value)}
    placeholder={searchPlaceholder}
    aria-label={searchPlaceholder}
    className="admin-search-input"
    style={{
      width: "100%",
      height: "100%",
      boxSizing: "border-box",

      background: "#050A18",
      border: "1px solid #10213A",
      borderRadius: 11,

      padding: "0 42px 0 12px",

      color: "#64748B",
      fontFamily: "Vazirmatn, sans-serif",
      fontSize: 12,
      fontWeight: 400,

      textAlign: "right",
      direction: "rtl",

      outline: "none",
      caretColor: "#00E5FF",

      boxShadow: "inset 0 0 0 1px rgba(0,229,255,0.015)",
    }}
  />
</div>
        

        {/* Avatar */}

        <button
          type="button"
          aria-label="پروفایل کاربر"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,rgba(0,229,255,0.3),rgba(0,229,255,0.08))",
            border: "1px solid rgba(0,229,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.65rem",
            color: "#00E5FF",
            fontWeight: 700,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          A
        </button>

      </div>

    </header>
  );
}