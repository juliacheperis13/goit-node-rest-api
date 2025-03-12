import HttpError from "../helpers/HttpError.js";

import { findUser } from "../services/authServices.js";

import { verifyToken } from "../helpers/jwt.js";

const message = "Not authorized";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, message));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, message));
  }

  const { data, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, message));
  }

  const user = await findUser({ email: data.email });
  if (!user || user.token !== token) {
    return next(HttpError(401, message));
  }
  req.user = user;

  next();
};

export default authenticate;
