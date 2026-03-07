"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import thLocale from "@fullcalendar/core/locales/th";
import { useEffect, useState, useMemo } from "react";
import { useUser } from "@/hooks/useUser";
import { Tooltip } from "@heroui/react";
import { useTimeStore } from "@/store/useTimeStore";
import { useLocale, useTranslations } from "next-intl";

export default function ExamCalendar() {
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();
  const now = useTimeStore((state) => state.now);
  const locale = useLocale();
  const t = useTranslations("ExamCalendar");

  useEffect(() => {
    setMounted(true);
  }, []);

  const groupedExams = useMemo(() => {
    const groups: Record<string, any[]> = {};
    user?.userCourses?.forEach((uc) => {
      uc.offering.exams?.forEach((e) => {
        const d = new Date(e.examDate);
        const dateStr = d.toLocaleDateString("en-CA", {
          timeZone: "Asia/Bangkok",
        });
        if (!groups[dateStr]) groups[dateStr] = [];

        if (
          !groups[dateStr].some(
            (ex) =>
              ex.courseId === uc.offering.courseId &&
              ex.sectionType === uc.offering.sectionType,
          )
        ) {
          groups[dateStr].push({
            id: e.id,
            courseId: uc.offering.courseId,
            courseTitle:
              locale === "en"
                ? uc.offering.course.titleEn || uc.offering.course.titleTh
                : uc.offering.course.titleTh || uc.offering.course.titleEn,
            sectionType: uc.offering.sectionType,
            time: new Date(e.startTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            }),
          });
        }
      });
    });
    return groups;
  }, [user, locale]);

  if (!mounted) {
    return (
      <div className="h-125 w-full animate-pulse rounded-2xl bg-slate-50"></div>
    );
  }

  return (
    <div className="fc-custom-theme relative flex h-fit w-full flex-col rounded-[2rem] border border-slate-100 bg-white p-6 pb-20 shadow-sm">
      <FullCalendar
        plugins={[dayGridPlugin]}
        locales={[thLocale]}
        locale={locale === "th" ? "th-u-ca-gregory" : "en"}
        initialView="dayGridMonth"
        firstDay={0}
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next",
        }}
        fixedWeekCount={false}
        height="auto"
        dayCellContent={(arg) => {
          const dateStr = arg.date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Bangkok",
          });
          const dayExams = groupedExams[dateStr];

          if (dayExams && dayExams.length > 0) {
            return (
              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <div className="flex w-full cursor-default justify-center">
                    {arg.dayNumberText}
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content className="border-divider rounded-lg border bg-white px-3 py-2 text-black shadow-xl">
                  <div className="max-w-50 px-1 py-2">
                    <div className="text-tiny text-primary border-divider mb-2 border-b pb-1 font-bold">
                      {t("UpcomingExams")}
                    </div>
                    {dayExams.map((ex) => (
                      <div key={ex.id} className="text-tiny mb-1 last:mb-0">
                        <span className="font-semibold">{ex.courseId}</span>
                        <div className="leading-tight opacity-80">
                          {ex.courseTitle}
                        </div>
                        <div className="text-[10px] opacity-60">{ex.time}</div>
                      </div>
                    ))}
                  </div>
                </Tooltip.Content>
              </Tooltip>
            );
          }

          return (
            <div className="flex w-full cursor-default justify-center">
              {arg.dayNumberText}
            </div>
          );
        }}
        dayCellClassNames={(arg) => {
          const dateStr = arg.date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Bangkok",
          });
          return groupedExams[dateStr] ? ["has-exam"] : [];
        }}
        dayMaxEvents={true}
      />

      <div className="absolute right-6 bottom-4.5 left-6 flex items-center justify-between sm:bottom-6">
        <div className="text-xs font-bold text-slate-800 sm:text-sm">
          {t("Time")}
        </div>
        <div className="rounded-full bg-slate-200/50 px-3 py-0.5 text-[10px] font-medium text-slate-700 sm:px-4 sm:py-1 sm:text-xs">
          {now.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Bangkok",
          })}
        </div>
      </div>
    </div>
  );
}
