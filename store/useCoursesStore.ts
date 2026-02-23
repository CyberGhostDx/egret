import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import {
  CoursesResponse,
  coursesOfferingsResponseSchema,
} from "@/schema/backend.schema";

interface CoursesStore {
  courses: CoursesResponse | null;
  isLoading: boolean;
  setCourses: (courses: CoursesResponse) => void;
  fetchCourses: () => Promise<void>;
}

export const useCoursesStore = create<CoursesStore>((set) => ({
  courses: null,
  isLoading: false,
  setCourses: (courses: CoursesResponse) => set({ courses }),
  fetchCourses: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/api/courses/offerings");
      set({
        courses: coursesOfferingsResponseSchema.parse(response.data.data),
      });
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
