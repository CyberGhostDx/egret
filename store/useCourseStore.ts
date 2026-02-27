import { create } from "zustand";
import { CourseFormValues } from "@/schema/courseForm.schema";

interface CourseState {
    courses: (CourseFormValues & { id: string })[];
    addCourse: () => void;
    removeCourse: (id: string) => void;
    updateCourse: (id: string, data: Partial<CourseFormValues>) => void;
    setCourses: (courses: (CourseFormValues & { id: string })[]) => void;
    reset: () => void;
}

const createEmptyCourse = (): CourseFormValues & { id: string } => ({
    id: Math.random().toString(36).substring(2, 9),
    courseId: "",
    subjectEn: "",
    subjectTh: "",
    section: "",
    sectionType: "",
    date: "",
    credits: 0,
    startTime: "",
    endTime: "",
    building: "",
    room: "",
    instructorTh: "",
    instructorEn: "",
    proctor: "",
    note: "",
});

export const useCourseStore = create<CourseState>((set) => ({
    courses: [createEmptyCourse()],
    addCourse: () =>
        set((state) => ({
            courses: [...state.courses, createEmptyCourse()],
        })),
    removeCourse: (id) =>
        set((state) => ({
            courses: state.courses.filter((c) => c.id !== id),
        })),
    updateCourse: (id, data) =>
        set((state) => ({
            courses: state.courses.map((c) => (c.id === id ? { ...c, ...data } : c)),
        })),
    setCourses: (courses) => set({ courses }),
    reset: () =>
        set({
            courses: [createEmptyCourse()],
        }),
}));
