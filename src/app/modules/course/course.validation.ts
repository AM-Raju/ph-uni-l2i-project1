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
  isDeleted: z.boolean().optional(),
});

const zodUpdatePreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDelete: z.boolean().optional(),
});

const zodUpdateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z
      .array(zodUpdatePreRequisiteCourseValidationSchema)
      .optional(),
  }),
  isDeleted: z.boolean().optional(),
});

const zodCourseFacultyValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidations = {
  zodCreateCourseValidationSchema,
  zodUpdateCourseValidationSchema,
  zodCourseFacultyValidationSchema,
};
