import { create } from "zustand";

interface TimeStore {
  now: Date;
  updateNow: () => void;
}

export const useTimeStore = create<TimeStore>((set) => ({
  now: new Date(),
  updateNow: () => set({ now: new Date() }),
}));

// Initialize the timer once
if (typeof window !== "undefined") {
  setInterval(() => {
    useTimeStore.getState().updateNow();
  }, 1000);
}
