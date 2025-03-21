import * as authServices from "../services/authServices.js";
import path from "node:path";
import fs from "node:fs/promises";

const avatarsPath = path.resolve("public", "avatars");

export const register = async (req, res) => {
  const result = await authServices.signupUser(req.body);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

export const login = async (req, res) => {
  const result = await authServices.signinUser(req.body);

  res.json({
    token: result.token,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

export const changeSubscription = async (req, res) => {
  const { subscription } = await authServices.changeSubscription(
    req.user.id,
    req.body
  );

  res.json({ subscription });
};

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

export const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.signoutUser({ id });

  res.sendStatus(204);
};

export const changeAvatar = async (req, res) => {
  let avatar = null;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    avatar = path.join("avatars", filename);
  }

  const { id } = req.user;
  const result = await authServices.changeAvatar({ id }, avatar);

  res.json({ avatarURL: result.avatarURL });
};
