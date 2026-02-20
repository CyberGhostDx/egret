"use client"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState, useMemo } from "react";
import { useUserStore } from "@/store/useUserStore";
import { Tooltip } from "@heroui/react";

export default function ExamCalendar() {
  const [mounted, setMounted] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  const groupedExams = useMemo(() => {
    const groups: Record<string, any[]> = {};
    user?.userCourses?.forEach((uc) => {
      uc.offering.exams.forEach((e) => {
        const d = new Date(e.examDate);
        const dateStr = d.toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });
        if (!groups[dateStr]) groups[dateStr] = [];

        if (!groups[dateStr].some(ex => ex.courseId === uc.offering.courseId)) {
          groups[dateStr].push({
            id: e.id,
            courseId: uc.offering.courseId,
            courseTitle: uc.offering.course.titleTh,
            time: new Date(e.startTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Bangkok"
            })
          });
        }
      });
    });
    return groups;
  }, [user]);

  if (!mounted) {
    return <div className="h-[500px] w-full bg-slate-50 rounded-2xl animate-pulse"></div>;
  }

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 grow w-full h-[550px] relative fc-custom-theme">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next"
        }}
        dayCellContent={(arg) => {
          const dateStr = arg.date.toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });
          const dayExams = groupedExams[dateStr];

          if (dayExams && dayExams.length > 0) {
            return (
              <Tooltip>
                <Tooltip.Trigger>
                  <div className="w-full flex justify-center cursor-default">
                    {arg.dayNumberText}
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="py-2 px-3 shadow-xl text-black bg-white rounded-lg border border-divider"
                >
                  <div className="px-1 py-2 max-w-[200px]">
                    <div className="text-tiny font-bold mb-2 text-primary border-b border-divider pb-1">
                      Upcoming Exams
                    </div>
                    {dayExams.map((ex) => (
                      <div key={ex.id} className="text-tiny mb-1 last:mb-0">
                        <span className="font-semibold">{ex.courseId}</span>
                        <div className="opacity-80 leading-tight">{ex.courseTitle}</div>
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
          const dateStr = arg.date.toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });
          return groupedExams[dateStr] ? ["has-exam"] : [];
        }}
        height="100%"
        contentHeight="auto"
        dayMaxEvents={true}
      />

      <div className="absolute bottom-6 left-6 font-bold text-sm text-slate-800">
        Time
      </div>
      <div className="absolute bottom-4 right-6 bg-slate-200/50 text-slate-700 px-4 py-1 rounded-full text-xs font-medium">
        {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}
      </div>
    </div>
  );
}
