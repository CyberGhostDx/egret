import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import {
  CoursesResponse,
  coursesResponseSchema,
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
      const response = await axiosInstance.get("/api/courses");
      set({ courses: coursesResponseSchema.parse(response.data.data) });
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
