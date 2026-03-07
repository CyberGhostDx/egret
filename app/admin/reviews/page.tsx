"use client";

import React, { useMemo, useState } from "react";
import { AdminReviewsTable } from "@/components/admin/reviews/AdminReviewsTable";
import { AdminReviewModal } from "@/components/admin/reviews/AdminReviewModal";
import { Input, useOverlayState } from "@heroui/react";
import { LuSearch, LuMessageSquare } from "react-icons/lu";
import { useAdminReviews, AdminReviewCourse } from "@/hooks/useAdminReviews";

const AdminReviewsPage = (): React.ReactElement => {
  const { coursesWithReviews, isLoading, deleteReview } = useAdminReviews();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCourse, setSelectedCourse] =
    useState<AdminReviewCourse | null>(null);
  const reviewModalState = useOverlayState();

  const filteredCourses = useMemo((): AdminReviewCourse[] => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return coursesWithReviews;

    return coursesWithReviews.filter(
      (course) =>
        course.id.toLowerCase().includes(query) ||
        course.titleTh.toLowerCase().includes(query) ||
        course.titleEn.toLowerCase().includes(query),
    );
  }, [coursesWithReviews, searchQuery]);

  const handleViewReviews = (course: AdminReviewCourse): void => {
    setSelectedCourse(course);
    reviewModalState.open();
  };

  const handleDeleteReview = async (reviewId: string): Promise<void> => {
    if (!selectedCourse) return;

    const success = await deleteReview(selectedCourse.id, reviewId);
    if (success) {
      // Update selectedCourse to sync modal content
      setSelectedCourse((prev) =>
        prev
          ? {
              ...prev,
              reviews: prev.reviews.filter((r) => r._id !== reviewId),
            }
          : null,
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/50 px-6 py-10 md:px-12">
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-100/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-teal-50/30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-4">
              <div className="bg-primary/10 rounded-2xl p-3">
                <LuMessageSquare className="text-primary text-3xl" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Reviews Management
              </h1>
            </div>
            <p className="ml-1 text-lg font-medium text-slate-400">
              Monitor and moderate course reviews and feedback
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
            <div className="relative w-full sm:w-80">
              <Input
                placeholder="Search by course ID or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:border-primary/30 h-12 w-full rounded-2xl border border-slate-200 bg-white/80 px-10 text-sm font-bold shadow-sm transition-all"
              />
              <LuSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div>
          <AdminReviewsTable
            courses={filteredCourses}
            isLoading={isLoading}
            onViewReviews={handleViewReviews}
          />
        </div>
      </div>

      {/* View Reviews Modal */}
      <AdminReviewModal
        isOpen={reviewModalState.isOpen}
        onOpenChange={reviewModalState.setOpen}
        course={selectedCourse}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  );
};

export default AdminReviewsPage;
