"use client";

import { useUser } from "@/hooks/useUser";
import ExamCard, { Exam } from "./ExamCard";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@heroui/react";
import { LuCalendarSearch } from "react-icons/lu";

export default function ExamList() {
  const { user, isLoading } = useUser();
  const locale = useLocale();
  const t = useTranslations("ExamList");

  if (isLoading) {
    return <div className="py-10 text-center">{t("LoadingExams")}</div>;
  }

  const exams: (Exam & { sectionType: string | null })[] =
    user?.userCourses?.flatMap((uc) => {
      const course = uc.offering.course;
      return (uc.offering.exams || []).map((e) => ({
        id: e.id,
        courseCode: uc.offering.courseId,
        offeringId: uc.offering.id,
        courseNameEn:
          locale === "en"
            ? course.titleEn || course.titleTh
            : course.titleTh || course.titleEn,
        courseNameTh: course.titleTh,
        date: new Date(e.examDate),
        startTime: new Date(e.startTime).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "UTC",
        }),
        endTime: new Date(e.endTime).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "UTC",
        }),
        sectionType: uc.offering.sectionType,
        section: uc.offering.section,
      }));
    }) || [];

  const sortedExams = [...exams]
    .filter(
      (e, i, self) =>
        self.findIndex(
          (t) =>
            t.courseCode === e.courseCode && t.sectionType === e.sectionType,
        ) === i,
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (sortedExams.length === 0) {
    return (
      <div className="relative flex min-h-44 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-white p-6 text-center shadow-sm lg:mx-0 lg:max-w-xl">
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-slate-800">
              {t("NoRegisteredCourses")}
            </h3>
            <p className="max-w-xs text-sm text-slate-500">
              {t("RegisterInvitation")}
            </p>
          </div>
          <Link href="/courses">
            <Button
              variant="primary"
              className="h-10 rounded-xl bg-[#008B6D] px-8 text-sm font-bold text-white shadow-lg shadow-teal-500/10 transition-all hover:scale-105 active:scale-95"
            >
              <LuCalendarSearch className="mr-2 size-4" />
              {t("RegisterButton")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-4 lg:mx-0 lg:max-w-xl">
      {sortedExams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} />
      ))}
    </div>
  );
}
