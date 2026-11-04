"use client";

import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      dir="rtl"
      className="admin-panel selection:bg-[rgba(21,101,192,0.22)] selection:text-[#0D47A1]"
    >
      <AdminSidebar open={sidebarOpen} />

      <div
        style={{
          marginRight: sidebarOpen ? 220 : 60,
          transition: "margin-right 0.22s ease",
        }}
      >
        <AdminHeader
          onMenuClick={() =>
            setSidebarOpen((value) => !value)
          }
        />

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}