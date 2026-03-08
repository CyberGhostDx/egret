import React, { useState } from "react";
import { Button, toast } from "@heroui/react";
import { HiOutlinePlus, HiOutlineCheck } from "react-icons/hi";
import { useCourseStore } from "@/store/useCourseStore";
import axiosInstance from "@/lib/axiosInstance";

import { courseFormSchema } from "@/schema/courseForm.schema";
import { z } from "zod";

interface CoursePageHeaderProps {
  onAddCourse: () => void;
}

export const CoursePageHeader: React.FC<CoursePageHeaderProps> = ({
  onAddCourse,
}): React.ReactElement => {
  const courses = useCourseStore((state) => state.courses);
  const reset = useCourseStore((state) => state.reset);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (): Promise<void> => {
    if (courses.length === 0) {
      toast.danger("No courses to submit");
      return;
    }

    try {
      z.array(courseFormSchema).parse(courses);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const firstError = err.issues[0];
        const index = firstError.path[0];
        const field = firstError.path[1];
        toast.danger(
          `Error in exam #${Number(index) + 1}: ${firstError.message}${field ? ` (${String(field)})` : ""}`,
        );
        return;
      }
      toast.danger("Validation failed");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = courses.map((course) => {
        const examDate = course.date;
        const startTimeStr = course.startTime;
        const endTimeStr = course.endTime;

        const adjustTime = (timeStr: string) => {
          if (!timeStr) return undefined;
          const [hours, minutes] = timeStr.split(":").map(Number);
          const adjustedHours = (hours + 7) % 24;
          return `${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
        };

        return {
          ...course,
          date: examDate ? `${examDate}T00:00:00Z` : undefined,
          startTime: adjustTime(startTimeStr),
          endTime: adjustTime(endTimeStr),
        };
      });

      const response = await axiosInstance.post("/api/admin/exam", payload);

      if (response.status === 201 || response.status === 200) {
        toast.success("Exams submitted successfully");
        reset();
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast.danger("Failed to submit exams");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
      <div className="text-center sm:text-left">
        <h1 className="text-primary text-4xl font-black tracking-tight sm:text-5xl">
          Add Exams
        </h1>
        <p className="text-primary/40 mt-1 text-lg font-medium">
          Create new exam schedules in the system
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onPress={onAddCourse}
          className="bg-primary hover:shadow-primary/20 h-12 rounded-xl px-8 text-sm font-black text-white shadow-lg transition-all active:scale-95"
        >
          <HiOutlinePlus className="text-xl" />
          ADD EXAM
        </Button>
        <Button
          isPending={isSubmitting}
          onPress={handleSubmit}
          className="h-12 rounded-xl bg-[#5289a1] px-8 text-sm font-black text-white shadow-lg transition-all hover:bg-[#3d6b7e] hover:shadow-[#5289a1]/20 active:scale-95"
        >
          <HiOutlineCheck className="text-xl" />
          SUBMIT ALL
        </Button>
      </div>
    </div>
  );
};
