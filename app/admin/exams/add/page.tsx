"use client";

import React from "react";
import { useCourseStore } from "@/store/useCourseStore";
import { CoursePageHeader } from "@/components/admin/exams/CoursePageHeader";
import { CourseFormCard } from "@/components/admin/exams/CourseFormCard";
import { CourseUploadSidebar } from "@/components/admin/exams/CourseUploadSidebar";

import { motion } from "framer-motion";

const AddCoursePage = () => {
  const { courses, addCourse, removeCourse, updateCourse } = useCourseStore();

  return (
    <div className="relative min-h-screen bg-slate-50/50 p-6 sm:p-10 md:px-12">
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-100/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CoursePageHeader onAddCourse={addCourse} />
        </motion.div>

        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="w-full flex-1 space-y-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <CourseFormCard
                  course={course}
                  index={index}
                  onRemove={removeCourse}
                  onUpdate={updateCourse}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full lg:w-auto"
          >
            <CourseUploadSidebar />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;
