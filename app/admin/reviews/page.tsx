"use client";

import React, { useMemo, useState } from "react";
import { AdminReviewsTable } from "@/components/admin/reviews/AdminReviewsTable";
import { AdminReviewModal } from "@/components/admin/reviews/AdminReviewModal";
import { Input, useOverlayState } from "@heroui/react";
import { LuSearch, LuMessageSquare } from "react-icons/lu";
import { useAdminReviews, AdminReviewCourse } from "@/hooks/useAdminReviews";
import { motion } from "framer-motion";

const AdminReviewsPage = () => {
  const { coursesWithReviews, isLoading, deleteReview } = useAdminReviews();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<AdminReviewCourse | null>(null);
  const reviewModalState = useOverlayState();

  const filteredCourses = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return coursesWithReviews;

    return coursesWithReviews.filter(course =>
      course.id.toLowerCase().includes(query) ||
      course.titleTh.toLowerCase().includes(query) ||
      course.titleEn.toLowerCase().includes(query)
    );
  }, [coursesWithReviews, searchQuery]);

  const handleViewReviews = (course: AdminReviewCourse) => {
    setSelectedCourse(course);
    reviewModalState.open();
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!selectedCourse) return;

    const success = await deleteReview(selectedCourse.id, reviewId);
    if (success) {
      // Update local state to reflect deletion without full reload if possible, 
      // though mutate() in hook already handles it.
      // But we need to update selectedCourse to sync modal content
      setSelectedCourse(prev => prev ? {
        ...prev,
        reviews: prev.reviews.filter(r => r._id !== reviewId)
      } : null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/50 px-6 py-10 md:px-12">
      {/* Background elements */}
      <div className="pointer-events-none absolute top-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-100/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-teal-50/30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-primary/10 p-3 rounded-2xl">
                <LuMessageSquare className="text-primary text-3xl" />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Reviews Management
              </h1>
            </div>
            <p className="text-slate-400 text-lg font-medium ml-1">
              Monitor and moderate course reviews and feedback
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex w-full flex-col gap-4 sm:flex-row md:w-auto"
          >
            <div className="relative w-full sm:w-80">
              <Input
                placeholder="Search by course ID or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/80 border-slate-200 h-12 w-full rounded-2xl border px-10 text-sm font-bold shadow-sm transition-all focus:border-primary/30"
              />
              <LuSearch className="text-slate-400 absolute top-1/2 left-4 -translate-y-1/2" />
            </div>
          </motion.div>
        </div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AdminReviewsTable
            courses={filteredCourses}
            isLoading={isLoading}
            onViewReviews={handleViewReviews}
          />
          {!isLoading && coursesWithReviews.length === 0 && (
            <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-700 text-xs font-mono overflow-auto">
              <p className="font-bold mb-2">Debug Info:</p>
              <p>Courses length: {coursesWithReviews.length}</p>
              <p>Search Query: "{searchQuery}"</p>
              <p>Raw data available (check console or this space if I could dump it)</p>
            </div>
          )}
        </motion.div>
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
