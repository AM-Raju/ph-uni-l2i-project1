/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import httpStatus from 'http-status';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract within double value quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first comparing group
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exist`,
    },
  ];

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message: 'Duplicate value',
    errorSources,
  };
};

export default handleDuplicateError;
