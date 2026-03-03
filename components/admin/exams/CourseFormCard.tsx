"use client";

import React from "react";
import { TextField, Input, Label, Card, Select, ListBox } from "@heroui/react";
import { IoClose } from "react-icons/io5";
import { CourseFormValues } from "@/schema/courseForm.schema";

interface CourseFormCardProps {
  course: CourseFormValues & { id: string };
  index: number;
  onRemove: (id: string) => void;
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
          {/* Row 1 */}
          <div className="col-span-2 lg:col-span-2">
            <TextField
              className="w-full"
              value={course.courseId}
              onChange={(val) => onUpdate(course.id, { courseId: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Exam ID
              </Label>
              <Input
                placeholder="รหัสวิชา"
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>
          <div className="col-span-2 sm:col-span-4 lg:col-span-5">
            <TextField
              className="w-full"
              value={course.subjectEn}
              onChange={(val) => onUpdate(course.id, { subjectEn: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Subject (EN)
              </Label>
              <Input
                placeholder="ชื่อวิชา (อังกฤษ)"
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>
          <div className="col-span-2 sm:col-span-6 lg:col-span-5">
            <TextField
              className="w-full"
              value={course.subjectTh}
              onChange={(val) => onUpdate(course.id, { subjectTh: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Subject (TH)
              </Label>
              <Input
                placeholder="ชื่อวิชา"
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>

          {/* Row 2 */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
            <TextField
              className="w-full"
              value={course.section}
              onChange={(val) => onUpdate(course.id, { section: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Sec
              </Label>
              <Input
                placeholder="หมู่เรียน"
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none text-center text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Select
              className="w-full"
              onChange={(key) => {
                if (key) onUpdate(course.id, { sectionType: key.toString() });
              }}
              value={course.sectionType || null}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Type
              </Label>
              <Select.Trigger className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 flex h-8 w-full items-center justify-between rounded-lg border-none px-2 text-xs font-medium transition-colors focus:bg-white focus:ring-1">
                <Select.Value />
                <Select.Indicator className="text-primary/30 scale-75" />
              </Select.Trigger>
              <Select.Popover className="border-primary/10 rounded-lg border bg-white shadow-xl backdrop-blur-xl">
                <ListBox className="p-1">
                  {SECTION_TYPES.map((type) => (
                    <ListBox.Item
                      key={type}
                      id={type}
                      textValue={type}
                      className="hover:bg-primary/5 cursor-pointer rounded-md px-2 py-1.5 text-xs font-medium transition-colors"
                    >
                      {type}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
            <TextField
              className="w-full"
              type="number"
              value={course.credits.toString()}
              onChange={(val) => onUpdate(course.id, { credits: Number(val) })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Credit
              </Label>
              <Input
                min={1}
                placeholder="หน่วยกิต"
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none text-center text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Select
              className="w-full"
              onChange={(key) => {
                if (key) onUpdate(course.id, { date: key.toString() });
              }}
              value={course.date || null}
              placeholder="เลือกวันสอบ"
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Date
              </Label>
              <Select.Trigger className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 flex h-8 w-full items-center justify-between rounded-lg border-none px-2 text-xs font-medium transition-colors focus:bg-white focus:ring-1">
                <Select.Value />
                <Select.Indicator className="text-primary/30 scale-75" />
              </Select.Trigger>
              <Select.Popover className="border-primary/10 rounded-lg border bg-white shadow-xl backdrop-blur-xl">
                <ListBox className="max-h-[200px] overflow-y-auto p-1">
                  {DAYS.map((day) => (
                    <ListBox.Item
                      key={day}
                      id={day}
                      textValue={day}
                      className="hover:bg-primary/5 cursor-pointer rounded-md px-2 py-1.5 text-xs font-medium transition-colors"
                    >
                      {day}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <TextField
              className="w-full"
              type="time"
              value={course.startTime}
              onChange={(val) => onUpdate(course.id, { startTime: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Start
              </Label>
              <Input className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1" />
            </TextField>
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <TextField
              className="w-full"
              type="time"
              value={course.endTime}
              onChange={(val) => onUpdate(course.id, { endTime: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                End
              </Label>
              <Input className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1" />
            </TextField>
          </div>
          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
            <TextField
              className="w-full"
              value={course.building || ""}
              onChange={(val) => onUpdate(course.id, { building: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Building
              </Label>
              <Input
                placeholder="ตึกสอบ"
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>
          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
            <TextField
              className="w-full"
              value={course.room || ""}
              onChange={(val) => onUpdate(course.id, { room: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Room
              </Label>
              <Input
                placeholder="ห้องสอบ"
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>

          {/* Row 3 */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <TextField
              className="w-full"
              value={course.proctor || ""}
              onChange={(val) => onUpdate(course.id, { proctor: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Proctor
              </Label>
              <Input
                placeholder="ผู้คุมสอบ"
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>
          <div className="col-span-2 sm:col-span-2 lg:col-span-3">
            <TextField
              className="w-full"
              value={course.instructorTh || ""}
              onChange={(val) => onUpdate(course.id, { instructorTh: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Inst(TH)
              </Label>
              <Input
                placeholder="อาจารย์ผู้สอน"
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>
          <div className="col-span-2 sm:col-span-2 lg:col-span-3">
            <TextField
              className="w-full"
              value={course.instructorEn || ""}
              onChange={(val) => onUpdate(course.id, { instructorEn: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Inst(EN)
              </Label>
              <Input
                placeholder="อาจารย์ (อังกฤษ)"
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>
          <div className="col-span-2 sm:col-span-6 lg:col-span-4">
            <TextField
              className="w-full"
              value={course.note || ""}
              onChange={(val) => onUpdate(course.id, { note: val })}
            >
              <Label className="text-primary/60 mb-1 block text-[10px] font-bold tracking-wider uppercase">
                Note
              </Label>
              <Input
                placeholder="หมายเหตุ..."
                className="bg-primary/5 hover:bg-primary/10 focus:ring-primary/20 h-8 w-full rounded-lg border-none px-2.5 text-xs font-medium transition-colors focus:bg-white focus:ring-1"
              />
            </TextField>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};
