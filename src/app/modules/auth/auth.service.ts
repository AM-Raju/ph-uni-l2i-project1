import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // Checking if the user is exist

  const isUserExists = await User.findOne({ id: payload?.id });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This user isn't found");
  }

  // Checking if the user is already deleted
  const isDeleted = isUserExists?.isDeleted;

  if (!isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Deleted');
  }

  // Checking if the user is blocked
  const userStatus = isUserExists?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked');
  }

  // Checking if password is correct

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );

  // Access granted: Send AccessToken, RefreshToken
  return {};
};

export const AuthServices = {
  loginUser,
};
