// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";/* ─── ICONS ─── */

// const IconGrid = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="3" width="7" height="7" />
//     <rect x="14" y="3" width="7" height="7" />
//     <rect x="14" y="14" width="7" height="7" />
//     <rect x="3" y="14" width="7" height="7" />
//   </svg>
// );

// const IconDoc = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <polyline points="14 2 14 8 20 8" />
//     <line x1="16" y1="13" x2="8" y2="13" />
//     <line x1="16" y1="17" x2="8" y2="17" />
//   </svg>
// );

// const IconWrench = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
//   </svg>
// );


// const IconCase = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M4 7.5A2.5 2.5 0 016.5 5h3l2 2h6A2.5 2.5 0 0120 9.5v8A2.5 2.5 0 0117.5 20h-11A2.5 2.5 0 014 17.5v-10z" />
//     <path d="M8 12h8" />
//     <path d="M8 15.5h5" />
//   </svg>
// );




// const IconSettings = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="3" />
//     <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
//   </svg>
// );

// const IconLogout = () => (
//   <svg
//     width="15"
//     height="15"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
//     <polyline points="16 17 21 12 16 7" />
//     <line x1="21" y1="12" x2="9" y2="12" />
//   </svg>
// );


// /* ─── NAVIGATION ─── */

// const navItems = [
//   {
//     id: "dashboard",
//     label: "پیشخوان فرماندهی",
//     href: "/admin",
//     icon: <IconGrid />,
//   },
//   {
//     id: "blogs",
//     label: "مدیریت پست ها",
//     href: "/admin/blogs",
//     icon: <IconDoc />,
//     badge: "۳",
//   },
//   {
//     id: "services",
//     label: "مدیریت خدمات",
//     href: "/admin/services",
//     icon: <IconWrench />,
//   },
// {
//   id: "user-feedback",
//   label: "بازخورد کاربران",
//   href: "/admin/user-feedback",
// icon: (
//   <span style={{ display: "flex", gap: 1 }}>
//     <LuThumbsUp size={13} />
//     <LuThumbsDown size={13} />
//   </span>
// ),
// },
// {
//   id: "seo",
//   label: "SEO",
//   href: "/admin/seo",
//   icon: <IconWrench />,
// },
// {
//   id: "comments",
//   label: "مدیریت نظرات پست ها",
//   href: "/admin/comments",
//   icon: (
//   <span style={{ display: "flex", gap: 1 }}>
//     <LuThumbsUp size={13} />
//     <LuThumbsDown size={13} />
//   </span>
// ),
// },

// ];


// /* ─── SIDEBAR ─── */

// export default function AdminSidebar({
//   open,
//   onLogout,
// }) {

// const pathname = usePathname();

//   const isActive = (href) => {
//     if (href === "/admin") {
//       return pathname === "/admin";
//     }

//     return pathname === href || pathname.startsWith(`${href}/`);
//   };

//   const [logoutModalOpen, setLogoutModalOpen] = useState(false);




//   return (
//     <aside
//       dir="rtl"
//       style={{
//         width: open ? 220 : 60,
//         flexShrink: 0,
//         background: "#0A1128",
//         borderLeft: "1px solid rgba(0,229,255,0.08)",
//         display: "flex",
//         flexDirection: "column",
//         position: "fixed",
//         top: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 40,
//         transition: "width 0.22s ease",
//         overflow: "hidden",
//       }}
//     >

//       {/* Logo */}

//       <div
//         style={{
//           padding: "18px 14px 14px",
//           borderBottom: "1px solid rgba(0,229,255,0.07)",
//           display: "flex",
//           alignItems: "center",
//           gap: 9,
//           flexShrink: 0,
//         }}
//       >
//         <div
//           style={{
//             width: 30,
//             height: 30,
//             borderRadius: 8,
//             background: "rgba(0,229,255,0.1)",
//             border: "1px solid rgba(0,229,255,0.25)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//           }}
//         >
//           <span
//             style={{
//               width: 7,
//               height: 7,
//               borderRadius: "50%",
//               background: "#00E5FF",
//               boxShadow: "0 0 7px rgba(0,229,255,0.9)",
//               display: "inline-block",
//             }}
//           />
//         </div>

//         {open && (
//           <span
//             style={{
//               color: "#fff",
//               fontWeight: 900,
//               fontSize: "1.05rem",
//               whiteSpace: "nowrap",
//             }}
//           >
//             پاراهور
//           </span>
//         )}
//       </div>


//       {/* Navigation */}

//       <nav
//         style={{
//           flex: 1,
//           padding: "10px 7px",
//         }}
//       >
//         {navItems.map((item) => {
//           const active = isActive(item.href);

