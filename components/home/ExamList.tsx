"use client";

import { useUser } from "@/hooks/useUser";
import ExamCard, { Exam } from "./ExamCard";
import { useLocale, useTranslations } from "next-intl";

export default function ExamList() {
  const { user, isLoading } = useUser();
  const locale = useLocale();
  const t = useTranslations("ExamList");

  if (isLoading) {
    return <div className="text-center py-10">{t("LoadingExams")}</div>;
  }

  const exams: (Exam & { sectionType: string | null })[] =
    user?.userCourses?.flatMap((uc) => {
      const course = uc.offering.course;
      return uc.offering.exams.map((e) => ({
        id: e.id,
        courseCode: uc.offering.courseId,
        offeringId: uc.offering.id,
        courseNameEn: locale === "en" ? course.titleEn || course.titleTh : course.titleTh || course.titleEn,
        courseNameTh: course.titleTh,
        date: new Date(e.examDate),
        startTime: new Date(e.startTime).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Bangkok",
        }),
        endTime: new Date(e.endTime).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Bangkok",
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
      <div className="text-center py-10 text-slate-500">
        {t("NoUpcomingExams")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full lg:max-w-xl mx-auto lg:mx-0">
      {sortedExams.map((exam) => (
        <ExamCard key={exam.id} exam={exam} />
      ))}
    </div>
  );
}
