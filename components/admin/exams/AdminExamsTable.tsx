"use client";

import React from "react";
import {
    Table,
    Button,
    Skeleton,
    Avatar,
    Chip,
    cn
} from "@heroui/react";
import { LuPencil, LuTrash, LuCopy, LuUser } from "react-icons/lu";

interface AdminExamsTableProps {
    exams: any[];
    isLoading: boolean;
    onEdit: (exam: any) => void;
    onDelete?: (id: string) => void;
}

export const AdminExamsTable: React.FC<AdminExamsTableProps> = ({
    exams,
    isLoading,
    onEdit,
}) => {
    const formatValue = (value: any) => {
        return value && value !== "-" ? value : <span className="text-slate-300 font-medium italic">ไม่มีข้อมูล</span>;
    };

    return (
        <Table className="shadow-2xl rounded-3xl overflow-hidden border-none bg-white/80 backdrop-blur-md p-0">
            <Table.ScrollContainer>
                <Table.Content aria-label="Admin Exams Table" className="min-w-[1000px]">
                    <Table.Header>
                        <Table.Column isRowHeader className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">SUBJECT ID</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">SUBJECT NAME</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">SEC / TYPE</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">INSTRUCTOR</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">SCHEDULE</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100 text-end">ACTIONS</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {isLoading ? (
                            [...Array(5)].map((_, i) => (
                                <Table.Row key={`loading-${i}`} className="border-b border-slate-50">
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
                                    <Table.Cell className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></Table.Cell>
                                    <Table.Cell className="px-6 py-4"><Skeleton className="h-4 w-32 rounded-lg" /></Table.Cell>
                                    <Table.Cell className="px-6 py-4"><Skeleton className="h-8 w-32 rounded-xl" /></Table.Cell>
                                    <Table.Cell className="px-6 py-4 text-end">
                                        <div className="flex justify-end gap-2">
                                            <Skeleton className="h-9 w-9 rounded-xl" />
                                            <Skeleton className="h-9 w-9 rounded-xl" />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            exams.length > 0 ? (
                                exams.map((exam) => (
                                    <Table.Row key={exam.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex items-center gap-2 group">
                                                <span className="text-sm font-bold text-[#296374]">#{exam.courseId}</span>
                                                <Button isIconOnly size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity min-w-8 h-8 rounded-lg text-slate-400">
                                                    <LuCopy className="size-3.5" />
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800">{exam.subjectTh}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{exam.subjectEn}</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <Chip size="sm" variant="soft" className="bg-primary/5 text-primary text-[10px] font-bold h-5 px-1">SEC {exam.section}</Chip>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase">{formatValue(exam.sectionType)}</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4 min-w-[200px]">
                                            <div className="flex items-center gap-2">
                                                <Avatar size="sm" className="h-7 w-7 bg-slate-100 text-slate-400">
                                                    <Avatar.Fallback>
                                                        <LuUser />
                                                    </Avatar.Fallback>
                                                </Avatar>
                                                <span className="text-xs font-bold text-slate-600">
                                                    {formatValue(exam.instructorTh || exam.instructorEn)}
                                                </span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4 min-w-[200px]">
                                            <div className="flex flex-col">
                                                {exam.date && exam.date !== "-" ? (
                                                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-100/50 flex flex-col gap-0.5">
                                                        <span className="text-[10px] font-black text-slate-700">{exam.date}</span>
                                                        <span className="text-[10px] text-primary font-bold">{exam.startTime} - {exam.endTime}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-300 font-medium italic">ยังไม่ระบุกำหนดการ</span>
                                                )}
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    isIconOnly
                                                    onPress={() => onEdit(exam)}
                                                    variant="ghost"
                                                    className="bg-primary/5 text-primary hover:bg-primary hover:text-white h-9 w-9 min-w-9 rounded-xl transition-all shadow-sm active:scale-95"
                                                >
                                                    <LuPencil className="text-base" />
                                                </Button>
                                                <Button
                                                    isIconOnly
                                                    variant="ghost"
                                                    className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white h-9 w-9 min-w-9 rounded-xl transition-all shadow-sm active:scale-95"
                                                >
                                                    <LuTrash className="text-base" />
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell><span className="py-20 text-center text-slate-400 block w-full">ไม่มีข้อมูลที่ต้องการค้นหา</span></Table.Cell>
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                    <Table.Cell className="hidden" />
                                </Table.Row>
                            )
                        )}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};
