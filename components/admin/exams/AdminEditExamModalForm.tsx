"use client";

import React from "react";
import { TextField, Input, Label, Select, ListBox } from "@heroui/react";
import { CourseFormValues } from "@/schema/courseForm.schema";
import { HiOutlineInformationCircle, HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

interface AdminEditExamModalFormProps {
    course: CourseFormValues & { id: string };
    onUpdate: (id: string, data: Partial<CourseFormValues>) => void;
}

const SECTION_TYPES = ["Lecture", "Laboratory"];
const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export const AdminEditExamModalForm: React.FC<AdminEditExamModalFormProps> = ({
    course,
    onUpdate,
}) => {
    return (
        <div className="space-y-6 py-1">
            {/* Section 1: General Information */}
            <section>
                <div className="flex items-center gap-2 mb-3 border-b border-primary/5 pb-1.5">
                    <HiOutlineInformationCircle className="text-primary text-lg" />
                    <h3 className="text-primary font-black tracking-tight uppercase text-[11px]">General Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    <TextField value={course.courseId} onChange={(val) => onUpdate(course.id, { courseId: val })}>
                        <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Course ID</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <TextField value={course.subjectTh} onChange={(val) => onUpdate(course.id, { subjectTh: val })}>
                        <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Subject (TH)</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <TextField value={course.subjectEn} onChange={(val) => onUpdate(course.id, { subjectEn: val })}>
                        <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Subject (EN)</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <div className="grid grid-cols-2 gap-3">
                        <TextField value={course.section} onChange={(val) => onUpdate(course.id, { section: val })}>
                            <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Sec</Label>
                            <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none text-center text-sm font-bold transition-all" />
                        </TextField>

                        <div className="col-span-1">
                            <Select
                                onChange={(key) => key && onUpdate(course.id, { sectionType: key.toString() })}
                                value={course.sectionType || null}
                            >
                                <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Type</Label>
                                <Select.Trigger className="bg-primary/5 hover:bg-primary/10 flex h-9 w-full items-center justify-between rounded-xl border-none px-3 text-sm font-bold transition-all">
                                    <Select.Value />
                                    <Select.Indicator className="text-primary/30" />
                                </Select.Trigger>
                                <Select.Popover className="border-primary/10 rounded-xl border bg-white shadow-2xl">
                                    <ListBox className="p-1">
                                        {SECTION_TYPES.map((type) => (
                                            <ListBox.Item key={type} id={type} className="hover:bg-primary/5 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-colors">
                                                {type}
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </div>

                    <TextField type="number" value={course.credits.toString()} onChange={(val) => onUpdate(course.id, { credits: Number(val) })}>
                        <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Credits</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>
                </div>
            </section>

            {/* Section 2: Exam Schedule */}
            <section>
                <div className="flex items-center gap-2 mb-3 border-b border-primary/5 pb-1.5 pt-1">
                    <HiOutlineCalendar className="text-primary text-lg" />
                    <h3 className="text-primary font-black tracking-tight uppercase text-[11px]">Exam Schedule</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    <TextField type="date" value={course.date} onChange={(val) => onUpdate(course.id, { date: val })}>
                        <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Exam Date</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <div className="grid grid-cols-2 gap-3">
                        <TextField type="time" value={course.startTime} onChange={(val) => onUpdate(course.id, { startTime: val })}>
                            <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Start</Label>
                            <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-2 text-sm font-bold transition-all" />
                        </TextField>

                        <TextField type="time" value={course.endTime} onChange={(val) => onUpdate(course.id, { endTime: val })}>
                            <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">End</Label>
                            <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-2 text-sm font-bold transition-all" />
                        </TextField>
                    </div>
                </div>
            </section>

            {/* Section 3: Management & Location */}
            <section>
                <div className="flex items-center gap-2 mb-3 border-b border-primary/5 pb-1.5 pt-1">
                    <HiOutlineLocationMarker className="text-primary text-lg" />
                    <h3 className="text-primary font-black tracking-tight uppercase text-[11px]">Management & Location</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    <TextField value={course.instructorTh || ""} onChange={(val) => onUpdate(course.id, { instructorTh: val })}>
                        <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Instructor (TH)</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <TextField value={course.instructorEn || ""} onChange={(val) => onUpdate(course.id, { instructorEn: val })}>
                        <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Instructor (EN)</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <TextField value={course.proctor || ""} onChange={(val) => onUpdate(course.id, { proctor: val })}>
                        <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Proctor</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <div className="grid grid-cols-2 gap-3">
                        <TextField value={course.building || ""} onChange={(val) => onUpdate(course.id, { building: val })}>
                            <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Building</Label>
                            <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                        </TextField>
                        <TextField value={course.room || ""} onChange={(val) => onUpdate(course.id, { room: val })}>
                            <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Room</Label>
                            <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                        </TextField>
                    </div>

                    <div className="sm:col-span-2">
                        <TextField value={course.note || ""} onChange={(val) => onUpdate(course.id, { note: val })}>
                            <Label className="text-primary/60 mb-1 block text-[9px] font-bold tracking-wider uppercase">Note</Label>
                            <Input className="bg-primary/5 hover:bg-primary/10 h-9 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" placeholder="Any additional remarks..." />
                        </TextField>
                    </div>
                </div>
            </section>
        </div>
    );
};
