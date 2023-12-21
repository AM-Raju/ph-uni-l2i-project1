import httpStatus from 'http-status';
import AppError from '../error/AppError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

// auth HOC as middleware
const auth = () => {
  return catchAsync(async (req, res, next) => {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization;

    // If the token send from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Check if the token valid
    jwt.verify(
      token,
      config.jwt_access_secret_key as string,
      function (err, decoded) {
        // err
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        // decoded undefined
        // console.log(decoded);
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
