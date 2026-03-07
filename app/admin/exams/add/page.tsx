"use client";

import React from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { CoursePageHeader } from "@/components/admin/exams/CoursePageHeader";
import { CourseFormCard } from "@/components/admin/exams/CourseFormCard";
const AddCoursePage = () => {
  const { courses, addCourse, removeCourse, updateCourse } = useCourseStore();

  return (
    <div className="relative min-h-screen bg-slate-50/50 p-6 sm:p-10 md:px-12">
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-100/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1000px]">
        <div>
          <CoursePageHeader onAddCourse={addCourse} />
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="w-full space-y-6">
            {courses.map((course, index) => (
              <div key={course.id}>
                <CourseFormCard
                  course={course}
                  index={index}
                  onRemove={removeCourse}
                  onUpdate={updateCourse}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;
