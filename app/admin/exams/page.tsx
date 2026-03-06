"use client";

import React, { useMemo, useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { AdminEditExamModalForm } from "@/components/admin/exams/AdminEditExamModalForm";
import { AdminExamsTable } from "@/components/admin/exams/AdminExamsTable";
import { Input, Button, Modal, useOverlayState } from "@heroui/react";
import { LuSearch, LuX } from "react-icons/lu";
import { useCourses } from "@/hooks/useCourses";

const AdminExamsPage = () => {
  const { courses: backendCourses, isLoading } = useCourses();
  const {
    courses: storeCourses,
    setCourses,
    updateCourse,
    reset
  } = useCourseStore();

  const editModalState = useOverlayState();
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten and transform data for display and editing
  const flattenedExams = useMemo(() => {
    if (!backendCourses) return [];

    return backendCourses.flatMap(course =>
      course.offerings.map(offering => ({
        id: offering.id,
        courseId: offering.courseId,
        subjectTh: course.titleTh,
        subjectEn: course.titleEn,
        section: offering.section,
        sectionType: offering.sectionType || "",
        credits: offering.credits,
        instructorTh: offering.instructorTh || "",
        instructorEn: offering.instructorEn || "",
        // Real data is preferred, but for now we'll show "ไม่มีข้อมูล" if missing
        date: "",
        startTime: "",
        endTime: "",
        building: "",
        room: "",
        proctor: "",
        note: ""
      }))
    );
  }, [backendCourses]);

  const filteredExams = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return flattenedExams;

    return flattenedExams.filter(exam =>
      exam.courseId.toLowerCase().includes(query) ||
      exam.subjectTh.toLowerCase().includes(query) ||
      exam.subjectEn.toLowerCase().includes(query)
    );
  }, [flattenedExams, searchQuery]);

  const handleEdit = (exam: typeof flattenedExams[0]) => {
    // Transform table data into the form schema format
    setCourses([{
      id: exam.id,
      courseId: exam.courseId,
      subjectEn: exam.subjectEn,
      subjectTh: exam.subjectTh,
      section: exam.section,
      sectionType: exam.sectionType || "Lecture",
      date: exam.date,
      credits: exam.credits,
      startTime: exam.startTime,
      endTime: exam.endTime,
      building: exam.building,
      room: exam.room,
      instructorTh: exam.instructorTh,
      instructorEn: exam.instructorEn,
      proctor: exam.proctor,
      note: exam.note
    }]);
    editModalState.open();
  };

  const handleCloseModal = () => {
    reset();
    editModalState.close();
  };

  return (
    <div className="primary-bg text-primary min-h-screen p-6 sm:p-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-primary text-4xl font-black tracking-tight sm:text-5xl">
              Exams Management
            </h1>
            <p className="text-primary/40 mt-1 text-lg font-medium">
              View and manage current exam schedules in the system
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
            <div className="relative w-full sm:w-80">
              <Input
                placeholder="ค้นหารหัสวิชา, ชื่อวิชา..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/80 border-primary/10 h-12 w-full rounded-2xl border px-10 text-sm font-bold shadow-sm transition-all focus:border-primary/30"
              />
              <LuSearch className="text-primary/30 absolute top-1/2 left-4 -translate-y-1/2" />
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
            <Modal.Dialog className="relative bg-white p-0 outline-none overflow-visible rounded-3xl border-none shadow-2xl max-w-2xl sm:max-w-3xl">
              <Modal.Header className="flex items-center justify-between border-b border-primary/5 px-6 py-4">
                <div className="text-center w-full">
                  <h2 className="text-primary text-xl font-black tracking-tight">
                    Edit Exam Details
                  </h2>
                  <p className="text-primary/40 text-[10px] font-bold uppercase tracking-wider">
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

              <Modal.Footer className="flex justify-end gap-3 border-t border-primary/5 px-6 py-4">
                <Button
                  onPress={handleCloseModal}
                  className="bg-red-400 hover:bg-red-500 h-10 rounded-xl px-6 font-bold text-white transition-all shadow-md active:scale-95 text-sm"
                >
                  CANCEL
                </Button>
                <Button
                  className="bg-primary hover:shadow-primary/20 h-10 rounded-xl px-8 font-bold text-white shadow-lg transition-all active:scale-95 text-sm"
                >
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
