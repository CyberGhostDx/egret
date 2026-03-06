"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </AuthGuard>
  );
};

export default Layout;
