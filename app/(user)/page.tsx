"use client"

import Clock from "../../components/home/Clock";
import ExamCalendar from "../../components/home/ExamCalendar";
import ExamList from "../../components/home/ExamList";

export default function Home() {
  return (
    <div className="flex justify-center p-6 md:p-12 h-screen md:h-[calc(100vh-64px)] bg-gray-100 primary-bg overflow-hidden">
      <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-20 h-full overflow-hidden">

        <div className="flex flex-col gap-8 w-full overflow-y-auto pr-2">
          <Clock />
          <ExamCalendar />
        </div>

        <div className="flex flex-col w-full pt-4 h-full overflow-hidden">
          <div className="mb-10 lg:pl-2 shrink-0">
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#286065] tracking-wide mb-2 opacity-90">
              EGRET
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium">
              <span className="opacity-80">Engineering </span>
              <span className="opacity-80">Generated </span>
              <span className="opacity-80">Rapid </span>
              <span className="opacity-80">Exam </span>
              <span className="opacity-80">Table</span>
            </p>
          </div>
          <div className="flex-1 overflow-y-auto pr-2">
            <ExamList />
          </div>
        </div>

      </div>
    </div>
  );
}
