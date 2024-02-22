import express from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { AppError } from "../AppError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { getModelProductsByQuery } from "../models/product";

export const getControllerProductsByQuery = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const { query } = req.params;
    if (!query)
      throw new AppError(
        "NO_QUERY",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Query was not provided"
      );

    const data = await getModelProductsByQuery(query);
    res.status(HttpStatusCode.OK).json(data);
  }
);
