"use client";

import { z } from "zod";
import { useState, useEffect, useMemo } from "react";
import { Modal, Button, Dropdown, Select, ListBox } from "@heroui/react";
import { useUserStore } from "@/store/useUserStore";
import { LuCalendarPlus } from "react-icons/lu";
import { google, outlook, office365, yahoo, ics } from "calendar-link";

export const examSchema = z.object({
  id: z.string(),
  courseCode: z.string(),
  courseNameTh: z.string(),
  courseNameEn: z.string(),
  date: z.date(),
  section: z.string(),
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

const formatCalendarTime = (date: Date, time: string) => {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
};

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
      ?.filter((uc) => uc.offering.courseId === exam.courseCode && uc.offering.section === exam.section)
      .map((uc) => uc.offering) || [];

  const availableExams = useMemo(() => courseOfferings.flatMap((o) =>
    o.exams
      .map((e) => ({
        credits: o.credits,
        instructorEn: o.instructorEn,
        instructorTh: o.instructorTh,
        ...e,
        section: o.section,
        sectionType: o.sectionType,
      })),
  ), [courseOfferings]);
  const [selectedExamId, setSelectedExamId] = useState(exam.id);
  const examDetails = useMemo(() => availableExams.find((e) => e.id === selectedExamId), [selectedExamId, availableExams]);


  const handleAddToCalendar = (key: React.Key) => {
    const title = `[Exam] ${exam.courseCode} ${exam.courseNameEn}`;
    const calendarDescription = `Instructor: ${examDetails?.instructorEn}\nSection: ${examDetails?.section}\nNote: ${examDetails?.note || "ไม่มีหมายเหตุ"}`;
    const desc = calendarDescription;
    const location = `${examDetails?.building || ""} ${examDetails?.room || ""}`.trim() || "TBA";
    const start = formatCalendarTime(exam.date, exam.startTime);
    const end = formatCalendarTime(exam.date, exam.endTime);

    const event = {
      uid: exam.id,
      title: title,
      location: location,
      description: desc,
      start: start,
      end: end,
    };

    if (key === "google") {
      const url = google(event)
      window.open(url, "_blank");
    } else if (key === "outlook") {
      const url = outlook(event)
      window.open(url, "_blank");
    } else if (key === "office365") {
      const url = office365(event)
      window.open(url, "_blank");
    } else if (key === "yahoo") {
      const url = yahoo(event)
      window.open(url, "_blank");
    } else if (key === "apple") {
      const url = ics(event)
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${exam.courseCode}_exam.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

  }

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
            {exam.courseNameEn}
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
                  {exam.courseNameEn}
                </h2>
              </Modal.Header>

              <Modal.Body className="text-primary text-lg">
                <div className="flex flex-col gap-1.5 font-medium">
                  <p>
                    <span className="font-bold">Credit :</span> {examDetails?.credits}
                  </p>
                  <p>
                    <span className="font-bold">Section :</span> {examDetails?.section}
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
                    {examDetails?.instructorEn}
                  </p>

                  <p>
                    <span className="font-bold">Proctor :</span>{" "}
                    {examDetails?.proctor?.split("\n").join(", ")}
                  </p>

                  <p>
                    <span className="font-bold text-red-500">*</span>
                    <span className="font-bold">Note : </span>
                    <span className="text-slate-600 font-normal">
                      {examDetails?.note || "ไม่มีหมายเหตุ"}
                    </span>
                  </p>
                </div>
                {availableExams.length > 1 && (
                  <div className="mt-4">
                    <Select
                      aria-label="Select Section and Room"
                      value={selectedExamId}
                      onChange={(key) => {
                        if (key !== null)
                          setSelectedExamId(key.toString());
                      }}
                    >
                      <Select.Trigger className="border border-gray-200">
                        <Select.Value>
                          {({ state }) => {
                            const selectedItem = state.selectedItems?.[0];
                            const item = availableExams.find((e) => e.id === selectedItem?.key);
                            if (item) {
                              const examItem =
                                availableExams.find((e) => e.id === item.id);
                              return `Section ${examItem?.section} - ${examItem?.building} ${examItem?.room}`;
                            }
                            return "Select Section And Room";
                          }}
                        </Select.Value>
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          {availableExams.map((e) => (
                            <ListBox.Item
                              key={e.id}
                              id={e.id}
                              textValue={`Section ${e.section}`}
                            >
                              <div className="flex flex-col">
                                <span className="font-bold">
                                  Section {e.section} ({e.sectionType})
                                </span>
                                <span className="text-sm opacity-80">
                                  {e.building} {e.room}
                                </span>
                              </div>
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer className="flex justify-between mt-10">
                <Button variant="danger" onPress={() => setIsOpen(false)}>
                  Delete
                </Button>

                <div className="flex gap-2 items-center">
                  <Dropdown>
                    <Button variant="secondary" className="bg-primary/10 text-primary border-none">
                      <LuCalendarPlus className="w-5 h-5" />
                      Add to Calendar
                    </Button>
                    <Dropdown.Popover>
                      <Dropdown.Menu
                        onAction={handleAddToCalendar}
                      >
                        <Dropdown.Item id="google">Google Calendar</Dropdown.Item>
                        <Dropdown.Item id="outlook">Outlook</Dropdown.Item>
                        <Dropdown.Item id="apple">Apple / iCal</Dropdown.Item>
                        <Dropdown.Item id="office365">Office 365</Dropdown.Item>
                        <Dropdown.Item id="yahoo">Yahoo</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>
                  <Button variant="primary">Course Review</Button>
                </div>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
