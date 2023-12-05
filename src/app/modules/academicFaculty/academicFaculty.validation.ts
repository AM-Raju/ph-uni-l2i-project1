import { z } from 'zod';

const zodCreateAcademicFacultyValidationSchema = z.object({
  name: z.string({ invalid_type_error: 'Academic faculty must be string' }),
});
const zodUpdateAcademicFacultyValidationSchema = z.object({
  name: z
    .string({ invalid_type_error: 'Academic faculty must be string' })
    .optional(),
});

export const academicFacultyValidations = {
  zodCreateAcademicFacultyValidationSchema,
  zodUpdateAcademicFacultyValidationSchema,
};
