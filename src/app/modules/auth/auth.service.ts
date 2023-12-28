import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

const loginUser = async (payload: TLoginUser) => {
  // Checking if the user is exist
  // I just used it here to get the user data
  const userData = await User.isUserExistsByCustomId(payload?.id);

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

  // Checking if password is correct
  if (!(await User.isPasswordMatched(payload?.password, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password55 didn't match");
  }

  // Create token and sent to the client

  const jwtPayload = {
    userId: userData?.id,
    role: userData?.role,
  };

  // creation of access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret_key as string,
    config.jwt_access_expires_in as string,
  );

  // creation of refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret_key as string,
    config.jwt_refresh_expires_in as string,
  );

  // sending refreshToken to the cookie

  // Access granted: Send AccessToken, RefreshToken
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: userData?.needsPasswordChange,
  };
};

const changePasswordIntoDB = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // I just used it here to get the user data
  const userData = await User.isUserExistsByCustomId(user?.userId);

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

  // Checking if password is correct
  if (
    !(await User.isPasswordMatched(payload?.oldPassword, userData?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, "Password didn't match");
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: user?.userId,
      role: user?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // Check if the token valid
  const decoded = verifyToken(token, config.jwt_refresh_secret_key as string);

  const { userId, iat } = decoded;

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
  const jwtPayload = {
    userId: userData?.id,
    role: userData?.role,
  };

  // creation of access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret_key as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

const forgetPassword = async (userId: string) => {
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

  const jwtPayload = {
    userId: userData?.id,
    role: userData?.role,
  };

  // creation of access token
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret_key as string,
    '10m',
  );
  const resetUILink = `${config.reset_pass_ui_link}?id=${userData?.id}&token=${resetToken}`;

  sendEmail(userData?.email, resetUILink);
  // console.log(userData?.email, resetUILink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const userId = payload?.id;
  const newPassword = payload?.newPassword;
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

  // Verify access secret key
  const decoded = verifyToken(token, config.jwt_access_secret_key as string);

  // Checking userId from payload and decoded are same or not
  if (userId !== decoded?.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      id: decoded?.userId,
      role: decoded?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
};
export const AuthServices = {
  loginUser,
  changePasswordIntoDB,
  refreshToken,
  forgetPassword,
  resetPassword,
};
