import jwt from "jsonwebtoken";
import { CONFIGS } from "../config/config";
import { CustomError } from "../config/error";
import User from "../models/user.model";
import type { IVerifyTokenQuery } from "../types/auth.controller.types";
import { type Response } from "express";
import bcrypt from "bcrypt";

export const VerifyTokenService = async (
  data: IVerifyTokenQuery,
  res?: Response,
): Promise<void> => {
  let error;
  try {
    const user = await User.findById(data.user!);
    if (!user) {
      error = new CustomError("User not found");
      error.statusCode = 404;
      throw error;
    }
    if (user.isEmailVerified) {
      res?.status(200).json({
        message: "Email as already been verified",
      });
      return;
    }
    const decodeToken = jwt.verify(data.token!, CONFIGS.jwtSecret);
    if (!decodeToken) {
      await user.updateOne({ tokenHashed: null });
      error = new CustomError("Token expired");
      error.statusCode = 400;
      throw error;
    }
    const isMatched = bcrypt.compare(data.token!, user.tokenHashed);
    if (!isMatched) {
      error = new CustomError("Invalid token");
      error.statusCode = 422;
      throw error;
    }
    await user.updateOne({ isEmailVerified: true, tokenHashed: null });
  } catch (error) {
    throw error;
  }
};
