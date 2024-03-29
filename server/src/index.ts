import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import { errorHandler, isTrustedError } from "./middleware/error-handler";
import { AppError } from "./AppError";
import { endpoints } from "./constants/endpoints";

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());

app.use(endpoints.stripe.webhook, bodyParser.raw({ type: "application/json" }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on ${process.env.SERVER_URL}`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI!);
mongoose.connection.on("error", (error: Error) => console.error(error));

app.get("/", (req: express.Request, res: express.Response) => {
  return res.send("Express Typescript on Vercel");
});
app.use("/", router());

app.use(
  async (
    err: AppError | Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!isTrustedError(err)) {
      next(err);
    }

    /* At this point, error is operational and is an instance of AppError */
    errorHandler(err, res);
  }
);

process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
  throw reason;
});

process.on("uncaughtException", (error: Error) => {
  errorHandler(error);
  if (!isTrustedError(error)) {
    process.exit(1);
  }
});

module.exports = app;
