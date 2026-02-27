"use client";

import React from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { CoursePageHeader } from "@/components/admin/course/CoursePageHeader";
import { CourseFormCard } from "@/components/admin/course/CourseFormCard";
import { CourseUploadSidebar } from "@/components/admin/course/CourseUploadSidebar";

const CoursePage = () => {
  const { courses, addCourse, removeCourse, updateCourse } = useCourseStore();

  return (
    <div className="min-h-screen primary-bg p-6 sm:p-10 text-[#296374]">
      <div className="mx-auto max-w-[1400px]">
        <CoursePageHeader onAddCourse={addCourse} />

        <div className="flex flex-col gap-8 lg:flex-row items-start">
          <div className="flex-1 space-y-8 w-full">
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

export default CoursePage;
