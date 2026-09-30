import { Router } from "express";
import { AUTH_ROUTE } from "../types/routes.types";
import { login, register, verifyEmail } from "../controllers/auth.controllers";
import {
  validateBodySchema,
  validateQuerySchema,
} from "../middleware/validate.errors";
import { registerSchema } from "../schema/register.schema";
import { VerifyEmailQuery } from "../schema/verify-email.schema";
import { loginSchema } from "../schema/login.schema";
const router = Router();

router.post(AUTH_ROUTE.LOGIN, validateBodySchema(loginSchema), login);
router.post(AUTH_ROUTE.REGISTER, validateBodySchema(registerSchema), register);
router.put(
  AUTH_ROUTE.VERIFY_EMAIL,
  validateQuerySchema(VerifyEmailQuery),
  verifyEmail,
);
export default router;
