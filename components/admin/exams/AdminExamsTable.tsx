"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { LuPencil, LuTrash } from "react-icons/lu";

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
        <Card className="overflow-hidden border-none bg-white/80 shadow-2xl backdrop-blur-md">
            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead className="bg-primary/5 border-b border-primary/10">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">SUBJECT ID</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">SUBJECT NAME</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">SEC / TYPE</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">INSTRUCTOR</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">EXAM SCHEDULE</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase text-center">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-b border-primary/5 animate-pulse">
                                    <td className="p-6"><div className="bg-primary/5 h-4 w-20 rounded" /></td>
                                    <td className="p-6"><div className="bg-primary/5 h-4 w-40 rounded" /></td>
                                    <td className="p-6"><div className="bg-primary/5 h-4 w-15 rounded" /></td>
                                    <td className="p-6"><div className="bg-primary/5 h-4 w-30 rounded" /></td>
                                    <td className="p-6"><div className="bg-primary/5 h-4 w-30 rounded" /></td>
                                    <td className="p-6 text-center"><div className="bg-primary/5 h-8 w-20 mx-auto rounded" /></td>
                                </tr>
                            ))
                        ) : (
                            exams.map((exam) => (
                                <tr
                                    key={exam.id}
                                    className="hover:bg-primary/[0.02] border-b border-primary/5 transition-colors"
                                >
                                    <td className="px-6 py-5 font-bold text-[#296374]">
                                        {exam.courseId}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-800">
                                                {exam.subjectTh}
                                            </span>
                                            <span className="text-primary/40 text-[11px] font-bold uppercase">
                                                {exam.subjectEn}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-primary/5 text-primary rounded-lg px-2 py-1 text-xs font-black">
                                                {exam.section}
                                            </span>
                                            <span className="text-primary/40 text-[10px] font-bold uppercase">{formatValue(exam.sectionType)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-sm font-semibold text-slate-600">
                                            {formatValue(exam.instructorTh || exam.instructorEn)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            {exam.date && exam.date !== "-" ? (
                                                <>
                                                    <span className="text-sm font-bold text-slate-700">{exam.date}</span>
                                                    <span className="text-primary/50 text-xs font-medium">{exam.startTime} - {exam.endTime}</span>
                                                </>
                                            ) : (
                                                formatValue(null)
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                onPress={() => onEdit(exam)}
                                                className="bg-primary/20 text-primary hover:bg-primary hover:text-white h-9 w-9 min-w-9 rounded-xl p-0 transition-all font-bold active:scale-95 shadow-sm"
                                            >
                                                <LuPencil className="text-sm" />
                                            </Button>
                                            <Button className="hover:bg-red-500 bg-red-50 h-9 w-9 min-w-9 rounded-xl p-0 text-red-500 transition-all hover:text-white active:scale-95">
                                                <LuTrash className="text-sm" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        {!isLoading && exams.length === 0 && (
                            <tr>
                                <td colSpan={6} className="py-20 text-center text-slate-400">
                                    ไม่มีข้อมูลที่ต้องการค้นหา
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
