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

import { Modal, Button } from "@heroui/react";
import { useUserStore } from "@/store/useUserStore";

export default function ExamCard({ exam }: { exam: Exam }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore((state) => state.user);

  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeLeft(exam.date, exam.startTime),
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

  const courseOfferings =
    user?.userCourses
      ?.filter((uc) => uc.offering.courseId === exam.courseCode)
      .map((uc) => uc.offering) || [];

  const firstOffering = courseOfferings[0];
  const credits = firstOffering?.credits || 0;

  const sections = courseOfferings
    .map((o) => `${o.section} (${o.sectionType || "Section"})`)
    .join(", ");

  const instructors = courseOfferings
    .map((o) => o.instructorTh)
    .filter(Boolean)
    .join(", ");

  const examDetails = firstOffering?.exams.find((e) => e.id === exam.id);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-linear-to-r from-[#447D8B] to-[#008B6D] text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row items-center gap-4 sm:gap-0 hover:bg-[#1b7a62] transition-colors cursor-pointer relative overflow-hidden"
      >
        <div className="flex flex-col items-center justify-center px-2 sm:px-4 w-full sm:w-2/5 border-b sm:border-b-0 sm:border-r border-white/20 pb-4 sm:pb-0">
          <div className="text-xl sm:text-4xl font-bold tracking-wider tabular-nums">
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

        <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:pl-6 w-full sm:w-3/5">
          <span className="text-sm font-bold opacity-70 uppercase tracking-wider">
            {exam.courseCode}
          </span>
          <h3 className="text-xl font-bold leading-tight mb-1 sm:mb-2">
            {exam.courseName}
          </h3>
          <div className="text-sm font-medium opacity-80 mt-1">
            <p className="flex items-center gap-2 justify-center sm:justify-start">
              <span>
                {exam.startTime} - {exam.endTime}
              </span>
            </p>
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>

      <Modal>
        <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal.Container size="lg">
            <Modal.Dialog className=" px-10 pt-8 relative bg-white outline-none">
              <Modal.CloseTrigger />
              <Modal.Header className="flex flex-col gap-1 border-none">
                <h2 className="text-2xl font-bold text-primary">
                  {exam.courseCode}
                </h2>
                <h2 className="text-2xl font-bold text-primary">
                  {exam.courseName}
                </h2>
              </Modal.Header>

              <Modal.Body className="text-primary text-lg">
                <div className="flex flex-col gap-1.5 font-medium">
                  <p>
                    <span className="font-bold">Credit :</span> {credits}
                  </p>
                  <p>
                    <span className="font-bold">Section :</span> {sections}
                  </p>
                  <p>
                    <span className="font-bold">Building :</span>{" "}
                    {examDetails?.building || "-"}
                  </p>
                  <p>
                    <span className="font-bold">Room :</span>{" "}
                    {examDetails?.room || "-"}
                  </p>
                  <p>
                    <span className="font-bold">Instructor :</span>{" "}
                    {instructors}
                  </p>

                  <p>
                    <span className="font-bold text-red-500">*</span>
                    <span className="font-bold">Note : </span>
                    <span className="text-slate-600 font-normal">
                      {examDetails?.note || "ไม่มีหมายเหตุ"}
                    </span>
                  </p>
                </div>
              </Modal.Body>

              <Modal.Footer className="flex justify-between mt-10">
                <Button variant="danger" className="" onPress={close}>
                  Delete
                </Button>

                <div className="flex gap-2">
                  <Button className="bg-primary">Add to Calendar</Button>
                  <Button variant="primary" className="">
                    Course Review
                  </Button>
                </div>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
