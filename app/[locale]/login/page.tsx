"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { Button } from "@heroui/react";
import { Link, useRouter } from "@/i18n/routing";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const router = useRouter();
  const t = useTranslations("Login");
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
            sizes="128px"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="text-center">
          <h1 className="text-primary text-4xl font-bold tracking-tight">
            {t("Title")}
          </h1>
          <p className="text-secondary mt-2 text-xl font-medium drop-shadow-xl">
            {t("Description")}
          </p>
        </div>

        <div className="flex w-full flex-col items-center space-y-2">
          <Button
            variant="outline"
            size="lg"
            className="border-primary w-full border bg-white font-medium text-black shadow-sm"
            onPress={handleGoogleLogin}
          >
            <FcGoogle className="h-6 w-6" />
            {t("SignInWithGoogle")}
          </Button>
          <div className="flex flex-col items-center gap-1">
            <p className="text-secondary/80 text-xs font-medium">
              {t("PleaseUseKUOnly")}
            </p>
            <p className="text-secondary text-xs">
              {t("AgreeToTerms")}{" "}
              <Link href="/terms" className="text-primary text-xs underline">
                {t("TermsAndConditions")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
