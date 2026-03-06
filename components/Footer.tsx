"use client";

import { Surface } from "@heroui/react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <Surface className="border-divider rounded-t-2xl border-t">
      <footer className="w-full py-6">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="text-center text-sm font-medium text-slate-500 sm:text-left">
            {t("Copyright")}
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-[#008B6D]"
            >
              {t("Terms")}
            </Link>
          </div>
        </div>
      </footer>
    </Surface>
  );
};

export default Footer;
