import HttpStatusCode from "./utils/HttpStatusCode";

export class AppError extends Error {
  name: string;
  httpCode: HttpStatusCode;
  isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    isOperational: boolean,
    desctiption: string
  ) {
    super(desctiption);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
