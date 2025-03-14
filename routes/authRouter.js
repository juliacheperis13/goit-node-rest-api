import { Router } from "express";

import ctrlWrapper from "../helpers/ctrlWrapper.js";
import validateBody from "../helpers/validateBody.js";

import authenticate from "../middlewares/authenticate.js";

import {
  authRegisterSchema,
  authLoginSchema,
  subscriptionChangeSchema,
} from "../schemas/authSchemas.js";

import {
  register,
  login,
  logout,
  getCurrent,
  changeSubscription,
  changeAvatar,
} from "../controllers/authControllers.js";

import upload from "../middlewares/upload.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  ctrlWrapper(register)
);

authRouter.post("/login", validateBody(authLoginSchema), ctrlWrapper(login));

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
