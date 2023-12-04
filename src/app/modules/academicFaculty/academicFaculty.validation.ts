import { z } from 'zod';

const zodAcademicFacultyValidationSchema = z.object({
  name: z.string({ invalid_type_error: 'Academic faculty must be string' }),
});

export const academicFacultyValidations = {
  zodAcademicFacultyValidationSchema,
};
