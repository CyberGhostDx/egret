import React, { useState, useMemo, useEffect } from "react";
import { Modal, Button, Avatar, Card, Chip, cn, TextField, Input, Pagination } from "@heroui/react";
import { LuTrash2, LuCalendar, LuCheck, LuInfo, LuSearch, LuX, LuRotateCcw } from "react-icons/lu";
import { AdminReviewCourse, AdminReview } from "@/hooks/useAdminReviews";
import { getDifficultyColor } from "@/lib/difficulty-utils";

interface AdminReviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  course: AdminReviewCourse | null;
  onDeleteReview: (reviewId: string) => void;
}

const ROWS_PER_PAGE = 6;

export const AdminReviewModal: React.FC<AdminReviewModalProps> = ({
  isOpen,
  onOpenChange,
  course,
  onDeleteReview,
}): React.ReactElement | null => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Reset page when search changes or modal opens for a new course
  useEffect(() => {
    setPage(1);
  }, [searchQuery, course?.id]);

  const filteredReviews = useMemo(() => {
    if (!course) return [];
    if (!searchQuery.trim()) return course.reviews;
    
    const query = searchQuery.toLowerCase();
    return course.reviews.filter(
      (r) => 
        r.content.toLowerCase().includes(query) || 
        r.username.toLowerCase().includes(query)
    );
  }, [course, searchQuery]);

  const totalPages = Math.ceil(filteredReviews.length / ROWS_PER_PAGE);

  const paginatedReviews = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return filteredReviews.slice(start, start + ROWS_PER_PAGE);
  }, [filteredReviews, page]);

  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [page, totalPages]);

  if (!course) return null;

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Container className="w-full">
          <Modal.Dialog className="max-w-7xl w-full relative overflow-hidden rounded-3xl border-none bg-[#f8f9fa] p-0 shadow-2xl outline-none">
            <Modal.Header className="flex flex-col rounded-t-3xl border-b border-white bg-white/50 px-8 py-5 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-primary text-xl font-black tracking-tight">
                    Course Reviews
                  </h2>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-primary bg-primary/10 rounded-lg px-2 py-0.5 text-[10px] font-bold">
                      {course.id}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {course.titleTh}
                    </span>
                  </div>
                </div>

                <div className="relative group w-full sm:w-80">
                  <TextField 
                    value={searchQuery}
                    onChange={setSearchQuery}
                  >
                    <div className="relative flex items-center">
                      <LuSearch className="absolute left-3 size-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                      <Input 
                        placeholder="ค้นหาในรีวิวหรือชื่อผู้ใช้..." 
                        className="h-10 w-full rounded-xl border-none bg-primary/5 pl-10 pr-8 text-sm font-bold transition-all focus:bg-primary/10 focus:ring-2 focus:ring-primary/20"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <LuX className="size-4" />
                        </button>
                      )}
                    </div>
                  </TextField>
                </div>
              </div>
            </Modal.Header>

            <Modal.Body className="p-6">
              <div className="min-h-[400px] flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-1">
                  {filteredReviews.length === 0 ? (
                    <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center py-24 text-center">
                      <div className="bg-slate-100 p-4 rounded-full mb-4">
                        <LuSearch className="size-8 text-slate-300" />
                      </div>
                      <p className="font-bold text-slate-400">
                        {searchQuery ? `ไม่พบรีวิวที่ตรงกับ "${searchQuery}"` : "วิชานี้ยังไม่มีรีวิว"}
                      </p>
                    </div>
                  ) : (
                    paginatedReviews.map((review: AdminReview) => {
                      const diffColor = getDifficultyColor(review.difficulty);
                      const isDeleted = review.status === "deleted";

                      return (
                        <Card
                          key={review._id}
                          className={cn(
                            "overflow-hidden border-none p-3.5 shadow-sm transition-all hover:shadow-md h-fit",
                            isDeleted ? "bg-slate-50 opacity-60" : "bg-white",
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <Avatar className="bg-primary/5 size-9 font-black text-blue-500 text-sm shadow-sm">
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
                                      "h-4 border-none px-1.5 text-[9px] font-bold uppercase",
                                      isDeleted
                                        ? "bg-red-100 text-red-600"
                                        : "bg-green-100 text-green-600",
                                    )}
                                  >
                                    <div className="flex items-center gap-0.5">
                                      {isDeleted ? (
                                        <LuInfo className="size-2.5" />
                                      ) : (
                                        <LuCheck className="size-2.5" />
                                      )}
                                      {review.status}
                                    </div>
                                  </Chip>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                  <LuCalendar className="size-2.5" />
                                  {new Date(review.createdAt).toLocaleDateString(
                                    "th-TH",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    },
                                  )}
                                </div>
                              </div>
                            </div>
                            {!isDeleted ? (
                              <Button
                                isIconOnly
                                onPress={() => onDeleteReview(review._id)}
                                className="h-8 w-8 min-w-8 rounded-lg border-none bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white active:scale-95 shadow-sm"
                              >
                                <LuTrash2 className="text-base" />
                              </Button>
                            ) : (
                              <Button
                                isIconOnly
                                className="h-8 w-8 min-w-8 rounded-lg border-none bg-green-50 text-green-600 transition-all hover:bg-green-600 hover:text-white active:scale-95 shadow-sm"
                                onPress={() => console.log("Restore clicked:", review._id)}
                              >
                                <LuRotateCcw className="text-base" />
                              </Button>
                            )}
                          </div>

                          <div
                            className={cn(
                              "mt-2.5 rounded-xl border border-slate-100/50 p-3 text-sm leading-relaxed",
                              isDeleted
                                ? "bg-slate-100 text-slate-400 line-through"
                                : "bg-slate-50/50 text-slate-700 font-medium",
                            )}
                          >
                            "{review.content}"
                          </div>

                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <div
                                  key={star}
                                  className={`h-2.5 w-2.5 rounded-full shadow-inner ${star <= review.difficulty ? diffColor : "bg-slate-200/50"}`}
                                />
                              ))}
                              <span className="ml-1 text-[9px] font-black tracking-tight text-slate-400 uppercase">
                                Difficulty {review.difficulty}
                              </span>
                            </div>
                            <div className="text-primary/40 text-[9px] font-black tracking-widest uppercase bg-primary/5 px-1.5 py-0.5 rounded-md">
                              Votes: {review.vote}
                            </div>
                          </div>
                        </Card>
                      );
                    })
                  )}
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="flex justify-between items-center rounded-b-3xl border-t border-white bg-white/50 px-8 py-4 backdrop-blur-md">
              <span className="text-xs font-bold text-slate-400">
                {filteredReviews.length} รีวิวในคอร์สนี้
              </span>
              
              <div className="flex items-center gap-6">
                {totalPages > 1 && (
                  <Pagination size="sm">
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
                )}

                <Button 
                  onPress={() => onOpenChange(false)} 
                  className="bg-primary/10 text-primary hover:bg-primary hover:text-white h-10 px-8 rounded-xl font-black text-xs transition-all active:scale-95"
                >
                  CLOSE
                </Button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
