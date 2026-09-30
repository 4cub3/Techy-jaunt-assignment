import User from "../models/user.model";
import bcrypt from "bcrypt";
import { CustomError } from "../config/error";
import jwt from "jsonwebtoken";
import { CONFIGS } from "../config/config";

export const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  token: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}> => {
  let userJson: {
    token: string;
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new CustomError("Incorrect email or password");
      error.statusCode = 400;
      throw error;
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      const error = new CustomError("Incorrect email or password");
      error.statusCode = 400;
      throw error;
    }
    if (!user.isEmailVerified) {
      const error = new CustomError(
        "User needs to verify their email to continue to login",
      );
      error.statusCode = 400;
      throw error;
    }
    const accessToken = jwt.sign({ id: user.id }, CONFIGS.jwtSecret, {
      expiresIn: "7d",
    });
    userJson = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: accessToken,
    };
  } catch (error) {
    throw error;
  }

  return userJson;
};
