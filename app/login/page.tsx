"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [session, isPending, router]);

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}`,
    });
  };

  return (
    <div className="primary-bg flex min-h-screen flex-col items-center justify-center p-4">
      <div className="z-20 flex w-full max-w-sm flex-col items-center space-y-6">
        <div className="relative h-32 w-32">
          <Image
            src="/images/egret_logo.png"
            alt="EGRET Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="text-center">
          <h1 className="text-primary text-4xl font-bold tracking-tight">
            EGRET
          </h1>
          <p className="text-secondary mt-2 text-xl font-medium drop-shadow-xl">
            Engineering Generated Rapid Exam Table
          </p>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="border-primary w-full border bg-white font-medium text-black shadow-sm"
          onPress={handleGoogleLogin}
        >
          <FcGoogle className="h-6 w-6" />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
