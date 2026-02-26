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
      uc.offering.exams.forEach((e) => {
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
            courseTitle: locale === "en" ? uc.offering.course.titleEn || uc.offering.course.titleTh : uc.offering.course.titleTh || uc.offering.course.titleEn,
            sectionType: uc.offering.sectionType,
            time: new Date(e.startTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Bangkok",
            }),
          });
        }
      });
    });
    return groups;
  }, [user]);

  if (!mounted) {
    return (
      <div className="h-125 w-full bg-slate-50 rounded-2xl animate-pulse"></div>
    );
  }

  return (
    <div className="bg-white rounded-[2rem] p-6 pb-20 shadow-sm border border-slate-100 w-full h-fit relative fc-custom-theme flex flex-col">
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
                  <div className="w-full flex justify-center cursor-default">
                    {arg.dayNumberText}
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content className="py-2 px-3 shadow-xl text-black bg-white rounded-lg border border-divider">
                  <div className="px-1 py-2 max-w-50">
                    <div className="text-tiny font-bold mb-2 text-primary border-b border-divider pb-1">
                      {t("UpcomingExams")}
                    </div>
                    {dayExams.map((ex) => (
                      <div key={ex.id} className="text-tiny mb-1 last:mb-0">
                        <span className="font-semibold">{ex.courseId}</span>
                        <div className="opacity-80 leading-tight">
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

          return arg.dayNumberText;
        }}
        dayCellClassNames={(arg) => {
          const dateStr = arg.date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Bangkok",
          });
          return groupedExams[dateStr] ? ["has-exam"] : [];
        }}
        dayMaxEvents={true}
      />

      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 font-bold text-xs sm:text-sm text-slate-800">
        {t("Time")}
      </div>
      <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 bg-slate-200/50 text-slate-700 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium">
        {now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </div>
    </div>
  );
}
