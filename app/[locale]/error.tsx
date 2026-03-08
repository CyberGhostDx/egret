"use client";

import { useEffect } from "react";
import { Button } from "@heroui/react";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { RiAlertLine, RiRefreshLine } from "react-icons/ri";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-danger relative mb-8"
      >
        <div className="bg-danger absolute -inset-4 rounded-full opacity-20 blur-3xl" />
        <RiAlertLine className="relative h-24 w-24" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl"
      >
        {t("Title")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-default-500 mb-8 max-w-md"
      >
        {t("Description")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Button
          onPress={() => reset()}
          variant="primary"
          size="lg"
          className="flex items-center gap-2 font-medium"
        >
          <RiRefreshLine className="h-5 w-5" />
          {t("TryAgain")}
        </Button>
        <Link href="/">
          <Button variant="ghost" size="lg" className="font-medium">
            {t("BackToHome")}
          </Button>
        </Link>
      </motion.div>

      {process.env.NODE_ENV === "development" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-default-100 mt-12 max-w-2xl overflow-auto rounded-xl p-4 text-left text-xs"
        >
          <p className="text-danger mb-2 font-mono font-bold">
            Error Digest: {error.digest}
          </p>
          <pre className="text-default-600 font-mono">{error.stack}</pre>
        </motion.div>
      )}
    </div>
  );
}
