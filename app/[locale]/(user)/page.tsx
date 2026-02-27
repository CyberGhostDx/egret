"use client";

import Clock from "@/components/home/Clock";
import ExamCalendar from "@/components/home/ExamCalendar";
import ExamList from "@/components/home/ExamList";

export default function Home() {
  return (
    <div className="primary-bg flex min-h-screen justify-center bg-fixed">
      <div className="grid w-full max-w-325 grid-cols-1 gap-8 p-4 sm:p-6 md:p-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="flex w-full flex-col gap-6 sm:gap-8 lg:sticky lg:top-24 lg:h-fit">
          <Clock />
          <ExamCalendar />
        </div>

        <div className="flex w-full flex-col pt-4 lg:pt-0">
          <div className="mb-6 shrink-0 text-center sm:mb-10 lg:pl-2 lg:text-left">
            <h1 className="mb-2 text-4xl font-extrabold tracking-wide text-[#286065] opacity-90 sm:text-5xl md:text-6xl">
              EGRET
            </h1>
            <p className="text-lg font-medium text-slate-500 sm:text-xl md:text-2xl">
              <span className="opacity-80">Engineering </span>
              <span className="opacity-80">Generated </span>
              <span className="opacity-80">Rapid </span>
              <span className="opacity-80">Exam </span>
              <span className="opacity-80">Table</span>
            </p>
          </div>

          <div className="pb-10 lg:pb-0">
            <ExamList />
          </div>
        </div>
      </div>
    </div>
  );
}
