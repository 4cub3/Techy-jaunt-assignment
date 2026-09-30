import bcrypt from "bcrypt";
import User from "../models/user.model";
import type { IUser } from "../types/user.types";
import { CustomError } from "../config/error";

export const registerUserService = async (
  data: IUser & { confirmPassword: string },
  token: string,
) => {
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      const error = new CustomError(
        "There is an existing user with this email address",
      );
      error.statusCode = 409;
      throw error;
    }

    const hashToken = await bcrypt.hash(token, 10);
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await User.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      tokenHashed: hashToken,
    });
    if (!user) {
      const error = new Error("Unable to create user");
      throw error;
    }
    return user;
  } catch (error) {
    throw error;
  }
};
