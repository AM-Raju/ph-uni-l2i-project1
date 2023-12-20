import httpStatus from 'http-status';
import AppError from '../error/AppError';
import catchAsync from '../utils/catchAsync';

// auth HOC as middleware
const auth = () => {
  return catchAsync(async (req, res, next) => {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization;

    // Checking token is available or not
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    next();
  });
};

export default auth;
