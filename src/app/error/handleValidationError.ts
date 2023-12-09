import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TErrorSources } from '../interface/error';

// Here we handle mongoose validation error
const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const statusCode = httpStatus.BAD_REQUEST;

  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    },
  );

  return {
    statusCode,
    message: 'Validation error',
    errorSources,
  };
};

export default handleValidationError;
