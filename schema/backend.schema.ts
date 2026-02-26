import { z } from "zod";

export const examSchema = z.object({
  id: z.string(),
  examType: z.string(),
  examDate: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  building: z.string().nullable(),
  room: z.string().nullable(),
  note: z.string().nullable(),
  proctor: z.string().nullable(),
  updatedAt: z.coerce.date(),
});

export const courseSchema = z.object({
  id: z.string(),
  titleTh: z.string(),
  titleEn: z.string(),
});

export const courseOfferingSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  section: z.string(),
  instructorTh: z.string().nullable(),
  instructorEn: z.string().nullable(),
  sectionType: z.string().nullable(),
  credits: z.coerce.number(),
  course: courseSchema,
  exams: z.array(examSchema),
});

export const userCourseSchema = z.object({
  offering: courseOfferingSchema,
});

export type UserCourse = z.infer<typeof userCourseSchema>;

export const userDashboardSchema = z.object({
  name: z.string().nullable(),
  email: z.string(),
  userCourses: z.array(userCourseSchema),
});

export type UserDashboardResponse = z.infer<typeof userDashboardSchema>;

export const coursesOfferingsResponseSchema = z.array(
  z.object({
    id: z.string(),
    titleTh: z.string(),
    titleEn: z.string(),
    difficulty: z.number(),
    offerings: z.array(
      courseOfferingSchema.omit({ exams: true, course: true }),
    ),
  }),
);

export const reviewCourseSchema = z.object({
  id: z.string(),
  titleTh: z.string(),
  titleEn: z.string(),
  difficulty: z.number(),
  reviews: z.array(
    z.object({
      _id: z.string(),
      username: z.string(),
      content: z.string(),
      difficulty: z.number(),
      vote: z.number(),
      createdAt: z.coerce.date(),
    }),
  ),
});

export type ReviewCourseResponse = z.infer<typeof reviewCourseSchema>;

export type CoursesResponse = z.infer<typeof coursesOfferingsResponseSchema>;
