"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../Loading";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/login");
      return;
    }

    if ((session.user as any).role !== "admin") {
      router.replace("/");
    }
  }, [session, isPending, router]);

  if (isPending || !session || (session.user as any).role !== "admin") {
    return (
      <div className="h-screen w-full">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;
