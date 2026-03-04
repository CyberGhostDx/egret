"use client";

import { useTimeStore } from "@/store/useTimeStore";
import { useTranslations } from "next-intl";

export default function Clock() {
  const time = useTimeStore((state) => state.now);
  const t = useTranslations("Home.Time");

  if (!time) {
    return <div className="h-24"></div>;
  }

  const hours = time
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      timeZone: "Asia/Bangkok",
    })
    .padStart(2, "0");
  const minutes = time
    .toLocaleTimeString("en-GB", {
      minute: "2-digit",
      timeZone: "Asia/Bangkok",
    })
    .padStart(2, "0");
  const seconds = time
    .toLocaleTimeString("en-GB", {
      second: "2-digit",
      timeZone: "Asia/Bangkok",
    })
    .padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center py-6 text-[#2c5f66] sm:py-10">
      <div className="flex items-center gap-1 text-center sm:gap-2">
        <div className="flex min-w-15 flex-col sm:min-w-20">
          <span className="text-5xl font-bold tracking-tight sm:text-7xl">
            {hours}
          </span>
          <span className="mt-1 text-xs font-medium opacity-70 sm:text-sm">
            {t("Hour")}
          </span>
        </div>
        <span className="mb-4 text-4xl font-bold opacity-80 sm:mb-6 sm:text-6xl">
          :
        </span>
        <div className="flex min-w-15 flex-col sm:min-w-20">
          <span className="text-5xl font-bold tracking-tight sm:text-7xl">
            {minutes}
          </span>
          <span className="mt-1 text-xs font-medium opacity-70 sm:text-sm">
            {t("Minute")}
          </span>
        </div>
        <span className="mb-4 text-4xl font-bold opacity-80 sm:mb-6 sm:text-6xl">
          :
        </span>
        <div className="flex min-w-15 flex-col sm:min-w-20">
          <span className="text-5xl font-bold tracking-tight sm:text-7xl">
            {seconds}
          </span>
          <span className="mt-1 text-xs font-medium opacity-70 sm:text-sm">
            {t("Second")}
          </span>
        </div>
      </div>
    </div>
  );
}
