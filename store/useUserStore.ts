import { create } from "zustand";
import {
  UserCourse,
  UserDashboardResponse,
  userDashboardSchema,
} from "@/schema/backend.schema";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { toast } from "@heroui/react";

interface UserStore {
  user: UserDashboardResponse | null;
  isLoading: boolean;
  setUser: (user: UserDashboardResponse) => void;
  fetchUserDashboard: () => Promise<void>;
  enrollCourse: (offeringId: string) => Promise<boolean>;
  unenrollCourse: (offeringId: string) => Promise<boolean>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user: UserDashboardResponse) => set({ user }),
  fetchUserDashboard: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/api/users/me");
      set({ user: userDashboardSchema.parse(response.data.data) });
    } catch (error) {
      console.error("Failed to fetch user dashboard:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  enrollCourse: async (offeringId: string) => {
    try {
      const response = await axiosInstance.post(`/api/users/enroll`, {
        offeringId,
      });
      const newCourse = { offering: response.data.data };
      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              userCourses: [...state.user.userCourses, newCourse],
            }
          : null,
      }));
      toast.success("Course added successfully.");
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.error.code === "COURSE_ALREADY_ENROLLED") {
          toast.danger("You have already enrolled in this course.");
          return false;
        } else if (error.response?.data.error.code === "COURSE_NOT_FOUND") {
          toast.danger("Course not found.");
          return false;
        }
      }
      toast.danger("Failed to add course.");
      return false;
    }
  },
  unenrollCourse: async (offeringId: string) => {
    try {
      await axiosInstance.delete(`/api/users/enroll/${offeringId}`);
      set((state) => ({
        user: state.user
          ? {
              ...state.user,
              userCourses: state.user.userCourses.filter(
                (uc) => uc.offering.id !== offeringId,
              ),
            }
          : null,
      }));
      toast.success("Unenrolled successfully.");
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.error.code === "COURSE_ALREADY_ENROLLED") {
          toast.danger("You have already enrolled in this course.");
          return false;
        } else if (error.response?.data.error.code === "COURSE_NOT_FOUND") {
          toast.danger("Course not found.");
          return false;
        }
      }
      toast.danger("Failed to unenroll.");
      return false;
    }
  },
}));
