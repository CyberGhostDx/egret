import { create } from "zustand";
import {
  UserDashboardResponse,
  userDashboardSchema,
} from "@/schema/backend.schema";
import axiosInstance from "@/lib/axiosInstance";

interface UserStore {
  user: UserDashboardResponse | null;
  isLoading: boolean;
  setUser: (user: UserDashboardResponse) => void;
  fetchUserDashboard: () => Promise<void>;
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
}));
