import express from "express";
const asyncWrapper = (controller: express.RequestHandler) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncWrapper;
