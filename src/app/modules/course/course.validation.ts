import { z } from 'zod';

const zodPreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDelete: z.boolean().optional(),
});

const zodCreateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(zodPreRequisiteCourseValidationSchema)
      .optional(),
  }),
});

export const CourseValidations = {
  zodCreateCourseValidationSchema,
};