//           return (
//             <Link
//               key={item.id}
//               href={item.href}
//               title={!open ? item.label : undefined}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 9,
//                 padding: open ? "9px 11px" : "9px",
//                 borderRadius: 9,
//                 marginBottom: 2,
//                 textDecoration: "none",
//                 background: active
//                   ? "rgba(0,229,255,0.07)"
//                   : "transparent",
//                 borderRight: active
//                   ? "2.5px solid #00E5FF"
//                   : "2.5px solid transparent",
//                 color: active ? "#00E5FF" : "#475569",
//                 justifyContent: open ? "flex-start" : "center",
//                 whiteSpace: "nowrap",
//                 position: "relative",
//                 boxSizing: "border-box",
//                 transition: "all 0.15s ease",
//               }}
//             >
//               <span
//                 style={{
//                   flexShrink: 0,
//                   display: "flex",
//                 }}
//               >
//                 {item.icon}
//               </span>

//               {open && (
//                 <span
//                   style={{
//                     fontSize: "0.8rem",
//                     fontWeight: active ? 600 : 400,
//                     flex: 1,
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                   }}
//                 >
//                   {item.label}
//                 </span>
//               )}

//               {open && item.badge && (
//                 <span
//                   style={{
//                     background: "#EF4444",
//                     color: "#fff",
//                     fontSize: "0.58rem",
//                     fontWeight: 700,
//                     padding: "1px 5px",
//                     borderRadius: 99,
//                   }}
//                 >
//                   {item.badge}
//                 </span>
//               )}
//             </Link>
//           );
//         })}
//       </nav>


//       {/* Logout */}

//       <div
//         style={{
//           padding: "10px 7px",
//           borderTop: "1px solid rgba(0,229,255,0.06)",
//         }}
//       >
//         <button
//   type="button"
//   onClick={() => setLogoutModalOpen(true)}
//           title={!open ? "خروج از سیستم" : undefined}
//           style={{
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             gap: 9,
//             padding: open ? "8px 11px" : "8px",
//             borderRadius: 9,
//             cursor: "pointer",
//             color: "rgba(239,68,68,0.5)",
//             justifyContent: open ? "flex-start" : "center",
//             background: "transparent",
//             border: "none",
//             fontFamily: "inherit",
//           }}
//         >
//           <IconLogout />

//           {open && (
//             <span
//               style={{
//                 fontSize: "0.8rem",
//               }}
//             >
//               خروج از سیستم
//             </span>
//           )}
//         </button>
//       </div>


//     {logoutModalOpen && (
//   <div
//     dir="rtl"
//     style={{
//       position: "fixed",
//       inset: 0,
//       zIndex: 100,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       background: "rgba(2, 8, 23, 0.72)",
//       backdropFilter: "blur(8px)",
//       WebkitBackdropFilter: "blur(8px)",
//       padding: "20px",
//     }}
//     onClick={() => setLogoutModalOpen(false)}
//   >
//     <div
//       onClick={(e) => e.stopPropagation()}
//       style={{
//         width: "100%",
//         maxWidth: 380,
//         background: "#0A1128",
//         border: "1px solid rgba(0,229,255,0.14)",
//         borderRadius: 18,
//         padding: "26px",
//         boxShadow:
//           "0 20px 60px rgba(0,0,0,0.45), 0 0 35px rgba(0,229,255,0.06)",
//       }}
//     >
//       {/* Icon */}
//       <div
//         style={{
//           width: 52,
//           height: 52,
//           margin: "0 auto 18px",
//           borderRadius: 14,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "rgba(239,68,68,0.08)",
//           border: "1px solid rgba(239,68,68,0.18)",
//           color: "#EF4444",
//         }}
//       >
//         <IconLogout />
//       </div>

//       {/* Title */}
//       <h3
//         style={{
//           margin: 0,
//           textAlign: "center",
//           color: "#F8FAFC",
//           fontSize: "1rem",
//           fontWeight: 800,
//         }}
//       >
//         خروج از سیستم
//       </h3>

//       {/* Description */}
//       <p
//         style={{
//           margin: "10px 0 24px",
//           textAlign: "center",
//           color: "#64748B",
//           fontSize: "0.82rem",
//           lineHeight: 1.8,
//         }}
//       >
//         آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
//       </p>

//       {/* Buttons */}
//       <div
//         style={{
//           display: "flex",
//           gap: 10,
//         }}
//       >
//         <button
//           type="button"
//           onClick={async () => {
//             try {
//               const res = await fetch("/api/admin/logout", {
//                 method: "POST",
//               });

//               if (!res.ok) {
//                 throw new Error("Logout failed");
//               }

//               window.location.href = "/admin-login";
//             } catch (error) {
//               console.error("Logout error:", error);
//             }
//           }}
//           style={{
//             flex: 1,
//             height: 42,
//             border: "1px solid rgba(239,68,68,0.35)",
//             borderRadius: 10,
//             background: "rgba(239,68,68,0.1)",
//             color: "#EF4444",
//             fontFamily: "inherit",
//             fontSize: "0.78rem",
//             fontWeight: 700,
//             cursor: "pointer",
//             transition: "all 0.2s ease",
//           }}
//         >
//           خروج از حساب
//         </button>

