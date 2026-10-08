// "use client";

// import { useEffect, useRef, useState } from "react";

// type AdminHeaderProps = {
//   onMenuClick: () => void;
//   title?: string;
// };

// const IconMenu = () => (
//   <svg
//     width="17"
//     height="17"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//   >
//     <line x1="3" y1="12" x2="21" y2="12" />
//     <line x1="3" y1="6" x2="21" y2="6" />
//     <line x1="3" y1="18" x2="21" y2="18" />
//   </svg>
// );

// const IconUser = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.8"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="8" r="3.5" />
//     <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
//   </svg>
// );

// export default function AdminHeader({
//   onMenuClick,
//   title = "پیشخوان فرماندهی",
// }: AdminHeaderProps) {
//   const [username, setUsername] = useState("");
//   const [showProfile, setShowProfile] = useState(false);

//   const profileRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const loadAdmin = async () => {
//       try {
//         const response = await fetch("/api/admin/me", {
//           method: "GET",
//           cache: "no-store",
//         });

//         if (!response.ok) return;

//         const data = await response.json();

//         setUsername(data?.user?.username ?? "");
//       } catch (error) {
//         console.error("Admin profile error:", error);
//       }
//     };

//     void loadAdmin();
//   }, []);

//   useEffect(() => {
//     if (!showProfile) return;

//     const handleOutsideClick = (event: MouseEvent) => {
//       const target = event.target;

//       if (!(target instanceof Node)) return;

//       if (
//         profileRef.current &&
//         !profileRef.current.contains(target)
//       ) {
//         setShowProfile(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [showProfile]);

//   return (
//     <header
//       dir="rtl"
//       style={{
//         position: "sticky",
//         top: 0,
//         zIndex: 30,
//         background: "rgba(10,17,40,0.95)",
//         backdropFilter: "blur(18px)",
//         borderBottom: "1px solid rgba(0,229,255,0.08)",
//         padding: "0 22px",
//         height: 58,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: 14,
//         flexShrink: 0,
//       }}
//     >
//       {/* Right side */}

//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 12,
//           minWidth: 0,
//         }}
//       >
//         <button
//           type="button"
//           onClick={onMenuClick}
//           aria-label="باز و بسته کردن منوی کناری"
//           style={{
//             background: "rgba(255,255,255,0.04)",
//             border: "1px solid rgba(255,255,255,0.07)",
//             borderRadius: 8,
//             padding: "5px 7px",
//             cursor: "pointer",
//             color: "#475569",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//           }}
//         >
//           <IconMenu />
//         </button>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 6,
//             fontSize: "0.78rem",
//             minWidth: 0,
//           }}
//         >
//           <span
//             style={{
//               color: "#1E293B",
//             }}
//           >
//             پاراهور
//           </span>

//           <span
//             style={{
//               color: "#0F172A",
//             }}
//           >
//             /
//           </span>

//           <span
//             style={{
//               color: "#94A3B8",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {title}
//           </span>
//         </div>
//       </div>

//       {/* Left side */}

//       <div
//         ref={profileRef}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 10,
//           flexShrink: 0,
//           position: "relative",
//         }}
//       >
//         {/* Avatar */}

//         <button
//           type="button"
//           aria-label="پروفایل کاربر"
//           onClick={() => setShowProfile((prev) => !prev)}
//           style={{
//             width: 36,
//             height: 36,
//             borderRadius: "50%",
//             background:
//               "linear-gradient(135deg,rgba(0,229,255,0.3),rgba(0,229,255,0.08))",
//             border: "1px solid rgba(0,229,255,0.3)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             color: "#00E5FF",
//             cursor: "pointer",
//             flexShrink: 0,
//           }}
//         >
//           <IconUser />
//         </button>

//         {/* Profile popup */}

//         {showProfile && (
//           <div
//             style={{
//               position: "absolute",
//               top: 44,
//               left: 0,
//               zIndex: 50,
//               minWidth: 170,
//               padding: "12px 14px",
//               borderRadius: 10,
//               border: "1px solid rgba(0,229,255,0.10)",
//               background: "#0B1224",
//               boxShadow: "0 18px 45px rgba(0,0,0,0.45)",
//               direction: "rtl",
//             }}
//           >
//             <div
//               style={{
//                 fontSize: "0.68rem",
//                 fontWeight: 700,
//                 color: "#64748B",
//                 marginBottom: 6,
//               }}
//             >
//               نام کاربری
//             </div>

//             <div
//               style={{
//                 fontSize: "0.78rem",
//                 fontWeight: 800,
//                 color: "#E2E8F0",
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             >
//               {username || "در حال دریافت..."}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }





"use client";

import { useEffect, useRef, useState } from "react";

type AdminHeaderProps = {
  onMenuClick: () => void;
  title?: string;
};

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

const IconUser = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
  </svg>
);

export default function AdminHeader({
  onMenuClick,
  title = "پیشخوان فرماندهی",
}: AdminHeaderProps) {
  const [username, setUsername] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const response = await fetch("/api/admin/me", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) return;

        const data = await response.json();

        setUsername(data?.user?.username ?? "");
      } catch (error) {
        console.error("Admin profile error:", error);
      }
    };

    void loadAdmin();
  }, []);

  useEffect(() => {
    if (!showProfile) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showProfile]);

  return (
    <header
      dir="rtl"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "#FFFFFF",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(21,101,192,0.15)",
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
            background: "rgba(30,58,138,0.054)",
            border: "1px solid rgba(30,58,138,0.14)",
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
              color: "#94A3B8",
            }}
          >
            پاراهور
          </span>

          <span
            style={{
              color: "#CBD5E1",
            }}
          >
            /
          </span>

          <span
            style={{
              color: "#334155",
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
        ref={profileRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
          position: "relative",
        }}
      >
        {/* Avatar */}

        <button
          type="button"
          aria-label="پروفایل کاربر"
          onClick={() => setShowProfile((prev) => !prev)}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,rgba(21,101,192,0.2),rgba(21,101,192,0.07))",
            border: "1px solid rgba(21,101,192,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1565C0",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <IconUser />
        </button>

        {/* Profile popup */}

        {showProfile && (
          <div
            style={{
              position: "absolute",
              top: 44,
              left: 0,
              zIndex: 50,
              minWidth: 170,
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid rgba(30,58,138,0.16)",
              background: "#F6F9FD",
              boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
              direction: "rtl",
            }}
          >
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "#64748B",
                marginBottom: 6,
              }}
            >
              نام کاربری
            </div>

            <div
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#0F172A",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {username || "در حال دریافت..."}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}