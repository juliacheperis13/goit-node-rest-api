import bcrypt from "bcrypt";

import User from "../db/models/user.js";

import HttpError from "../helpers/HttpError.js";

import { createToken } from "../helpers/jwt.js";

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) return null;

  return user.update(data, {
    returning: true,
  });
};

export const signupUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...payload, password: hashPassword });
  return newUser;
};

export const siginUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const paswordCompare = await bcrypt.compare(password, user.password);
  if (!paswordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = createToken({ email });
  await user.update(
    { token },
    {
      returning: true,
    }
  );

  return {
    token,
    email,
    subscription: user.subscription,
  };
};

export const changeSubscription = async (query, { subscription }) => {
  return updateUser(query, { subscription });
};

export const signoutUser = (query) => {
  return updateUser(query, { token: null });
};
