"use client";

import useSWR from "swr";
import { z } from "zod";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@heroui/react";
import { useMemo } from "react";
import { reviewCourseSchema } from "@/schema/backend.schema";

export type AdminReviewCourse = z.infer<typeof reviewCourseSchema>;
export type AdminReview = AdminReviewCourse["reviews"][0];

const adminReviewsResponseSchema = z.array(reviewCourseSchema);

export function useAdminReviews() {
    const { data, error, isLoading, isValidating, mutate } = useSWR(
        "/api/admin/reviews",
        {
            revalidateOnFocus: false,
        }
    );

    const coursesWithReviews = useMemo(() => {
        if (!data) return [];
        try {
            console.log("Admin Reviews Data:", data);
            return adminReviewsResponseSchema.parse(data);
        } catch (err) {
            console.error("Zod Parsing Error in useAdminReviews:", err);
            // If it's an array but parsing failed, try to return it raw to see something
            return Array.isArray(data) ? data : [];
        }
    }, [data]);

    const deleteReview = async (courseId: string, reviewId: string) => {
        try {
            await axiosInstance.delete(`/api/admin/reviews/${reviewId}`);
            toast.success("Review deleted successfully");
            await mutate(); // Refresh the list
            return true;
        } catch (err) {
            toast.danger("Failed to delete review");
            return false;
        }
    };

    return {
        coursesWithReviews,
        isLoading: isLoading || (!data && !error && isValidating),
        isError: error,
        deleteReview,
        mutate,
    };
}
