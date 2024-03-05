import express from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateJWT = (res: express.Response, userId: Types.ObjectId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "3h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 3 * 60 * 60 * 1000, // 3 hours
    path: "/",
  });
};

export default generateJWT;
