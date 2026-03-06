"use client";

import React from "react";
import { Modal, Button, Avatar, Card } from "@heroui/react";
import { LuTrash2, LuCalendar, LuUser } from "react-icons/lu";
import { AdminReviewCourse, AdminReview } from "@/hooks/useAdminReviews";
import { getDifficultyColor } from "@/lib/difficulty-utils";

interface AdminReviewModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    course: AdminReviewCourse | null;
    onDeleteReview: (reviewId: string) => void;
}

export const AdminReviewModal: React.FC<AdminReviewModalProps> = ({
    isOpen,
    onOpenChange,
    course,
    onDeleteReview,
}) => {
    if (!course) return null;

    return (
        <Modal>
            <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
                <Modal.Container size="lg">
                    <Modal.Dialog className="relative bg-[#f8f9fa] p-0 outline-none overflow-visible rounded-3xl border-none shadow-2xl max-w-2xl sm:max-w-3xl">
                        <Modal.Header className="flex flex-col border-b border-white bg-white/50 px-8 py-6 backdrop-blur-md">
                            <h2 className="text-primary text-2xl font-black tracking-tight">
                                Course Reviews
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded-lg">{course.id}</span>
                                <span className="text-slate-500 font-bold text-sm">{course.titleTh}</span>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <div className="max-h-[60vh] overflow-y-auto space-y-4 px-1">
                                {course.reviews.length === 0 ? (
                                    <div className="py-12 text-center text-slate-400 font-medium">
                                        No reviews for this course yet.
                                    </div>
                                ) : (
                                    course.reviews.map((review: AdminReview) => {
                                        const diffColor = getDifficultyColor(review.difficulty);
                                        return (
                                            <Card key={review._id} className="border-none bg-white shadow-sm overflow-hidden p-5 transition-all hover:shadow-md">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 text-primary bg-primary/5 font-black text-xs">
                                                            {review.username[0].toUpperCase()}
                                                        </Avatar>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-sm font-black text-slate-800">{review.username}</span>
                                                                <div className={`h-2 w-2 rounded-full ${diffColor}`} title={`Difficulty: ${review.difficulty}`} />
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                                <LuCalendar className="text-xs" />
                                                                {new Date(review.createdAt).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        isIconOnly
                                                        onPress={() => onDeleteReview(review._id)}
                                                        className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white h-9 w-9 min-w-9 rounded-xl transition-all active:scale-95 border-none"
                                                    >
                                                        <LuTrash2 className="text-base" />
                                                    </Button>
                                                </div>

                                                <div className="mt-4 text-slate-600 text-sm leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100/50 italic">
                                                    "{review.content}"
                                                </div>

                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-1.5">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <div
                                                                key={star}
                                                                className={`h-2.5 w-2.5 rounded-full ${star <= review.difficulty ? diffColor : "bg-slate-100"}`}
                                                            />
                                                        ))}
                                                        <span className="ml-1 text-[10px] font-black text-slate-400 uppercase tracking-tight">Difficulty {review.difficulty}</span>
                                                    </div>
                                                    <div className="text-[10px] font-black text-primary/40 uppercase tracking-widest">
                                                        Votes: {review.vote}
                                                    </div>
                                                </div>
                                            </Card>
                                        );
                                    })
                                )}
                            </div>
                        </Modal.Body>

                        <Modal.Footer className="bg-white/50 border-t border-white px-8 py-4 backdrop-blur-md flex justify-end">
                            <Button
                                onPress={() => onOpenChange(false)}
                                className="bg-slate-200 text-slate-600 hover:bg-slate-300 h-10 px-8 rounded-xl font-bold transition-all active:scale-95 text-sm border-none"
                            >
                                CLOSE
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};
