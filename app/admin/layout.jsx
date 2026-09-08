// import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-200 bg">
      {/* <AdminSidebar /> */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
