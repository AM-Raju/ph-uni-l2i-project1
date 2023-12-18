import { z } from 'zod';

const zodLoginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'Password in required' }),
  }),
});

export const AuthValidations = {
  zodLoginValidationSchema,
};
