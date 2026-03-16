"use client";

import { z } from "zod";
import { Link, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import {
  Modal,
  Button,
  Dropdown,
  Select,
  ListBox,
  useOverlayState,
} from "@heroui/react";
import { useUser } from "@/hooks/useUser";
import { useTimeStore } from "@/store/useTimeStore";
import { LuCalendarPlus } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import { SiGooglecalendar, SiApple } from "react-icons/si";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { FaYahoo } from "react-icons/fa";
import { google, outlook, yahoo, ics } from "calendar-link";

import {
  calculateExamTargetTime,
  calculateTimeLeft,
  formatCalendarTime,
} from "@/lib/time-utils";

export const examSchema = z.object({
  id: z.string(),
  offeringId: z.string(),
  courseCode: z.string(),
  courseNameTh: z.string(),
  courseNameEn: z.string(),
  date: z.date(),
  section: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export type Exam = z.infer<typeof examSchema>;

export default function ExamCard({ exam }: { exam: Exam }) {
  const locale = useLocale();
  const t = useTranslations("ExamCard");
  const [isPending, setIsPending] = useState(false);
  const modalState = useOverlayState();
  const { user, unenrollCourse } = useUser();
  const router = useRouter();

  const now = useTimeStore((state) => state.now);

  const timeLeft = useMemo(
    () => calculateTimeLeft(exam.date, exam.startTime, now),
    [exam.date, exam.startTime, now],
  );

  const formattedDate = exam.date.toLocaleDateString(
    locale === "en" ? "en-GB" : "th-TH",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Bangkok",
    },
  );

  const courseOfferings =
    user?.userCourses
      ?.filter((uc) => uc.offering.courseId === exam.courseCode)
      .map((uc) => uc.offering) || [];

  const availableExams = useMemo(
    () =>
      courseOfferings.flatMap((co) =>
        (co.exams || []).map((e) => ({
          credits: co.credits,
          offeringId: co.id,
          instructors: co.instructors,
          ...e,
          section: co.section,
          sectionType: co.sectionType,
        })),
      ),
    [courseOfferings, user],
  );
  const [selectedExamId, setSelectedExamId] = useState(exam.id);
  const examDetails = useMemo(
    () => availableExams.find((e) => e.id === selectedExamId),
    [selectedExamId, availableExams],
  );

  const handleAddToCalendar = (key: React.Key) => {
    const courseTitle =
      locale === "en"
        ? exam.courseNameEn || exam.courseNameTh
        : exam.courseNameTh || exam.courseNameEn;
    const title = `[Exam] ${exam.courseCode} ${courseTitle}`;
    const instructorName = examDetails?.instructors
      ?.map((i) =>
        locale === "en"
          ? i.instructor.nameEn || i.instructor.nameTh
          : i.instructor.nameTh || i.instructor.nameEn,
      )
      .filter(Boolean)
      .join(", ");
    const calendarDescription = `${t("Instructor")}: ${instructorName || "TBA"}\n${t("Section")}: ${examDetails?.section}\n${t("Note")}: ${examDetails?.note || t("NoNote")}`;
    const desc = calendarDescription;
    const location =
      `${examDetails?.building || ""} ${examDetails?.room || ""}`.trim() ||
      "TBA";
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
      const url = google(event);
      window.open(url, "_blank");
    } else if (key === "outlook") {
      const url = outlook(event);
      window.open(url, "_blank");
    } else if (key === "yahoo") {
      const url = yahoo(event);
      window.open(url, "_blank");
    } else if (key === "apple") {
      const url = ics(event);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${exam.courseCode}_exam.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUnenroll = async (offeringId: string) => {
    setIsPending(true);
    const success = await unenrollCourse(offeringId);
    if (success) {
      modalState.close();
    }
    setIsPending(false);
  };

  return (
    <>
      <div
        onClick={modalState.open}
        className="relative flex min-h-44 w-full cursor-pointer flex-col flex-nowrap items-center gap-4 overflow-hidden rounded-2xl border-none bg-linear-to-r from-[#447D8B] to-[#008B6D] p-5 text-left text-white shadow-md transition-colors sm:flex-row sm:gap-0 sm:p-6"
      >
        <div className="flex w-full items-center justify-center border-b border-white/20 px-2 pb-4 sm:w-2/5 sm:border-r sm:border-b-0 sm:px-4 sm:pb-0">
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <span className="text-sm font-bold opacity-60">
              {t("StartsIn")}
            </span>
            <div className="grid w-full max-w-[200px] grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-x-1 text-center sm:max-w-[280px] sm:gap-x-1">
              <span className="text-2xl font-bold tabular-nums sm:text-4xl">
                {timeLeft.days.toString().padStart(2, "0")}
              </span>
              <span className="mb-1 text-2xl font-bold opacity-80 sm:text-4xl">
                :
              </span>
              <span className="text-2xl font-bold tabular-nums sm:text-4xl">
                {timeLeft.hours.toString().padStart(2, "0")}
              </span>
              <span className="mb-1 text-2xl font-bold opacity-80 sm:text-4xl">
                :
              </span>
              <span className="text-2xl font-bold tabular-nums sm:text-4xl">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </span>

              <span className="text-sm font-medium opacity-80">
                {t("Days")}
              </span>
              <div />
              <span className="text-sm font-medium opacity-80">
                {t("Hours")}
              </span>
              <div />
              <span className="text-sm font-medium opacity-80">
                {t("Minutes")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center text-center sm:w-3/5 sm:items-start sm:pl-6 sm:text-left">
          <span className="text-sm font-bold tracking-wider uppercase opacity-70">
            {exam.courseCode}
          </span>
          <h3 className="mb-1 text-xl leading-tight font-bold whitespace-normal sm:mb-2">
            {locale === "en"
              ? exam.courseNameEn || exam.courseNameTh
              : exam.courseNameTh || exam.courseNameEn}
          </h3>
          <div className="mt-1 text-sm font-medium opacity-80">
            <p className="flex items-center justify-center gap-2 sm:justify-start">
              <span>
                {exam.startTime} - {exam.endTime}
              </span>
            </p>
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>

      <Modal>
        <Modal.Backdrop
          isOpen={modalState.isOpen}
          onOpenChange={modalState.setOpen}
        >
          <Modal.Container size="lg">
            <Modal.Dialog className="relative bg-white px-10 pt-8 outline-none">
              <Modal.CloseTrigger />
              <Modal.Header className="flex flex-col gap-1 border-none">
                <h2 className="text-primary text-2xl font-bold">
                  {exam.courseCode}
                </h2>
                <h2 className="text-primary text-2xl font-bold">
                  {locale === "en"
                    ? exam.courseNameEn || exam.courseNameTh
                    : exam.courseNameTh || exam.courseNameEn}
                </h2>
              </Modal.Header>

              <Modal.Body className="text-primary text-lg">
                <div className="flex flex-col gap-1.5 font-medium">
                  <p>
                    <span className="font-bold">{t("Credit")} :</span>{" "}
                    {examDetails?.credits}
                  </p>
                  <p>
                    <span className="font-bold">{t("Section")} :</span>{" "}
                    {examDetails?.section}
                  </p>
                  <p>
                    <span className="font-bold">{t("Building")} :</span>{" "}
                    {examDetails?.building || "-"}
                  </p>
                  <p>
                    <span className="font-bold">{t("Room")} :</span>{" "}
                    {examDetails?.room || "-"}
                  </p>
                  <p>
                    <span className="font-bold">{t("Instructor")} :</span>{" "}
                    {examDetails?.instructors
                      ?.map((i) =>
                        locale === "en"
                          ? i.instructor.nameEn || i.instructor.nameTh
                          : i.instructor.nameTh || i.instructor.nameEn,
                      )
                      .join(", ") || "-"}
                  </p>
                  <p>
                    <span className="font-bold text-red-500">*</span>
                    <span className="font-bold">{t("Note")} : </span>
                    <span className="font-normal text-slate-600">
                      {examDetails?.note || t("NoNote")}
                    </span>
                  </p>
                  <p className="text-base font-bold text-red-500">
                    {t("DoubleCheck")}
                  </p>
                </div>
                {availableExams.length > 1 && (
                  <div className="mt-4">
                    <Select
                      aria-label="Select Section and Room"
                      value={selectedExamId}
                      onChange={(key) => {
                        if (key !== null) setSelectedExamId(key.toString());
                      }}
                    >
                      <Select.Trigger className="border border-gray-200">
                        <Select.Value>
                          {({ state }) => {
                            const selectedItem = state.selectedItems?.[0];
                            const item = availableExams.find(
                              (e) => e.id === selectedItem?.key,
                            );
                            if (item) {
                              const examItem = availableExams.find(
                                (e) => e.id === item.id,
                              );
                              return `${t("Section")} ${examItem?.section} - ${examItem?.building} ${examItem?.room}`;
                            }
                            return t("SelectSectionRoom");
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
                              textValue={`${t("Section")} ${e.section}`}
                            >
                              <div className="flex flex-col">
                                <span className="font-bold">
                                  {t("Section")} {e.section} ({e.sectionType})
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

              <Modal.Footer className="mt-8 flex w-full flex-col sm:mt-10 sm:flex-row sm:justify-between">
                {/* Desktop View */}
                <Button
                  className="hidden sm:flex"
                  variant="danger"
                  onPress={() =>
                    handleUnenroll(
                      availableExams.find((e) => e.id === selectedExamId)
                        ?.offeringId || "",
                    )
                  }
                  isPending={isPending}
                >
                  {t("Unenroll")}
                </Button>

                <div className="hidden items-center gap-2 sm:flex">
                  <Dropdown>
                    <Button
                      variant="secondary"
                      className="bg-primary/10 text-primary border-none"
                    >
                      <LuCalendarPlus className="size-5" />
                      {t("AddToCalendar")}
                    </Button>
                    <Dropdown.Popover>
                      <Dropdown.Menu onAction={handleAddToCalendar}>
                        <Dropdown.Item
                          id="google"
                          className="flex items-center gap-2"
                        >
                          <SiGooglecalendar className="size-5" />
                          Google Calendar
                        </Dropdown.Item>
                        <Dropdown.Item
                          id="outlook"
                          className="flex items-center gap-2"
                        >
                          <PiMicrosoftOutlookLogoFill className="size-5" />
                          Outlook
                        </Dropdown.Item>
                        <Dropdown.Item
                          id="apple"
                          className="flex items-center gap-2"
                        >
                          <SiApple className="size-5" />
                          Apple / iCal
                        </Dropdown.Item>
                        <Dropdown.Item
                          id="yahoo"
                          className="flex items-center gap-2"
                        >
                          <FaYahoo className="size-5" />
                          Yahoo
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>
                  <Link href={`courses/${exam.courseCode}`}>
                    <Button variant="primary">{t("CourseReview")}</Button>
                  </Link>
                </div>

                {/* Mobile View */}
                <div className="flex w-full items-center gap-2 sm:hidden">
                  <Dropdown>
                    <Button
                      variant="secondary"
                      className="bg-primary/10 text-primary flex-1 border-none"
                    >
                      <LuCalendarPlus className="size-5" />
                      {t("AddToCalendar")}
                    </Button>
                    <Dropdown.Popover>
                      <Dropdown.Menu onAction={handleAddToCalendar}>
                        <Dropdown.Item
                          id="google"
                          className="flex items-center gap-2"
                        >
                          <SiGooglecalendar className="size-5" />
                          Google Calendar
                        </Dropdown.Item>
                        <Dropdown.Item
                          id="outlook"
                          className="flex items-center gap-2"
                        >
                          <PiMicrosoftOutlookLogoFill className="size-5" />
                          Outlook
                        </Dropdown.Item>
                        <Dropdown.Item
                          id="apple"
                          className="flex items-center gap-2"
                        >
                          <SiApple className="size-5" />
                          Apple / iCal
                        </Dropdown.Item>
                        <Dropdown.Item
                          id="yahoo"
                          className="flex items-center gap-2"
                        >
                          <FaYahoo className="size-5" />
                          Yahoo
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>

                  <Dropdown>
                    <Button
                      isIconOnly
                      variant="secondary"
                      className="bg-gray-100 text-slate-800"
                    >
                      <HiDotsHorizontal className="size-5" />
                    </Button>
                    <Dropdown.Popover>
                      <Dropdown.Menu
                        disabledKeys={isPending ? ["unenroll"] : []}
                        onAction={(key) => {
                          if (key === "review") {
                            router.push(`/courses/${exam.courseCode}`);
                          } else if (key === "unenroll") {
                            handleUnenroll(
                              availableExams.find(
                                (e) => e.id === selectedExamId,
                              )?.offeringId || "",
                            );
                          }
                        }}
                      >
                        <Dropdown.Item id="review" className="text-accent">
                          {t("CourseReview")}
                        </Dropdown.Item>
                        <Dropdown.Item id="unenroll" className="text-danger">
                          {t("Unenroll")}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>
                </div>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
