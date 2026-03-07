"use client";

import React, { useMemo, useState } from "react";
import { Table, Button, Skeleton, Avatar, Chip, cn, Pagination } from "@heroui/react";
import { LuPencil, LuTrash, LuCopy, LuUser } from "react-icons/lu";
import { type CourseOffering } from "@/schema/backend.schema";
import { SortDescriptor } from "@heroui/react";

interface AdminExamsTableProps {
  exams: CourseOffering[] | null;
  isLoading: boolean;
  onEdit: (exam: CourseOffering) => void;
  onDelete?: (id: string) => void;
}

const ROWS_PER_PAGE = 5;

export const AdminExamsTable: React.FC<AdminExamsTableProps> = ({
  exams,
  isLoading,
  onEdit,
}): React.ReactElement => {
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "courseId",
    direction: "ascending",
  });

  const sortedExams = useMemo(() => {
    if (!exams) return [];
    return [...exams].sort((a, b) => {
      let first: any;
      let second: any;

      switch (sortDescriptor.column) {
        case "courseId":
          first = a.courseId;
          second = b.courseId;
          break;
        case "courseName":
          first = a.course.titleTh;
          second = b.course.titleTh;
          break;
        case "instructor":
          first = a.instructorTh || a.instructorEn || "";
          second = b.instructorTh || b.instructorEn || "";
          break;
        default:
          first = (a as any)[sortDescriptor.column!];
          second = (b as any)[sortDescriptor.column!];
      }

      const cmp = (first || "").toString().localeCompare((second || "").toString());
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [exams, sortDescriptor]);

  const totalPages = Math.ceil((sortedExams?.length || 0) / ROWS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return sortedExams.slice(start, start + ROWS_PER_PAGE);
  }, [sortedExams, page]);

  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [page, totalPages]);

  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, sortedExams?.length || 0);

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
              <button
                onClick={() => {
                  setSortDescriptor({
                    column: "courseId",
                    direction:
                      sortDescriptor.column === "courseId" &&
                      sortDescriptor.direction === "ascending"
                        ? "descending"
                        : "ascending",
                  });
                }}
                className="flex items-center gap-1 hover:text-slate-600"
              >
                SUBJECT ID
                {sortDescriptor.column === "courseId" && (
                  <span className="text-[8px]">
                    {sortDescriptor.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </button>
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              <button
                onClick={() => {
                  setSortDescriptor({
                    column: "courseName",
                    direction:
                      sortDescriptor.column === "courseName" &&
                      sortDescriptor.direction === "ascending"
                        ? "descending"
                        : "ascending",
                  });
                }}
                className="flex items-center gap-1 hover:text-slate-600"
              >
                SUBJECT NAME
                {sortDescriptor.column === "courseName" && (
                  <span className="text-[8px]">
                    {sortDescriptor.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </button>
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              SEC / TYPE
            </Table.Column>
            <Table.Column className="h-14 border-b border-slate-100 bg-slate-50/50 px-6 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              <button
                onClick={() => {
                  setSortDescriptor({
                    column: "instructor",
                    direction:
                      sortDescriptor.column === "instructor" &&
                      sortDescriptor.direction === "ascending"
                        ? "descending"
                        : "ascending",
                  });
                }}
                className="flex items-center gap-1 hover:text-slate-600"
              >
                INSTRUCTOR
                {sortDescriptor.column === "instructor" && (
                  <span className="text-[8px]">
                    {sortDescriptor.direction === "ascending" ? "▲" : "▼"}
                  </span>
                )}
              </button>
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
            ) : paginatedItems && paginatedItems.length > 0 ? (
              paginatedItems.map((exam) => (
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
                        <div className="flex flex-col gap-1.5 px-1 py-1">
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
                              {new Date(
                                exam.exams[0].endTime,
                              ).toLocaleTimeString("th-TH", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          {(exam.exams[0].building || exam.exams[0].room) && (
                            <div className="flex items-center gap-1.5 px-1.5 text-[10px] font-bold text-slate-500">
                              <LuUser className="size-3 text-slate-300" />
                              <span className="truncate">
                                {exam.exams[0].building || ""}{" "}
                                {exam.exams[0].room || ""}
                              </span>
                            </div>
                          )}
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
      {totalPages > 1 && (
        <Table.Footer>
          <Pagination size="sm">
            <Pagination.Summary>
              {start} to {end} of {sortedExams?.length || 0} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>
              {visiblePages.map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      )}
    </Table>
  );
};
