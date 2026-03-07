"use client";

import React from "react";
import { Table, Button, Skeleton, Avatar, Chip, cn } from "@heroui/react";
import { LuPencil, LuTrash, LuCopy, LuUser } from "react-icons/lu";
import { type CourseOffering } from "@/schema/backend.schema";

interface AdminExamsTableProps {
  exams: CourseOffering[] | null;
  isLoading: boolean;
  onEdit: (exam: CourseOffering) => void;
  onDelete?: (id: string) => void;
}

export const AdminExamsTable: React.FC<AdminExamsTableProps> = ({
  exams,
  isLoading,
  onEdit,
}): React.ReactElement => {
  const formatValue = (
    value: string | number | undefined | null,
  ): React.ReactNode => {
    return value && value !== "-" ? (
      value
    ) : (
      <span className="font-medium text-slate-300 italic">ไม่มีข้อมูล</span>
    );
  };

  return (
    <Table className="overflow-hidden rounded-3xl border-none bg-white/80 p-0 shadow-2xl backdrop-blur-md">
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Admin Exams Table"
          className="min-w-[1000px]"
        >
          <Table.Header>
            <Table.Column
              isRowHeader
              className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase"
            >
              SUBJECT ID
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              SUBJECT NAME
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              SEC / TYPE
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              INSTRUCTOR
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              SCHEDULE
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-end text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              ACTIONS
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <Table.Row
                  key={`loading-${i}`}
                  className="border-b border-slate-50"
                >
                  <Table.Cell className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-16 rounded-lg" />
                      <Skeleton className="h-8 w-8 rounded-xl" />
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-40 rounded-lg" />
                        <Skeleton className="h-3 w-24 rounded-lg" />
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <Skeleton className="h-4 w-32 rounded-lg" />
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <Skeleton className="h-8 w-32 rounded-xl" />
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4 text-end">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-9 w-9 rounded-xl" />
                      <Skeleton className="h-9 w-9 rounded-xl" />
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : exams && exams.length > 0 ? (
              exams.map((exam) => (
                <Table.Row
                  key={exam.id}
                  className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
                >
                  <Table.Cell className="px-6 py-4">
                    <div className="group flex items-center gap-2">
                      <span className="text-primary text-sm font-bold">
                        #{exam.courseId}
                      </span>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="h-8 min-w-8 rounded-lg text-slate-400 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <LuCopy className="size-3.5" />
                      </Button>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">
                        {exam.courseId}
                      </span>
                      <span className="text-[10px] font-bold tracking-tight text-slate-400 uppercase">
                        {exam.course.titleTh}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <Chip
                        size="sm"
                        variant="soft"
                        className="bg-primary/5 text-primary h-5 px-1 text-[10px] font-bold"
                      >
                        SEC {exam.section}
                      </Chip>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {formatValue(exam.sectionType)}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="min-w-[200px] px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Avatar
                        size="sm"
                        className="h-7 w-7 bg-slate-100 text-slate-400"
                      >
                        <Avatar.Fallback>
                          <LuUser />
                        </Avatar.Fallback>
                      </Avatar>
                      <span className="text-xs font-bold text-slate-600">
                        {formatValue(exam.instructorTh || exam.instructorEn)}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="min-w-[200px] px-6 py-4">
                    <div className="flex flex-col">
                      {exam.exams && exam.exams.length > 0 ? (
                        <div className="flex flex-col gap-0.5 rounded-xl border border-slate-100/50 bg-slate-50 p-2">
                          <span className="text-[10px] font-black text-slate-700">
                            {new Date(
                              exam.exams[0].examDate,
                            ).toLocaleDateString("th-TH")}
                          </span>
                          <span className="text-primary text-[10px] font-bold">
                            {new Date(
                              exam.exams[0].startTime,
                            ).toLocaleTimeString("th-TH", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {new Date(exam.exams[0].endTime).toLocaleTimeString(
                              "th-TH",
                              { hour: "2-digit", minute: "2-digit" },
                            )}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-slate-300 italic">
                          ยังไม่ระบุกำหนดการ
                        </span>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        isIconOnly
                        onPress={() => onEdit(exam)}
                        variant="ghost"
                        className="bg-primary/5 text-primary hover:bg-primary h-9 w-9 min-w-9 rounded-xl shadow-sm transition-all hover:text-white active:scale-95"
                      >
                        <LuPencil className="text-base" />
                      </Button>
                      <Button
                        isIconOnly
                        variant="ghost"
                        className="h-9 w-9 min-w-9 rounded-xl bg-red-50 text-red-500 shadow-sm transition-all hover:bg-red-500 hover:text-white active:scale-95"
                      >
                        <LuTrash className="text-base" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell>
                  <span className="block w-full py-20 text-center text-slate-400">
                    ไม่มีข้อมูลที่ต้องการค้นหา
                  </span>
                </Table.Cell>
                <Table.Cell className="hidden" />
                <Table.Cell className="hidden" />
                <Table.Cell className="hidden" />
                <Table.Cell className="hidden" />
                <Table.Cell className="hidden" />
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
};
