import { Router } from "express";

import ctrlWrapper from "../helpers/ctrlWrapper.js";
import validateBody from "../helpers/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

import {
  authRegisterSchema,
  authLoginSchema,
  subscriptionChangeSchema,
  authVerifySchema,
} from "../schemas/authSchemas.js";

import {
  register,
  login,
  logout,
  getCurrent,
  changeSubscription,
  changeAvatar,
  verify,
  resendVerify,
} from "../controllers/authControllers.js";

import upload from "../middlewares/upload.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  ctrlWrapper(register)
);

authRouter.post("/login", validateBody(authLoginSchema), ctrlWrapper(login));

authRouter.post("/verify", validateBody(authVerifySchema),  ctrlWrapper(resendVerify));

authRouter.get("/verify/:verificationToken", ctrlWrapper(verify));

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(subscriptionChangeSchema),
  ctrlWrapper(changeSubscription)
);

authRouter.get("/current", authenticate, ctrlWrapper(getCurrent));

authRouter.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(changeAvatar));

authRouter.post("/logout", authenticate, ctrlWrapper(logout));

export default authRouter;
