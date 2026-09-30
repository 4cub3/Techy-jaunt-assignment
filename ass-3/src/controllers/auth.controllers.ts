import type { Request, Response, NextFunction } from "express";
import { registerUserService } from "../services/register.service";
import type { IUser } from "../types/user.types";
import type { IVerifyTokenQuery } from "../types/auth.controller.types";
import { VerifyTokenService } from "../services/verify-email.service";
import jwt from "jsonwebtoken";
import { CONFIGS } from "../config/config";
import { registerEmailTemplate } from "../constants/email-templates";
import { sendEmail } from "../services/send-email.service";
import { loginService } from "../services/login.service";

class Authentication {
  async register(
    req: Request<unknown, unknown, IUser & { confirmPassword: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = jwt.sign({ email: req.body.email }, CONFIGS.jwtSecret, {
        expiresIn: "30d",
      });
      const user = await registerUserService(req.body, token);
      const name = `${user.firstName} ${user.lastName}`;
      const redirectLink = `http:localhost:3000?token=${token}&user=${user.id}`;
      const emailHtml = registerEmailTemplate(name, redirectLink, "30 days");

      await sendEmail(
        CONFIGS.emailFrom,
        user.email,
        "Email verification",
        emailHtml,
      );

      res.status(201).json({
        email: user.email,
        id: user.id,
      });
    } catch (error) {
      next(error);
    }
  }
  async verifyEmail(
    req: Request<{}, {}, {}, IVerifyTokenQuery>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await VerifyTokenService(req.query, res);
      res.status(200).json({
        message: "User email verified successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async login(
    req: Request<unknown, unknown, { email: string; password: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await loginService(req.body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export const { register, login, verifyEmail } = new Authentication();
