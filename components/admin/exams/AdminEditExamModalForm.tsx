import React from "react";
import {
    TextField,
    Input,
    Label,
    Select,
    ListBox,
    DatePicker,
    Calendar,
    DateField,
    TimeField,
    FieldError,
} from "@heroui/react";
import { parseTime, parseDate, CalendarDate } from "@internationalized/date";
import type { DateValue, TimeValue } from "react-aria-components";
import { CourseFormValues } from "@/schema/courseForm.schema";
import { HiOutlineInformationCircle, HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

interface AdminEditExamModalFormProps {
    course: CourseFormValues & { id: string };
    onUpdate: (id: string, data: Partial<CourseFormValues>) => void;
}

const SECTION_TYPES = ["Lecture", "Laboratory"];

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
                    <h3 className="text-primary font-black tracking-tight uppercase text-xs">General Information</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    <TextField value={course.courseId} onChange={(val) => onUpdate(course.id, { courseId: val })}>
                        <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Course ID</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <TextField value={course.subjectTh} onChange={(val) => onUpdate(course.id, { subjectTh: val })}>
                        <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Subject (TH)</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <TextField value={course.subjectEn} onChange={(val) => onUpdate(course.id, { subjectEn: val })}>
                        <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Subject (EN)</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <div className="grid grid-cols-2 gap-3">
                        <TextField value={course.section} onChange={(val) => onUpdate(course.id, { section: val })}>
                            <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Sec</Label>
                            <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none text-center text-sm font-bold transition-all" />
                        </TextField>

                        <div className="col-span-1">
                            <Select
                                onChange={(key) => key && onUpdate(course.id, { sectionType: key.toString() })}
                                value={course.sectionType || null}
                            >
                                <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Type</Label>
                                <Select.Trigger className="bg-primary/5 hover:bg-primary/10 flex h-10 w-full items-center justify-between rounded-xl border-none px-3 text-sm font-bold transition-all">
                                    <Select.Value />
                                    <Select.Indicator className="text-primary/30" />
                                </Select.Trigger>
                                <Select.Popover className="border-primary/10 rounded-xl border bg-white shadow-2xl scale-100 opacity-100">
                                    <ListBox className="p-1 min-w-[120px]">
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
                        <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Credits</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>
                </div>
            </section>

            {/* Section 2: Exam Schedule */}
            <section>
                <div className="flex items-center gap-2 mb-3 border-b border-primary/5 pb-1.5 pt-1">
                    <HiOutlineCalendar className="text-primary text-lg" />
                    <h3 className="text-primary font-black tracking-tight uppercase text-xs">Exam Schedule</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    <DatePicker
                        className="w-full"
                        hourCycle={24}
                        value={course.date ? parseDate(course.date) : null}
                        onChange={(val: DateValue | null) => {
                            if (val) onUpdate(course.id, { date: val.toString() });
                        }}
                    >
                        <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Exam Date</Label>
                        <DateField.Group className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all flex items-center justify-between">
                            <DateField.Input className="flex gap-0.5">
                                {(segment) => <DateField.Segment segment={segment} className="focus:bg-primary/20 focus:text-primary rounded px-0.5 outline-none" />}
                            </DateField.Input>
                            <DatePicker.Trigger className="text-primary/30 hover:text-primary transition-colors">
                                <DatePicker.TriggerIndicator className="size-4" />
                            </DatePicker.Trigger>
                        </DateField.Group>
                        <DatePicker.Popover className="z-[100] border-primary/10 rounded-2xl border bg-white shadow-2xl p-2 mt-2">
                            <Calendar aria-label="Exam date" className="min-w-[280px]">
                                <Calendar.Header className="flex items-center justify-between mb-2 px-1">
                                    <Calendar.YearPickerTrigger className="text-sm font-bold text-primary flex items-center gap-1 hover:bg-primary/5 px-2 py-1 rounded-lg transition-colors">
                                        <Calendar.YearPickerTriggerHeading />
                                        <Calendar.YearPickerTriggerIndicator className="size-3" />
                                    </Calendar.YearPickerTrigger>
                                    <div className="flex items-center gap-1">
                                        <Calendar.NavButton slot="previous" className="p-1.5 hover:bg-primary/5 rounded-lg text-primary transition-colors" />
                                        <Calendar.NavButton slot="next" className="p-1.5 hover:bg-primary/5 rounded-lg text-primary transition-colors" />
                                    </div>
                                </Calendar.Header>
                                <Calendar.Grid className="w-full border-separate border-spacing-1">
                                    <Calendar.GridHeader>
                                        {(day: string) => (
                                            <Calendar.HeaderCell className="text-[10px] font-bold text-slate-400 uppercase w-9 h-9">
                                                {day}
                                            </Calendar.HeaderCell>
                                        )}
                                    </Calendar.GridHeader>
                                    <Calendar.GridBody>
                                        {(date: CalendarDate) => (
                                            <Calendar.Cell date={date} className="w-9 h-9 text-xs font-bold rounded-lg hover:bg-primary/10 cursor-pointer flex items-center justify-center aria-selected:bg-primary aria-selected:text-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/20" />
                                        )}
                                    </Calendar.GridBody>
                                </Calendar.Grid>
                                <Calendar.YearPickerGrid className="w-full border-separate border-spacing-1 mt-2">
                                    <Calendar.YearPickerGridBody>
                                        {({ year }: { year: number }) => (
                                            <Calendar.YearPickerCell year={year} className="text-xs font-bold p-2 text-center rounded-lg hover:bg-primary/10 cursor-pointer aria-selected:bg-primary aria-selected:text-white transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/20" />
                                        )}
                                    </Calendar.YearPickerGridBody>
                                </Calendar.YearPickerGrid>
                            </Calendar>
                        </DatePicker.Popover>
                    </DatePicker>

                    <div className="grid grid-cols-2 gap-3">
                        <TimeField
                            className="w-full"
                            hourCycle={24}
                            value={course.startTime ? parseTime(course.startTime) : null}
                            onChange={(val: TimeValue | null) =>
                                onUpdate(course.id, { startTime: val ? val.toString().slice(0, 5) : "" })
                            }
                        >
                            <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Start</Label>
                            <TimeField.Group className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all flex items-center">
                                <TimeField.Input className="flex gap-0.5">
                                    {(segment) => <TimeField.Segment segment={segment} className="focus:bg-primary/20 focus:text-primary rounded px-0.5 outline-none" />}
                                </TimeField.Input>
                            </TimeField.Group>
                        </TimeField>

                        <TimeField
                            className="w-full"
                            hourCycle={24}
                            value={course.endTime ? parseTime(course.endTime) : null}
                            onChange={(val: TimeValue | null) =>
                                onUpdate(course.id, { endTime: val ? val.toString().slice(0, 5) : "" })
                            }
                        >
                            <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">End</Label>
                            <TimeField.Group className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all flex items-center">
                                <TimeField.Input className="flex gap-0.5">
                                    {(segment) => <TimeField.Segment segment={segment} className="focus:bg-primary/20 focus:text-primary rounded px-0.5 outline-none" />}
                                </TimeField.Input>
                            </TimeField.Group>
                        </TimeField>
                    </div>
                </div>
            </section>

            {/* Section 3: Management & Location */}
            <section>
                <div className="flex items-center gap-2 mb-3 border-b border-primary/5 pb-1.5 pt-1">
                    <HiOutlineLocationMarker className="text-primary text-lg" />
                    <h3 className="text-primary font-black tracking-tight uppercase text-xs">Management & Location</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                    <TextField value={course.instructorTh || ""} onChange={(val) => onUpdate(course.id, { instructorTh: val })}>
                        <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Instructor (TH)</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <TextField value={course.instructorEn || ""} onChange={(val) => onUpdate(course.id, { instructorEn: val })}>
                        <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Instructor (EN)</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <TextField value={course.proctor || ""} onChange={(val) => onUpdate(course.id, { proctor: val })}>
                        <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Proctor</Label>
                        <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                    </TextField>

                    <div className="grid grid-cols-2 gap-3">
                        <TextField value={course.building || ""} onChange={(val) => onUpdate(course.id, { building: val })}>
                            <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Building</Label>
                            <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                        </TextField>
                        <TextField value={course.room || ""} onChange={(val) => onUpdate(course.id, { room: val })}>
                            <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Room</Label>
                            <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" />
                        </TextField>
                    </div>

                    <div className="sm:col-span-2">
                        <TextField value={course.note || ""} onChange={(val) => onUpdate(course.id, { note: val })}>
                            <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">Note</Label>
                            <Input className="bg-primary/5 hover:bg-primary/10 h-10 w-full rounded-xl border-none px-3 text-sm font-bold transition-all" placeholder="Any additional remarks..." />
                        </TextField>
                    </div>
                </div>
            </section>
        </div>
    );
};
