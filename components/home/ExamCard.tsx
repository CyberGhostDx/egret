"use client";

import { z } from "zod";
import { useState, useEffect } from "react";

export const examSchema = z.object({
  id: z.string(),
  courseCode: z.string(),
  courseName: z.string(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
});

export type Exam = z.infer<typeof examSchema>;

const calculateTimeLeft = (examDate: Date, startTimeStr: string) => {
  const now = new Date();

  const [hoursStr, minutesStr] = startTimeStr.split(":");
  const targetTime = new Date(examDate);
  targetTime.setHours(parseInt(hoursStr, 10), parseInt(minutesStr, 10), 0, 0);

  const difference = targetTime.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);

  return { days, hours, minutes };
};

export default function ExamCard({ exam }: { exam: Exam }) {
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeLeft(exam.date, exam.startTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(exam.date, exam.startTime));
    }, 1000); // 1 second

    return () => clearInterval(timer);
  }, [exam.date, exam.startTime]);

  const formattedDate = exam.date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-linear-to-r from-[#447D8B] to-[#008B6D] text-white rounded-2xl p-6 shadow-md flex items-center justify-between hover:bg-[#1b7a62] transition-colors relative overflow-hidden">
      <div className="flex flex-col items-center justify-center px-4 w-1/3 border-r border-white/30">
        <div className="text-4xl font-bold tracking-wider relative -left-2">
          {timeLeft.days.toString().padStart(2, "0")}:
          {timeLeft.hours.toString().padStart(2, "0")}:
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="flex gap-4 text-xs font-medium uppercase opacity-80 mt-1">
          <span>Days</span>
          <span>Hours</span>
          <span>Minutes</span>
        </div>
      </div>

      <div className="flex flex-col pl-6 w-2/3">
        <span className="text-lg font-bold">{exam.courseCode}</span>
        <h3 className="text-xl font-bold leading-tight mb-2 grow">
          {exam.courseName}
        </h3>
        <div className="text-sm font-medium opacity-90 mt-2">
          <p>
            {exam.startTime} - {exam.endTime}
          </p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