//         <button
//           type="button"
//           onClick={() => setLogoutModalOpen(false)}
//           style={{
//             flex: 1,
//             height: 42,
//             border: "1px solid rgba(148,163,184,0.14)",
//             borderRadius: 10,
//             background: "rgba(255,255,255,0.035)",
//             color: "#94A3B8",
//             fontFamily: "inherit",
//             fontSize: "0.78rem",
//             fontWeight: 600,
//             cursor: "pointer",
//             transition: "all 0.2s ease",
//           }}
//         >
//           انصراف
//         </button>
//       </div>
//     </div>
//   </div>
// )}

// </aside>
    
//   );
// }



"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";/* ─── ICONS ─── */

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


const IconCase = () => (
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
    <path d="M4 7.5A2.5 2.5 0 016.5 5h3l2 2h6A2.5 2.5 0 0120 9.5v8A2.5 2.5 0 0117.5 20h-11A2.5 2.5 0 014 17.5v-10z" />
    <path d="M8 12h8" />
    <path d="M8 15.5h5" />
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
    id: "blogs",
    label: "مدیریت پست ها",
    href: "/admin/blogs",
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
  id: "user-feedback",
  label: "بازخورد کاربران",
  href: "/admin/user-feedback",
icon: (
  <span style={{ display: "flex", gap: 1 }}>
    <LuThumbsUp size={13} />
    <LuThumbsDown size={13} />
  </span>
),
},
{
  id: "seo",
  label: "SEO",
  href: "/admin/seo",
  icon: <IconWrench />,
},
{
  id: "comments",
  label: "مدیریت نظرات پست ها",
  href: "/admin/comments",
  icon: (
  <span style={{ display: "flex", gap: 1 }}>
    <LuThumbsUp size={13} />
    <LuThumbsDown size={13} />
  </span>
),
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

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);




  return (
    <aside
      dir="rtl"
      style={{
        width: open ? 220 : 60,
        flexShrink: 0,
        background: "#FFFFFF",
        borderLeft: "1px solid rgba(21,101,192,0.15)",
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
          borderBottom: "1px solid rgba(30,58,138,0.1)",
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
            background: "rgba(21,101,192,0.075)",
            border: "1px solid rgba(21,101,192,0.18)",
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
              background: "#1565C0",
              boxShadow: "0 0 7px rgba(21,101,192,0.9)",
              display: "inline-block",
            }}
          />
        </div>

        {open && (
          <span
            style={{
              color: "#0F172A",
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
                  ? "rgba(21,101,192,0.114)"
                  : "transparent",
                borderRight: active
                  ? "2.5px solid #1565C0"
                  : "2.5px solid transparent",
                color: active ? "#1565C0" : "#475569",
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
          borderTop: "1px solid rgba(30,58,138,0.1)",
        }}
      >
        <button
  type="button"
  onClick={() => setLogoutModalOpen(true)}
          title={!open ? "خروج از سیستم" : undefined}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: open ? "8px 11px" : "8px",
            borderRadius: 9,
            cursor: "pointer",
            color: "rgba(220,38,38,0.7)",
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


    {logoutModalOpen && (
  <div
    dir="rtl"
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(15, 23, 42, 0.39)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      padding: "20px",
    }}
    onClick={() => setLogoutModalOpen(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: 380,
        background: "#F6F9FD",
        border: "1px solid rgba(30,58,138,0.16)",
        borderRadius: 18,
        padding: "26px",
        boxShadow:
          "0 20px 60px rgba(15,23,42,0.18), 0 0 35px rgba(21,101,192,0.06)",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          margin: "0 auto 18px",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(239,68,68,0.075)",
          border: "1px solid rgba(239,68,68,0.255)",
          color: "#B91C1C",
        }}
      >
        <IconLogout />
      </div>

      {/* Title */}
      <h3
        style={{
          margin: 0,
          textAlign: "center",
          color: "#0F172A",
          fontSize: "1rem",
          fontWeight: 800,
        }}
      >
        خروج از سیستم
      </h3>

      {/* Description */}
      <p
        style={{
          margin: "10px 0 24px",
          textAlign: "center",
          color: "#334155",
          fontSize: "0.82rem",
          lineHeight: 1.8,
        }}
      >
        آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
      </p>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <button
          type="button"
          onClick={async () => {
            try {
              const res = await fetch("/api/admin/logout", {
                method: "POST",
              });

              if (!res.ok) {
                throw new Error("Logout failed");
              }

              window.location.href = "/admin-login";
            } catch (error) {
              console.error("Logout error:", error);
            }
          }}
          style={{
            flex: 1,
            height: 42,
            border: "1px solid rgba(239,68,68,0.33)",
            borderRadius: 10,
            background: "rgba(239,68,68,0.114)",
            color: "#B91C1C",
            fontFamily: "inherit",
            fontSize: "0.78rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          خروج از حساب
        </button>

        <button
          type="button"
          onClick={() => setLogoutModalOpen(false)}
          style={{
            flex: 1,
            height: 42,
            border: "1px solid rgba(30,58,138,0.14)",
            borderRadius: 10,
            background: "rgba(30,58,138,0.054)",
            color: "#334155",
            fontFamily: "inherit",
            fontSize: "0.78rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          انصراف
        </button>
      </div>
    </div>
  </div>
)}

</aside>
    
  );
}