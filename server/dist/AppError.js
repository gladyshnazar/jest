"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(name, httpCode, isOperational, desctiption) {
        super(desctiption);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map