"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { LuEye } from "react-icons/lu";
import { AdminReviewCourse } from "@/hooks/useAdminReviews";

interface AdminReviewsTableProps {
    courses: AdminReviewCourse[];
    isLoading: boolean;
    onViewReviews: (course: AdminReviewCourse) => void;
}

export const AdminReviewsTable: React.FC<AdminReviewsTableProps> = ({
    courses,
    isLoading,
    onViewReviews,
}) => {
    return (
        <Card className="overflow-hidden border-none bg-white/80 shadow-2xl backdrop-blur-md">
            <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead className="bg-primary/5 border-b border-primary/10">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">SUBJECT ID</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase">SUBJECT NAME</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase text-center">REVIEWS</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase text-center">AVG. DIFFICULTY</th>
                            <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-400 uppercase text-center">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-b border-primary/5 animate-pulse">
                                    <td className="p-6"><div className="bg-primary/5 h-4 w-20 rounded" /></td>
                                    <td className="p-6"><div className="bg-primary/5 h-4 w-40 rounded" /></td>
                                    <td className="p-6 text-center"><div className="bg-primary/5 h-4 w-10 mx-auto rounded" /></td>
                                    <td className="p-6 text-center"><div className="bg-primary/5 h-4 w-10 mx-auto rounded" /></td>
                                    <td className="p-6 text-center"><div className="bg-primary/5 h-8 w-24 mx-auto rounded-xl" /></td>
                                </tr>
                            ))
                        ) : (
                            courses.map((course) => (
                                <tr
                                    key={course.id}
                                    className="hover:bg-primary/[0.02] border-b border-primary/5 transition-colors"
                                >
                                    <td className="px-6 py-5 font-bold text-[#296374]">
                                        {course.id}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-800">
                                                {course.titleTh}
                                            </span>
                                            <span className="text-primary/40 text-[11px] font-bold uppercase">
                                                {course.titleEn}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
                                            {course.reviews.length}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-sm font-bold text-slate-700">
                                            {course.difficulty.toFixed(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center">
                                            <Button
                                                onPress={() => onViewReviews(course)}
                                                className="bg-primary/10 text-primary hover:bg-primary hover:text-white h-9 px-4 rounded-xl transition-all font-bold active:scale-95 shadow-sm border-none flex items-center gap-2"
                                            >
                                                <LuEye className="text-sm" />
                                                View Reviews
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        {!isLoading && courses.length === 0 && (
                            <tr>
                                <td colSpan={5} className="py-20 text-center text-slate-400">
                                    No reviews found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
