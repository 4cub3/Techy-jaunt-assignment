import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { CONFIGS } from "../config/config";
import { CustomError } from "../config/error";

const unauthorized = () => {
  const error = new CustomError("Unauthorized, user is not authenticated");
  error.statusCode = 401;
  return error;
};

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.get("Authorization");
    if (!header) {
      const error = new CustomError("Unathourized, user is not authenticated");
      error.statusCode = 401;
      throw error;
    }
    const [scheme, token] = header.split(" ");
    if (scheme !== "Bearer" || !token) throw unauthorized();
    const user = jwt.verify(token, CONFIGS.jwtSecret);
    if (!user) {
      throw unauthorized;
    }
    //@ts-ignore
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuth;
