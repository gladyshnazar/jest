import express from "express";
import HttpStatusCode from "../utils/HttpStatusCode";
import { AppError } from "../AppError";

export function isTrustedError(error: Error) {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
}

export const errorHandler = (err: AppError | Error, res?: express.Response) => {
  // Log the error for debugging purposes
  console.error("ERROR:", err);

  if (err instanceof AppError) {
    if (err.httpCode) {
      // Check if the error is a known error with a status code
      res!.status(err.httpCode).json({ error: err.message });
      return;
    }
  }

  res!
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .json({ error: "Internal Server Error" });
};
