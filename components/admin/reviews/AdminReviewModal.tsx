"use client";

import React from "react";
import { Modal, Button, Avatar, Card, Chip, cn } from "@heroui/react";
import { LuTrash2, LuCalendar, LuCheck, LuInfo } from "react-icons/lu";
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
}): React.ReactElement | null => {
  if (!course) return null;

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Container size="lg" className="max-w-2xl sm:max-w-3xl">
          <Modal.Dialog className="relative overflow-hidden rounded-3xl border-none bg-[#f8f9fa] p-0 shadow-2xl outline-none">
            <Modal.Header className="flex flex-col rounded-t-3xl border-b border-white bg-white/50 px-8 py-6 backdrop-blur-md">
              <h2 className="text-primary text-2xl font-black tracking-tight">
                Course Reviews
              </h2>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-primary bg-primary/10 rounded-lg px-2 py-0.5 text-sm font-bold">
                  {course.id}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  {course.titleTh}
                </span>
              </div>
            </Modal.Header>

            <Modal.Body className="p-6">
              <div className="max-h-[60vh] space-y-4 overflow-y-auto px-1">
                {course.reviews.length === 0 ? (
                  <div className="py-12 text-center font-medium whitespace-pre-wrap text-slate-400">
                    No reviews for this course yet.
                  </div>
                ) : (
                  course.reviews.map((review: AdminReview) => {
                    const diffColor = getDifficultyColor(review.difficulty);
                    const isDeleted = review.status === "deleted";

                    return (
                      <Card
                        key={review._id}
                        className={cn(
                          "overflow-hidden border-none p-5 shadow-sm transition-all hover:shadow-md",
                          isDeleted ? "bg-slate-50 opacity-60" : "bg-white",
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="bg-primary/5 size-10 font-black text-blue-500">
                              {(review.username || "U")[0].toUpperCase()}
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-slate-800">
                                  {review.username}
                                </span>
                                <Chip
                                  size="sm"
                                  variant="soft"
                                  className={cn(
                                    "h-5 border-none px-2 text-[10px] font-bold uppercase",
                                    isDeleted
                                      ? "bg-red-100 text-red-600"
                                      : "bg-green-100 text-green-600",
                                  )}
                                >
                                  <div className="flex items-center gap-1">
                                    {isDeleted ? (
                                      <LuInfo className="size-3" />
                                    ) : (
                                      <LuCheck className="size-3" />
                                    )}
                                    {review.status}
                                  </div>
                                </Chip>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-slate-400 uppercase">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    timeZone: "Asia/Bangkok",
                                  },
                                )}
                              </div>
                            </div>
                          </div>
                          {!isDeleted && (
                            <Button
                              isIconOnly
                              onPress={() => onDeleteReview(review._id)}
                              className="h-9 w-9 min-w-9 rounded-xl border-none bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white active:scale-95"
                            >
                              <LuTrash2 className="text-base" />
                            </Button>
                          )}
                        </div>

                        <div
                          className={cn(
                            "mt-4 rounded-xl border border-slate-100/50 p-3 text-sm leading-relaxed",
                            isDeleted
                              ? "bg-slate-100 text-slate-400 line-through"
                              : "bg-slate-50/50 text-slate-600",
                          )}
                        >
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
                            <span className="ml-1 text-[10px] font-black tracking-tight text-slate-400 uppercase">
                              Difficulty {review.difficulty}
                            </span>
                          </div>
                          <div className="text-primary/40 text-[10px] font-black tracking-widest uppercase">
                            Votes: {review.vote}
                          </div>
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>
            </Modal.Body>

            <Modal.Footer className="flex justify-end rounded-b-3xl border-t border-white bg-white/50 px-8 py-4 backdrop-blur-md">
              <Button onPress={() => onOpenChange(false)} variant="primary">
                CLOSE
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
