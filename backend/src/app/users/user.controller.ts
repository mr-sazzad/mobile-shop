import { RequestHandler } from "express";
import { userService } from "./user.service";
import { ITokens } from "../types";

// env variables
const node_env = process.env.NODE_ENV;

export const signupUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await userService.signUpUser(user);

    if (result === null) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
      return;
    }

    // secure password
    const { password, ...rest } = result;

    res.status(201).json({
      status: 201,
      message: "user successfully signed up",
      data: rest,
    });
  } catch (err: any) {
    next(err);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const result: ITokens | null = await userService.loginUser(user);

    const refreshToken = result?.refreshToken;

    const cookieOptions = {
      secure: node_env === "production",
      httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      status: 200,
      message: "user successfully  logged in",
      data: result?.accessToken,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await userService.getAllUsers();

    res.status(200).json({
      status: 200,
      message: "users retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userService.getSingleUser(userId);

    res.status(200).json({
      status: 200,
      message: "user retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body;
    const token = req.headers.authorization as string;

    const result = await userService.updateUser(token, userData);
    res.status(200).json({
      status: 200,
      message: "user updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const banUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const token = req.headers.authorization as string;
    const result = await userService.banUser(token, userId);

    res.status(200).json({
      status: 200,
      message: "user banned successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
