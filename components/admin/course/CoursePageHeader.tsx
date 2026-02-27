"use client";

import React from "react";
import { Button } from "@heroui/react";

interface CoursePageHeaderProps {
    onAddCourse: () => void;
}

export const CoursePageHeader: React.FC<CoursePageHeaderProps> = ({
    onAddCourse,
}) => {
    return (
        <div className="mb-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#296374]">
                Add Courses
            </h1>
            <div className="flex gap-4">
                <Button
                    onPress={onAddCourse}
                    className="h-11 rounded-full bg-[#296374] px-8 font-bold text-white shadow-md transition-all hover:bg-[#204d5a] active:scale-95"
                >
                    + ADD COURSE
                </Button>
                <Button className="h-11 rounded-full bg-[#2B4E74] px-8 font-bold text-white shadow-md transition-all hover:bg-[#1f3955] active:scale-95">
                    SUBMIT ALL
                </Button>
            </div>
        </div>
    );
};
