import { z } from "zod";

export const courseFormSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
    subjectEn: z.string().min(1, "Subject (EN) is required"),
    subjectTh: z.string().min(1, "Subject (TH) is required"),
    section: z.string().min(1, "Section is required"),
    sectionType: z.string().min(1, "Section Type is required"),
    date: z.string().min(1, "Date is required"),
    credits: z.coerce.number().min(0, "Credits must be at least 0"),
    startTime: z.string().min(1, "Start Time is required"),
    endTime: z.string().min(1, "End Time is required"),
    building: z.string().optional(),
    room: z.string().optional(),
    instructorTh: z.string().optional(),
    instructorEn: z.string().optional(),
    proctor: z.string().optional(),
    note: z.string().optional(),
});

export type CourseFormValues = z.infer<typeof courseFormSchema>;
