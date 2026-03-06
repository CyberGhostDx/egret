"use client";

import { useState, useMemo, useDeferredValue } from "react";
import { useCourses } from "@/hooks/useCourses";
import CourseCard from "@/components/courses/CourseCard";
import { InputGroup } from "@heroui/react";
import { LuSearch } from "react-icons/lu";
import { useTranslations } from "next-intl";

export default function CoursesPage() {
  const t = useTranslations("Courses");
  const { courses, isLoading } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const filterCourses = useMemo(() => {
    if (!courses) return [];
    const query = deferredSearchQuery.toLowerCase().trim();
    if (!query) return courses;

    return courses.filter((course) => {
      const courseId = course.id.toLowerCase();
      const titleTh = course.titleTh.toLowerCase();
      const titleEn = course.titleEn?.toLowerCase() || "";

      return (
        courseId.includes(query) ||
        titleTh.includes(query) ||
        titleEn.includes(query) ||
        `${courseId} ${titleTh}`.includes(query) ||
        `${courseId} ${titleEn}`.includes(query)
      );
    });
  }, [courses, deferredSearchQuery]);

  return (
    <div className="primary-bg min-h-screen w-full bg-fixed">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-primary mb-2 text-[3.5rem] leading-none font-bold tracking-tight">
              EGRET
            </h1>
            <p className="text-primary/70 text-xl font-medium">
              Engineering Generated Rapid Exam Table
            </p>
          </div>
          <div className="w-full md:w-fit">
            <InputGroup className="w-full md:w-100">
              <InputGroup.Prefix>
                <LuSearch className="text-primary/70 mr-2 h-4 w-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                className="w-full"
                placeholder={t("SearchCourse")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>

        {isLoading && !courses?.length ? (
          <div className="text-primary py-10 text-center">
            {t("LoadingDetails")}
          </div>
        ) : filterCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {filterCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                difficulty={course.difficulty}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-primary mb-2 text-2xl font-bold">
              {t("NoCoursesFound")}
            </h2>
            <p className="text-primary/60 text-lg">{t("NoCourseNote")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
