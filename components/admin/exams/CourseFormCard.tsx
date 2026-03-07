"use client";

import React from "react";
import {
  TextField,
  Input,
  Label,
  Card,
  Select,
  ListBox,
  FieldError,
  TimeField,
  DatePicker,
  Calendar,
  DateField,
} from "@heroui/react";
import { parseTime, parseDate, CalendarDate } from "@internationalized/date";
import type { DateValue, TimeValue } from "react-aria-components";
import type { Key } from "react";
import { IoClose } from "react-icons/io5";
import { CourseFormValues } from "@/schema/courseForm.schema";

interface CourseFormCardProps {
  course: CourseFormValues & { id: string };
  index: number;
  onRemove: (id: string) => void;
  onUpdate: (id: string, data: Partial<CourseFormValues>) => void;
}

const SECTION_TYPES = ["Lecture", "Laboratory"];

export const CourseFormCard: React.FC<CourseFormCardProps> = ({
  course,
  index,
  onRemove,
  onUpdate,
}) => {
  return (
    <Card className="group border-primary/10 hover:border-primary/30 relative overflow-visible rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <Card.Header className="mb-3 flex items-center justify-between p-0">
        <h2 className="text-primary text-sm font-black tracking-tight uppercase">
          Exam {index + 1}
        </h2>
        <button
          onClick={() => onRemove(course.id)}
          className="flex h-6 w-6 items-center justify-center rounded-md bg-red-50 text-red-500 opacity-60 transition-all hover:bg-red-500 hover:text-white hover:opacity-100"
          title="Remove Exam"
        >
          <IoClose className="text-sm" />
        </button>
      </Card.Header>

      <Card.Content className="p-0">
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-6 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-2">
            <TextField
              isRequired
              isInvalid={!course.courseId}
              className="w-full"
              value={course.courseId}
              onChange={(val: string) => onUpdate(course.id, { courseId: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Course ID
              </Label>
              <Input placeholder="รหัสวิชา" />
              <FieldError className="mt-0.5 text-[9px] font-bold text-red-500" />
            </TextField>
          </div>
          <div className="col-span-2 sm:col-span-4 lg:col-span-5">
            <TextField
              isRequired
              isInvalid={!course.subjectEn}
              className="w-full"
              value={course.subjectEn}
              onChange={(val: string) =>
                onUpdate(course.id, { subjectEn: val })
              }
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Subject (EN)
              </Label>
              <Input placeholder="ชื่อวิชา (ภาษาอังกฤษ)" />
              <FieldError className="mt-0.5 text-[9px] font-bold text-red-500" />
            </TextField>
          </div>
          <div className="col-span-2 sm:col-span-6 lg:col-span-5">
            <TextField
              isRequired
              isInvalid={!course.subjectTh}
              className="w-full"
              value={course.subjectTh}
              onChange={(val: string) =>
                onUpdate(course.id, { subjectTh: val })
              }
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Subject (TH)
              </Label>
              <Input placeholder="ชื่อภาษาไทย" />
              <FieldError className="mt-0.5 text-[9px] font-bold text-red-500" />
            </TextField>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <TextField
              isRequired
              isInvalid={!course.section}
              className="w-full"
              value={course.section}
              onChange={(val: string) => onUpdate(course.id, { section: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Sec
              </Label>
              <Input placeholder="หมู่" />
            </TextField>
          </div>
          <div className="col-span-2 lg:col-span-2">
            <Select
              isRequired
              isInvalid={!course.sectionType}
              className="w-full"
              onChange={(key: Key | null) => {
                if (key) onUpdate(course.id, { sectionType: key.toString() });
              }}
              value={course.sectionType || null}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Type
              </Label>
              <Select.Trigger className="">
                <Select.Value />
                <Select.Indicator className="" />
              </Select.Trigger>
              <Select.Popover className="">
                <ListBox className="p-1">
                  {SECTION_TYPES.map((type) => (
                    <ListBox.Item
                      key={type}
                      id={type}
                      textValue={type}
                      className=""
                    >
                      {type}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <TextField
              isRequired
              className="w-full"
              type="number"
              value={course.credits.toString()}
              onChange={(val: string) =>
                onUpdate(course.id, { credits: Number(val) })
              }
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Credit
              </Label>
              <Input min={1} placeholder="นก." />
            </TextField>
          </div>
          <div className="col-span-2 lg:col-span-3">
            <DatePicker
              isRequired
              isInvalid={!course.date}
              className="w-full"
              value={course.date ? parseDate(course.date) : null}
              onChange={(val: DateValue | null) => {
                if (val) onUpdate(course.id, { date: val.toString() });
              }}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Date
              </Label>
              <DateField.Group className="">
                <DateField.Input className="">
                  {(segment) => (
                    <DateField.Segment segment={segment} className="" />
                  )}
                </DateField.Input>
                <DateField.Suffix className="flex items-center">
                  <DatePicker.Trigger className="text-primary/30 hover:text-primary transition-colors">
                    <DatePicker.TriggerIndicator className="size-3.5" />
                  </DatePicker.Trigger>
                </DateField.Suffix>
              </DateField.Group>
              <FieldError className="mt-0.5 text-[9px] font-bold text-red-500" />
              <DatePicker.Popover className="">
                <Calendar aria-label="Exam date" className="">
                  <Calendar.Header className="">
                    <Calendar.YearPickerTrigger className="">
                      <Calendar.YearPickerTriggerHeading />
                      <Calendar.YearPickerTriggerIndicator className="" />
                    </Calendar.YearPickerTrigger>
                    <div className="flex items-center gap-1">
                      <Calendar.NavButton slot="previous" className="" />
                      <Calendar.NavButton slot="next" className="" />
                    </div>
                  </Calendar.Header>
                  <Calendar.Grid className="">
                    <Calendar.GridHeader>
                      {(day: string) => (
                        <Calendar.HeaderCell className="">
                          {day}
                        </Calendar.HeaderCell>
                      )}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>
                      {(date: CalendarDate) => (
                        <Calendar.Cell date={date} className="" />
                      )}
                    </Calendar.GridBody>
                  </Calendar.Grid>
                  <Calendar.YearPickerGrid className="">
                    <Calendar.YearPickerGridBody>
                      {({ year }: { year: number }) => (
                        <Calendar.YearPickerCell year={year} className="" />
                      )}
                    </Calendar.YearPickerGridBody>
                  </Calendar.YearPickerGrid>
                </Calendar>
              </DatePicker.Popover>
            </DatePicker>
          </div>
          <div className="col-span-1 lg:col-span-1">
            <TimeField
              isRequired
              hourCycle={24}
              isInvalid={!course.startTime}
              className="w-full"
              value={course.startTime ? parseTime(course.startTime) : null}
              onChange={(val: TimeValue | null) =>
                onUpdate(course.id, {
                  startTime: val ? val.toString().slice(0, 5) : "",
                })
              }
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Start
              </Label>
              <TimeField.Group className="">
                <TimeField.Input className="">
                  {(segment) => (
                    <TimeField.Segment segment={segment} className="" />
                  )}
                </TimeField.Input>
              </TimeField.Group>
            </TimeField>
          </div>
          <div className="">
            <TimeField
              isRequired
              hourCycle={24}
              isInvalid={!course.endTime}
              className="w-full"
              value={course.endTime ? parseTime(course.endTime) : null}
              onChange={(val: TimeValue | null) =>
                onUpdate(course.id, {
                  endTime: val ? val.toString().slice(0, 5) : "",
                })
              }
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                End
              </Label>
              <TimeField.Group className="">
                <TimeField.Input className="mx-auto flex items-center gap-0.5">
                  {(segment) => (
                    <TimeField.Segment segment={segment} className="" />
                  )}
                </TimeField.Input>
              </TimeField.Group>
            </TimeField>
          </div>
          <div className="col-span-1">
            <TextField
              className="w-full"
              value={course.building || ""}
              onChange={(val: string) => onUpdate(course.id, { building: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Builidng
              </Label>
              <Input placeholder="ตึก" />
            </TextField>
          </div>
          <div className="col-span-1">
            <TextField
              className="w-full"
              value={course.room || ""}
              onChange={(val: string) => onUpdate(course.id, { room: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Room
              </Label>
              <Input placeholder="ห้องสอบ" />
            </TextField>
          </div>

          <div className="col-span-2 lg:col-span-4">
            <TextField
              className="w-full"
              value={course.proctor || ""}
              onChange={(val: string) => onUpdate(course.id, { proctor: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Proctor
              </Label>
              <Input placeholder="ผู้คุมสอบ" />
            </TextField>
          </div>
          <div className="col-span-2 lg:col-span-4">
            <TextField
              className="w-full"
              value={course.instructorTh || ""}
              onChange={(val: string) =>
                onUpdate(course.id, { instructorTh: val })
              }
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Inst(TH)
              </Label>
              <Input placeholder="อาจารย์ผู้สอน" />
            </TextField>
          </div>
          <div className="col-span-2 lg:col-span-4">
            <TextField
              className="w-full"
              value={course.instructorEn || ""}
              onChange={(val: string) =>
                onUpdate(course.id, { instructorEn: val })
              }
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Inst(EN)
              </Label>
              <Input placeholder="Instructor (EN)" />
            </TextField>
          </div>
          <div className="col-span-2 sm:col-span-6 lg:col-span-12">
            <TextField
              className="w-full"
              value={course.note || ""}
              onChange={(val: string) => onUpdate(course.id, { note: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Note
              </Label>
              <Input placeholder="หมายเหตุเพิ่มเติม..." />
            </TextField>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};
