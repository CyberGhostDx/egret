"use client";

import { Button } from "@heroui/react";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { RiGhostLine } from "react-icons/ri";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <div className="bg-primary absolute -inset-4 rounded-full opacity-20 blur-3xl" />
        <RiGhostLine className="text-primary animate-bounce-slow relative h-24 w-24" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4 text-4xl font-bold tracking-tight sm:text-6xl"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-foreground mb-4 text-2xl font-semibold"
      >
        {t("Title")}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-default-500 mb-8 max-w-md"
      >
        {t("Description")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/">
          <Button variant="primary" size="lg" className="font-medium">
            {t("BackToHome")}
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
