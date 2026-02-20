"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { authClient } from "@/lib/auth-client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();
  const fetchUserDashboard = useUserStore((state) => state.fetchUserDashboard);

  useEffect(() => {
    if (!isPending && session) {
      fetchUserDashboard();
    }
  }, [session, isPending, fetchUserDashboard]);

  return (
    <AuthGuard>
      <Navbar />
      <main className="flex-1">{children}</main>
    </AuthGuard>
  );
};

export default Layout;
