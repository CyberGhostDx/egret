"use client";
import { usePathname } from "next/navigation";
import AdminGuard from "@/components/auth/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.includes("/admin/login")) {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-50/50">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
