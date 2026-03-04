"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import Navbar from "@/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <Navbar />
      <main className="flex-1">{children}</main>
    </AuthGuard>
  );
};

export default Layout;
