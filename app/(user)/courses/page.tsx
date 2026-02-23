"use client";

import { useEffect } from "react";
import { useCoursesStore } from "@/store/useCoursesStore";
import CourseCard from "@/components/courses/CourseCard";
import { InputGroup } from "@heroui/react";
import { LuSearch } from "react-icons/lu";

export default function CoursesPage() {
  const { courses, isLoading, fetchCourses } = useCoursesStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);


  return (
    <div className="w-full min-h-screen primary-bg bg-fixed">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-[3.5rem] leading-none font-bold text-primary tracking-tight mb-2">
              EGRET
            </h1>
            <p className="text-xl text-primary/70 font-medium">
              Engineering Generated Rapid Exam Table
            </p>
          </div>
          <div className="w-full md:w-fit">
            <InputGroup className="w-full md:w-100">
              <InputGroup.Prefix>
                <LuSearch className="text-primary/70 w-4 h-4 mr-2" />
              </InputGroup.Prefix>
              <InputGroup.Input
                className="w-full"
                placeholder="Search Course"
              />
            </InputGroup>
          </div>
        </div>

        {isLoading && !courses?.length ? (
          <div className="text-center py-10 text-primary">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {courses?.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
                difficulty={0}
              />
            ))}
          </div>
        )}
      </div>
    </div>

  );
}