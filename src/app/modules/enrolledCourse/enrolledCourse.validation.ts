import { z } from 'zod';

const zodCreateEnrolledCourseValidationSchema = z.object({
  body: z.object({
    offeredCourse: z.string(),
  }),
});

export const EnrolledCourseValidations = {
  zodCreateEnrolledCourseValidationSchema,
};
