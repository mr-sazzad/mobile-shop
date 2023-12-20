import { User } from "@prisma/client";
import prisma from "../libs/prisma";
import bcrypt from "bcryptjs";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { ITokens, userRole } from "../types";
import ApiError from "../errors/apiError";
import { jwtHelpers } from "../libs/jwtHelpers";

const saltRounds = Number(process.env.SALT_ROUNDS);
const secret = process.env.SECRET;

const signUpUser = async (user: User): Promise<User | null> => {
  const email = user.email;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new ApiError(401, "User already exists");
  }

  user.password = await bcrypt.hash(user.password, saltRounds);

  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
};

const loginUser = async (user: User): Promise<ITokens | null> => {
  const email = user.email;

  const isUserExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(404, "User not found");
  }

  if (isUserExist.isBanned) {
    throw new ApiError(403, "Your account has been temporarily restricted.");
  }

  const isPasswordMatch = await bcrypt.compare(
    user.password,
    isUserExist?.password
  );

  if (!isPasswordMatch) {
    throw new Error("Password does not match");
  }

  const credentials = {
    id: isUserExist.id,
    name: isUserExist.name,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwtHelpers.createToken(
    credentials,
    secret as string,
    "1d"
  );

  const refreshToken = jwtHelpers.createToken(
    credentials,
    secret as string,
    "365d"
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getAllUsers = async (): Promise<User[] | null> => {
  const users = await prisma.user.findMany({
    where: {
      role: "user",
    },
  });

  if (!users.length) {
    return null;
  }

  return users;
};

const getSingleUser = async (userId: string): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      Cart: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const updateUser = async (
  token: string,
  user: Partial<User>
): Promise<User | null> => {
  if (!token) {
    throw new Error("Token Not Provided");
  }

  const decodedToken = Jwt.decode(token) as JwtPayload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
    },
  });

  if (!isUserExist) {
    throw new Error("User does not exist");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: decodedToken.id,
    },
    data: user,
  });

  return updatedUser;
};

const banUser = async (token: string, userId: string): Promise<User | null> => {
  if (!token) {
    throw new Error("token not provided");
  }

  if (!userId) {
    throw new Error("userId not provided");
  }

  const decodedToken = jwtHelpers.verifyToken(
    token,
    secret as string
  ) as JwtPayload;

  if (decodedToken.role !== userRole.superAdmin) {
    throw new ApiError(403, "you are not allowed to ban this user");
  }

  const banUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isBanned: true,
    },
  });

  return banUser;
};

export const userService = {
  signUpUser,
  loginUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  banUser,
};
