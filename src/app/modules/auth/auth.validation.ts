import { z } from 'zod';

const zodLoginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'Password in required' }),
  }),
});

const zodChangePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'New password in required' }),
  }),
});

export const AuthValidations = {
  zodLoginValidationSchema,
  zodChangePasswordValidationSchema,
};
