/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';

  type TErrorSource = { path: string | number; message: string }[];

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
  }

  // Ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};

export default globalErrorHandler;
