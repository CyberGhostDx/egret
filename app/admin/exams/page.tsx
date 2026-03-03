"use client";

import { useCourseStore } from "@/store/useCourseStore";

const CoursePage = () => {
  const { courses, addCourse, removeCourse, updateCourse } = useCourseStore();

  return (
    <div>
      <h1>Course Page</h1>
    </div>
  );
};

export default CoursePage;
