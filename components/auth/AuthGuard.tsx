"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Loading from "../Loading";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session) router.replace("/login");
  }, [session, isPending, pathname, router]);

  if (isPending || !session) {
    return (
      <div className="w-full h-screen">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
