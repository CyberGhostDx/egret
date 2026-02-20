"use client"

import Clock from "../../components/home/Clock";
import ExamCalendar from "../../components/home/ExamCalendar";
import ExamList from "../../components/home/ExamList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 primary-bg flex justify-center">
      <div className="max-w-[1300px] w-full p-4 sm:p-6 md:p-12 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-20">

        {/* Left Column: Clock and Calendar */}
        <div className="flex flex-col gap-6 sm:gap-8 w-full">
          <Clock />
          <ExamCalendar />
        </div>

        {/* Right Column: EGRET Header and Exam List */}
        <div className="flex flex-col w-full pt-4 lg:pt-0">
          <div className="mb-6 sm:mb-10 lg:pl-2 shrink-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#286065] tracking-wide mb-2 opacity-90">
              EGRET
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-500 font-medium">
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
