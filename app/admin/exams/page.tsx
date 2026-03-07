"use client";

import React, { useMemo, useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { AdminEditExamModalForm } from "@/components/admin/exams/AdminEditExamModalForm";
import { AdminExamsTable } from "@/components/admin/exams/AdminExamsTable";
import { Input, Button, Modal, useOverlayState } from "@heroui/react";
import { LuSearch, LuCalendar } from "react-icons/lu";
import { useAdminExams } from "@/hooks/useAdminExams";
import { useShallow } from "zustand/shallow";
import { CourseOffering } from "@/schema/backend.schema";

const AdminExamsPage = (): React.ReactElement => {
  const { exams, isLoading } = useAdminExams();
  const {
    courses: storeCourses,
    setCourses,
    updateCourse,
    reset,
  } = useCourseStore(
    useShallow((state) => ({
      courses: state.courses,
      setCourses: state.setCourses,
      updateCourse: state.updateCourse,
      reset: state.reset,
    })),
  );

  const editModalState = useOverlayState();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredExams = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return exams;

    return (
      exams?.filter(
        (exam) =>
          exam.course.id.toLowerCase().includes(query) ||
          exam.course.titleTh.toLowerCase().includes(query) ||
          exam.course.titleEn.toLowerCase().includes(query),
      ) || null
    );
  }, [exams, searchQuery]);

  const handleEdit = (exam: CourseOffering, slotIndex: number): void => {
    const selectedSlot = exam.exams[slotIndex];
    setCourses([
      {
        id: exam.id,
        courseId: exam.courseId,
        subjectEn: exam.course.titleEn,
        subjectTh: exam.course.titleTh,
        section: exam.section,
        sectionType: exam.sectionType || "Lecture",
        date: selectedSlot
          ? new Date(selectedSlot.examDate).toLocaleDateString("en-CA")
          : "", // en-CA gives YYYY-MM-DD
        credits: exam.credits,
        startTime: selectedSlot
          ? new Date(selectedSlot.startTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        endTime: selectedSlot
          ? new Date(selectedSlot.endTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "",
        building: selectedSlot?.building || "",
        room: selectedSlot?.room || "",
        instructorTh: exam.instructorTh || "",
        instructorEn: exam.instructorEn || "",
        proctor: selectedSlot?.proctor || "",
        note: selectedSlot?.note || "",
      },
    ]);
    editModalState.open();
  };

  const handleCloseModal = (): void => {
    reset();
    editModalState.close();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/50 px-6 py-10 md:px-12">
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-100/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-teal-50/30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-4">
              <div className="bg-primary/10 rounded-2xl p-3">
                <LuCalendar className="text-primary text-3xl" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Exams Management
              </h1>
            </div>
            <p className="ml-1 text-lg font-medium text-slate-400">
              View and manage current exam schedules in the system
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
            <div className="relative w-full sm:w-80">
              <Input
                placeholder="ค้นหารหัสวิชา, ชื่อวิชา..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:border-primary/30 h-12 w-full rounded-2xl border border-slate-200 bg-white/80 px-10 text-sm font-bold shadow-sm transition-all"
              />
              <LuSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        <AdminExamsTable
          exams={filteredExams}
          isLoading={isLoading}
          onEdit={handleEdit}
        />
      </div>

      <Modal>
        <Modal.Backdrop
          isOpen={editModalState.isOpen}
          onOpenChange={editModalState.setOpen}
        >
          <Modal.Container size="lg">
            <Modal.Dialog className="relative max-w-2xl overflow-visible rounded-3xl border-none bg-white p-0 shadow-2xl outline-none sm:max-w-3xl">
              <Modal.Header className="border-primary/5 flex items-center justify-between border-b px-6 py-4">
                <div className="w-full text-center">
                  <h2 className="text-primary text-xl font-black tracking-tight">
                    Edit Exam Details
                  </h2>
                  <p className="text-primary/40 text-[10px] font-bold tracking-wider uppercase">
                    Course: {storeCourses[0]?.courseId || "—"}
                  </p>
                </div>
              </Modal.Header>

              <Modal.Body className="p-6">
                <div className="max-h-[55vh] overflow-y-auto px-1">
                  {storeCourses[0] && (
                    <AdminEditExamModalForm
                      course={storeCourses[0]}
                      onUpdate={updateCourse}
                    />
                  )}
                </div>
              </Modal.Body>

              <Modal.Footer className="border-primary/5 flex justify-end gap-3 border-t px-6 py-4">
                <Button
                  onPress={handleCloseModal}
                  className="h-10 rounded-xl bg-red-400 px-6 text-sm font-bold text-white shadow-md transition-all hover:bg-red-500 active:scale-95"
                >
                  CANCEL
                </Button>
                <Button className="bg-primary hover:shadow-primary/20 h-10 rounded-xl px-8 text-sm font-bold text-white shadow-lg transition-all active:scale-95">
                  SAVE CHANGES
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default AdminExamsPage;
