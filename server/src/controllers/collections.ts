import express from "express";
import { getModelCollections } from "../models/category";
import asyncWrapper from "../utils/asyncWrapper";
import HttpStatusCode from "../utils/HttpStatusCode";

export const getControllerCollections = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const data = await getModelCollections();
    res.status(HttpStatusCode.OK).json(data);
  }
);
