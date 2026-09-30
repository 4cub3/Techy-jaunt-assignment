import joi from "joi";
import { PASSWORD_REGEX } from "../constants/regex";

export const registerSchema = joi.object({
  email: joi
    .string()
    .email()
    .trim()
    .not()
    .empty()
    .message("invalid email address")
    .required(),
  password: joi
    .string()
    .not()
    .empty()
    .pattern(new RegExp(PASSWORD_REGEX))
    .message(
      "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.",
    )
    .required(),
  confirmPassword: joi.valid(joi.ref("password")).required(),
  firstName: joi
    .string()
    .not()
    .empty()
    .trim()
    .message("first name is required")
    .required(),
  lastName: joi
    .string()
    .not()
    .empty()
    .trim()
    .message("first name is required")
    .required(),
  // .message("Confirm password did not match with password")
});
