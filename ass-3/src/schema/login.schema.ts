import joi from "joi";

export const loginSchema = joi.object({
  email: joi.string().email().message("Email must be a valid email address"),
  password: joi.string(),
});
