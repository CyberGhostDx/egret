"use client";

import { useState, useMemo } from "react";
import { useUser } from "@/hooks/useUser";
import ExamCard, { Exam } from "./ExamCard";
import { calculateExamTargetTime } from "@/lib/time-utils";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@heroui/react";
import { LuCalendarSearch, LuEye, LuEyeOff } from "react-icons/lu";
import { useTimeStore } from "@/store/useTimeStore";

export default function ExamList() {
  const { user, isLoading } = useUser();
  const locale = useLocale();
  const t = useTranslations("ExamList");
  const [showPassed, setShowPassed] = useState(false);
  const now = useTimeStore((state) => state.now);

  const allExams: (Exam & { sectionType: string | null })[] = useMemo(() => {
    return (
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
      }) || []
    );
  }, [user, locale]);

  const sortedExams = useMemo(() => {
    return [...allExams]
      .filter(
        (e, i, self) =>
          self.findIndex(
            (t) =>
              t.courseCode === e.courseCode && t.sectionType === e.sectionType,
          ) === i,
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [allExams]);

  const examsWithStatus = useMemo(() => {
    return sortedExams.map((exam) => {
      const targetTime = calculateExamTargetTime(exam.date, exam.startTime);
      return { ...exam, isPassed: targetTime.getTime() < now.getTime() };
    });
  }, [sortedExams, now]);

  const hasPassedExams = examsWithStatus.some((e) => e.isPassed);
  const filteredExams = showPassed
    ? examsWithStatus
    : examsWithStatus.filter((e) => !e.isPassed);

  if (isLoading) {
    return <div className="py-10 text-center">{t("LoadingExams")}</div>;
  }

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
      {hasPassedExams && (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="ghost"
            onPress={() => setShowPassed(!showPassed)}
            className="text-slate-500 hover:text-[#008B6D]"
          >
            {showPassed ? <LuEyeOff /> : <LuEye />}
            {showPassed ? t("HidePassedExams") : t("ShowPassedExams")}
          </Button>
        </div>
      )}
      {filteredExams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} />
      ))}
      {!showPassed &&
        filteredExams.length === 0 &&
        sortedExams.length > 0 && (
          <div className="py-10 text-center text-slate-500">
            <p className="mb-4">{t("NoUpcomingExams") || "No upcoming exams"}</p>
            <Button
              variant="secondary"
              onPress={() => setShowPassed(true)}
              className="bg-slate-100"
            >
              <LuEye className="mr-2" />
              {t("ShowPassedExams")}
            </Button>
          </div>
        )}
    </div>
  );
}
