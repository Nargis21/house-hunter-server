/* eslint-disable @typescript-eslint/no-explicit-any */
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { IUser, IUserResponse } from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import httpStatus from 'http-status';

const createUser = async (user: IUser) => {
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }

  // // Exclude the password field from the response
  // const responseUser = await User.findById(createdUser._id).select('-password');
  // const { _id, role } = responseUser;

  const isUserExist = await User.isUserExist(createdUser._id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const { _id, role } = isUserExist;

  //create access token
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //create refresh token
  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    isUserExist,
    accessToken,
    refreshToken,
  };
};

export const UserService = {
  createUser,
};
