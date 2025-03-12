import Joi from "joi";

import { emailRegexp } from "../constants/regex.js";

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const subscriptionChangeSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
