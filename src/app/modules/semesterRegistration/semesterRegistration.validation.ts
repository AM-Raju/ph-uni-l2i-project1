import { z } from 'zod';
import { semesterRegistrationStatus } from './semesterRegistration.constants';

const zodCreateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z
      .enum([...semesterRegistrationStatus] as [string, ...string[]])
      .optional(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const semesterRegistrationValidations = {
  zodCreateSemesterRegistrationValidationSchema,
};
