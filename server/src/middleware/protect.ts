import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserType } from "../models/user";
import HttpStatusCode from "../utils/HttpStatusCode";
import { AppError } from "../AppError";

declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    throw new AppError(
      "NO_TOKEN",
      HttpStatusCode.UNAUTHORIZED,
      true,
      "Unauthenticated"
    );
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

  const user = await User.findById(verified.userId);
  if (!user) {
    throw new AppError(
      "NOT_FOUND",
      HttpStatusCode.NOT_FOUND,
      true,
      "User not found"
    );
  }

  req.user = user;
  next();
});
