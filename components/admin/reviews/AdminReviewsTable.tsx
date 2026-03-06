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
import { LuEye, LuCopy } from "react-icons/lu";
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
        <Table className="shadow-2xl rounded-3xl overflow-hidden border-none bg-white/80 backdrop-blur-md p-0">
            <Table.ScrollContainer>
                <Table.Content aria-label="Admin Reviews Table" className="min-w-[800px]">
                    <Table.Header>
                        <Table.Column isRowHeader className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">SUBJECT ID</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100">COURSE NAME</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100 text-center">REVIEWS</Table.Column>
                        <Table.Column className="bg-slate-50/50 text-slate-400 font-bold text-[11px] uppercase tracking-wider h-14 px-6 border-b border-slate-100 text-center">DIFFICULTY</Table.Column>
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
                                    <Table.Cell className="px-6 py-4 text-center">
                                        <Skeleton className="h-6 w-10 mx-auto rounded-full" />
                                    </Table.Cell>
                                    <Table.Cell className="px-6 py-4 text-center">
                                        <Skeleton className="h-4 w-12 mx-auto rounded-lg" />
                                    </Table.Cell>
                                    <Table.Cell className="px-6 py-4 text-end">
                                        <Skeleton className="h-9 w-10 ml-auto rounded-xl" />
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        ) : (
                            (courses || []).length > 0 ? (
                                (courses || []).map((course) => (
                                    <Table.Row key={course.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex items-center gap-2 group">
                                                <span className="text-sm font-bold text-[#296374]">#{course.id}</span>
                                                <Button isIconOnly size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity min-w-8 h-8 rounded-lg text-slate-400 hover:text-primary">
                                                    <LuCopy className="size-3.5" />
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800">{course.titleTh}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{course.titleEn}</span>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4 text-center">
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                className={cn(
                                                    "font-bold text-[10px]",
                                                    course.reviews.length > 0 ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-400"
                                                )}
                                            >
                                                {course.reviews.length} รีวิว
                                            </Chip>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4 text-center">
                                            <span className="text-sm font-bold text-slate-600">
                                                {course.difficulty ? course.difficulty.toFixed(1) : "N/A"}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell className="px-6 py-4">
                                            <div className="flex items-center justify-end">
                                                <Button
                                                    isIconOnly
                                                    onPress={() => onViewReviews(course)}
                                                    variant="ghost"
                                                    className="bg-slate-50 text-slate-600 hover:bg-primary hover:text-white h-9 w-9 min-w-9 rounded-xl transition-all shadow-sm border-none active:scale-95"
                                                >
                                                    <LuEye className="text-lg" />
                                                </Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell><span className="py-20 text-center text-slate-400 block w-full">No reviews found.</span></Table.Cell>
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
