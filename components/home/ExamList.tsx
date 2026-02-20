"use client";

import { useUserStore } from "@/store/useUserStore";
import ExamCard, { Exam } from "./ExamCard";

export default function ExamList() {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);

  if (isLoading) {
    return <div className="text-center py-10">Loading exams...</div>;
  }

  const exams: Exam[] = user?.userCourses?.flatMap((uc) => {
    const course = uc.offering.course;
    return uc.offering.exams.map((e) => ({
      id: e.id,
      courseCode: uc.offering.courseId,
      courseName: course.titleTh,
      date: new Date(e.examDate),
      startTime: new Date(e.startTime).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Bangkok"
      }),
      endTime: new Date(e.endTime).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Bangkok"
      }),
    }));
  }) || [];


  const sortedExams = [...exams].filter((e, i, self) => self.findIndex((t) => t.courseCode === e.courseCode) === i).sort((a, b) => a.date.getTime() - b.date.getTime());

  if (sortedExams.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500">
        No upcoming exams found.
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
