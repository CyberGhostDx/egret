"use client";

import React from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { CoursePageHeader } from "@/components/admin/exams/CoursePageHeader";
import { CourseFormCard } from "@/components/admin/exams/CourseFormCard";
import { CourseUploadSidebar } from "@/components/admin/exams/CourseUploadSidebar";

const AddCoursePage = () => {
  const { courses, addCourse, removeCourse, updateCourse } = useCourseStore();

  return (
    <div className="primary-bg text-primary min-h-screen p-6 sm:p-10">
      <div className="mx-auto max-w-[1400px]">
        <CoursePageHeader onAddCourse={addCourse} />

        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="w-full flex-1 space-y-8">
            {courses.map((course, index) => (
              <CourseFormCard
                key={course.id}
                course={course}
                index={index}
                onRemove={removeCourse}
                onUpdate={updateCourse}
              />
            ))}
          </div>

          <CourseUploadSidebar />
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;
