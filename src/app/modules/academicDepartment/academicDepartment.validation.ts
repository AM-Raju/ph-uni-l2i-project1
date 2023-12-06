import { z } from 'zod';

const zodCreateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Faculty is required',
    }),
  }),
});

const zodUpdateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department must be string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Department must be string',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  zodCreateAcademicDepartmentValidationSchema,
  zodUpdateAcademicDepartmentValidationSchema,
};
