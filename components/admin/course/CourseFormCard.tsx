"use client";

import React from "react";
import { Input, Card, Label, TextArea } from "@heroui/react";
import { IoClose } from "react-icons/io5";
import { CourseFormValues } from "@/schema/courseForm.schema";

interface CourseFormCardProps {
    course: CourseFormValues & { id: string };
    index: number;
    onRemove: (id: string) => void;
    onUpdate: (id: string, data: Partial<CourseFormValues>) => void;
}

const FormItem = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-semibold text-[#296374]/80 ml-1">
            {label}
        </Label>
        {children}
    </div>
);

export const CourseFormCard: React.FC<CourseFormCardProps> = ({
    course,
    index,
    onRemove,
    onUpdate,
}) => {
    return (
        <Card className="relative overflow-visible border-none bg-white p-8 shadow-lg rounded-[2rem]">
            <button
                onClick={() => onRemove(course.id)}
                className="absolute -right-2 -top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#E7313D] text-white shadow-lg transition-transform hover:scale-110 active:scale-90"
            >
                <IoClose className="text-lg" />
            </button>

            <h2 className="mb-6 text-xl font-extrabold text-[#296374]/90">
                Course {index + 1}
            </h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
                <FormItem label="Course ID">
                    <Input
                        placeholder="e.g. 01001234"
                        className="font-medium"
                        value={course.courseId}
                        onChange={(e) => onUpdate(course.id, { courseId: e.target.value })}
                    />
                </FormItem>
                <FormItem label="Subject (EN)">
                    <Input
                        placeholder="Subject Name"
                        className="font-medium"
                        value={course.subjectEn}
                        onChange={(e) => onUpdate(course.id, { subjectEn: e.target.value })}
                    />
                </FormItem>
                <FormItem label="Subject (TH)">
                    <Input
                        placeholder="ชื่อวิชา"
                        className="font-medium"
                        value={course.subjectTh}
                        onChange={(e) => onUpdate(course.id, { subjectTh: e.target.value })}
                    />
                </FormItem>

                <FormItem label="Section">
                    <Input
                        placeholder="e.g. 1"
                        className="font-medium"
                        value={course.section}
                        onChange={(e) => onUpdate(course.id, { section: e.target.value })}
                    />
                </FormItem>
                <FormItem label="Section Type">
                    <Input
                        placeholder="e.g. Lecture"
                        className="font-medium"
                        value={course.sectionType}
                        onChange={(e) =>
                            onUpdate(course.id, { sectionType: e.target.value })
                        }
                    />
                </FormItem>
                <FormItem label="Credits">
                    <Input
                        placeholder="3"
                        type="number"
                        className="font-medium"
                        value={course.credits.toString()}
                        onChange={(e) =>
                            onUpdate(course.id, { credits: Number(e.target.value) })
                        }
                    />
                </FormItem>

                <FormItem label="Date">
                    <Input
                        placeholder="e.g. Monday"
                        className="font-medium"
                        value={course.date}
                        onChange={(e) => onUpdate(course.id, { date: e.target.value })}
                    />
                </FormItem>
                <FormItem label="Start Time">
                    <Input
                        placeholder="09:00"
                        type="time"
                        className="font-medium"
                        value={course.startTime}
                        onChange={(e) => onUpdate(course.id, { startTime: e.target.value })}
                    />
                </FormItem>
                <FormItem label="End Time">
                    <Input
                        placeholder="12:00"
                        type="time"
                        className="font-medium"
                        value={course.endTime}
                        onChange={(e) => onUpdate(course.id, { endTime: e.target.value })}
                    />
                </FormItem>

                <FormItem label="Building">
                    <Input
                        placeholder="e.g. CB1"
                        className="font-medium"
                        value={course.building || ""}
                        onChange={(e) => onUpdate(course.id, { building: e.target.value })}
                    />
                </FormItem>
                <FormItem label="Room">
                    <Input
                        placeholder="e.g. 101"
                        className="font-medium"
                        value={course.room || ""}
                        onChange={(e) => onUpdate(course.id, { room: e.target.value })}
                    />
                </FormItem>
                <FormItem label="Proctor">
                    <Input
                        placeholder="Exam Proctor"
                        className="font-medium"
                        value={course.proctor || ""}
                        onChange={(e) => onUpdate(course.id, { proctor: e.target.value })}
                    />
                </FormItem>

                <FormItem label="Instructor (TH)">
                    <Input
                        placeholder="ชื่อผู้สอน"
                        className="font-medium"
                        value={course.instructorTh || ""}
                        onChange={(e) =>
                            onUpdate(course.id, { instructorTh: e.target.value })
                        }
                    />
                </FormItem>
                <FormItem label="Instructor (EN)">
                    <Input
                        placeholder="Instructor Name"
                        className="font-medium"
                        value={course.instructorEn || ""}
                        onChange={(e) =>
                            onUpdate(course.id, { instructorEn: e.target.value })
                        }
                    />
                </FormItem>
                <FormItem label="Note">
                    <TextArea
                        className="min-h-[42px] font-medium"
                        placeholder="Additional notes..."
                        value={course.note || ""}
                        onChange={(e) => onUpdate(course.id, { note: e.target.value })}
                    />
                </FormItem>
            </div>
        </Card>
    );
};
