import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  // Checking if the user is exist

  // I just used it here to get the user data
  const userData = await User.isUserExistsByCustomId(payload?.id);

  if (!userData) {
    throw new AppError(httpStatus.NOT_FOUND, "This user isn't found");
  }

  // Checking if the user is already deleted
  const isDeleted = userData?.isDeleted;

  if (!isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted');
  }

  // Checking if the user is blocked
  const userStatus = userData?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
  }

  // Checking if password is correct
  if (!(await User.isPasswordMatched(payload?.password, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password didn't match");
  }
  // Access granted: Send AccessToken, RefreshToken
  return {};
};

export const AuthServices = {
  loginUser,
};
