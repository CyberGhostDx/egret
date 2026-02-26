"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import Navbar from "@/components/Navbar";
import { Toast } from "@heroui/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <Toast.Provider />
      <Navbar />
      <main className="flex-1">{children}</main>
    </AuthGuard>
  );
};

export default Layout;
