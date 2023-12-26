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

const zodRefreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh Token is Required' }),
  }),
});

const zodForgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User id is required' }),
  }),
});

export const AuthValidations = {
  zodLoginValidationSchema,
  zodChangePasswordValidationSchema,
  zodRefreshTokenValidationSchema,
  zodForgetPasswordValidationSchema,
};
