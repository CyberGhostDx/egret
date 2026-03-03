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
    <div className="mb-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
      <div className="text-center sm:text-left">
        <h1 className="text-primary text-3xl font-black tracking-tight sm:text-4xl">
          Add Exams
        </h1>
        <p className="text-primary/40 text-sm font-medium">
          Create new exam schedules
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onPress={onAddCourse}
          className="bg-primary hover:shadow-primary/20 h-11 rounded-xl px-6 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#204d5a] active:scale-95"
        >
          <HiOutlinePlus className="text-lg" />
          ADD EXAM
        </Button>
        <Button className="h-11 rounded-xl bg-[#5289a1] px-6 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#3d6b7e] hover:shadow-[#5289a1]/20 active:scale-95">
          <HiOutlineCheck className="text-lg" />
          SUBMIT ALL
        </Button>
      </div>
    </div>
  );
};
