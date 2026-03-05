"use client";

import React from "react";
import { Button } from "@heroui/react";
import { HiOutlinePlus, HiOutlineCheck } from "react-icons/hi";

interface CoursePageHeaderProps {
  onAddCourse: () => void;
}

export const CoursePageHeader: React.FC<CoursePageHeaderProps> = ({
  onAddCourse,
}) => {
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
        <Button className="h-12 rounded-xl bg-[#5289a1] px-8 text-sm font-black text-white shadow-lg transition-all hover:bg-[#3d6b7e] hover:shadow-[#5289a1]/20 active:scale-95">
          <HiOutlineCheck className="text-xl" />
          SUBMIT ALL
        </Button>
      </div>
    </div>
  );
};
