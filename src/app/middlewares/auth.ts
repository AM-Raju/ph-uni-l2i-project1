import httpStatus from 'http-status';
import AppError from '../error/AppError';
import catchAsync from '../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { verifyToken } from '../modules/auth/auth.utils';

// auth HOC as middleware
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization;

    // If the token send from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // Check if the token valid
    const decoded = verifyToken(token, config.jwt_access_secret_key as string);

    const { userId, role, iat } = decoded;

    // Checking if the user is exist
    // I just used it here to get the user data
    const userData = await User.isUserExistsByCustomId(userId);

    if (!userData) {
      throw new AppError(httpStatus.NOT_FOUND, "This user isn't found");
    }

    // Checking if the user is already deleted
    const isDeleted = userData?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted');
    }

    // Checking if the user is blocked
    const userStatus = userData?.status;

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
    }

    // Checking JWT token is created after after password changed or not
    // Note: passwordChangedTime > jwtToken creation time ==> true
    if (
      userData?.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        userData.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // decoded undefined
    // console.log(decoded);
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
