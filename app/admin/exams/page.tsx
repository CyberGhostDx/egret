"use client";

import React, { useMemo, useState } from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { AdminEditExamModalForm } from "@/components/admin/exams/AdminEditExamModalForm";
import { AdminExamsTable } from "@/components/admin/exams/AdminExamsTable";
import { Input, Button, Modal, useOverlayState, toast } from "@heroui/react";
import { LuSearch, LuCalendar, LuTrash } from "react-icons/lu";
import { useAdminExams } from "@/hooks/useAdminExams";
import { useShallow } from "zustand/shallow";
import { CourseOffering } from "@/schema/backend.schema";
import axiosInstance from "@/lib/axiosInstance";

const AdminExamsPage = (): React.ReactElement => {
  const { exams, isLoading, mutate } = useAdminExams();
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
  const deleteModalState = useOverlayState();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    isExam: boolean;
  } | null>(null);

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
    const selectedSlot = exam.exams?.[slotIndex];
    setCourses([
      {
        id: exam.id,
        examId: selectedSlot?.id,
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
        instructorTh:
          exam.instructors
            ?.map((i) => i.instructor.nameTh)
            .filter(Boolean)
            .join(",") || "",
        instructorEn:
          exam.instructors
            ?.map((i) => i.instructor.nameEn)
            .filter(Boolean)
            .join(",") || "",
        note: selectedSlot?.note || "",
      },
    ]);
    editModalState.open();
  };

  const handleCloseModal = (): void => {
    reset();
    editModalState.close();
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const course = storeCourses[0];
    if (!course) return;

    setIsSaving(true);
    try {
      const response = await axiosInstance.patch("/api/admin/exams", course);
      if (response.data.success) {
        await mutate();
        toast.success("Changes saved successfully");
        handleCloseModal();
      }
    } catch (error: any) {
      console.error("Failed to save changes:", error);
      toast.danger(error.response?.data?.message || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: string, isExam: boolean) => {
    setItemToDelete({ id, isExam });
    deleteModalState.open();
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    const { id, isExam } = itemToDelete;
    setIsSaving(true);
    try {
      const endpoint = isExam
        ? `/api/admin/exams/${id}`
        : `/api/admin/offerings/${id}`;
      const response = await axiosInstance.delete(endpoint);
      if (response.data.success) {
        await mutate();
        toast.success(
          `${isExam ? "Exam schedule" : "Course offering"} deleted`,
        );
        deleteModalState.close();
        setItemToDelete(null);
      }
    } catch (error: any) {
      console.error("Failed to delete:", error);
      toast.danger(error.response?.data?.message || "Failed to delete item");
    } finally {
      setIsSaving(false);
    }
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
          onDelete={handleDelete}
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
                <Button
                  isDisabled={isSaving}
                  onPress={handleSave}
                  className="bg-primary hover:shadow-primary/20 h-10 rounded-xl px-8 text-sm font-bold text-white shadow-lg transition-all active:scale-95"
                >
                  {isSaving ? "SAVING..." : "SAVE CHANGES"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Modal>
        <Modal.Backdrop
          isOpen={deleteModalState.isOpen}
          onOpenChange={deleteModalState.setOpen}
        >
          <Modal.Container size="sm">
            <Modal.Dialog className="relative max-w-[380px] overflow-hidden rounded-3xl border-none bg-white p-0 shadow-2xl outline-none">
              <Modal.Header className="border-b border-slate-100 px-6 py-4 text-center">
                <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-red-50">
                  <LuTrash className="size-6 text-red-500" />
                </div>
                <h2 className="text-lg font-black tracking-tight text-slate-800">
                  Confirm Deletion
                </h2>
              </Modal.Header>
              <Modal.Body className="px-6 py-4 text-center">
                <p className="text-base font-medium text-slate-600">
                  Are you sure you want to delete this{" "}
                  <span className="font-bold text-red-500">
                    {itemToDelete?.isExam ? "exam schedule" : "course offering"}
                  </span>
                  ?
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  This action cannot be undone and will permanently remove the
                  data from the system.
                </p>
              </Modal.Body>
              <Modal.Footer className="flex justify-center gap-2 bg-slate-50/50 px-6 py-4">
                <Button
                  onPress={() => deleteModalState.close()}
                  className="h-10 flex-1 rounded-xl bg-slate-200 px-6 text-xs font-bold text-slate-600 transition-all hover:bg-slate-300 active:scale-95"
                >
                  CANCEL
                </Button>
                <Button
                  isDisabled={isSaving}
                  onPress={confirmDelete}
                  className="h-10 flex-1 rounded-xl bg-red-500 px-6 text-xs font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-600 active:scale-95"
                >
                  {isSaving ? "DELETING..." : "DELETE NOW"}
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
