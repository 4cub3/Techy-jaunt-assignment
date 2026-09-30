import joi from "joi";
export const VerifyEmailQuery = joi.object({
  token: joi.string().min(12).trim().message("token is required").required(),
  user: joi.string().min(12).trim().not().empty().message("user iD is required")
    .required(),
});
