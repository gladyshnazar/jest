"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.isTrustedError = void 0;
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const AppError_1 = require("../AppError");
function isTrustedError(error) {
    if (error instanceof AppError_1.AppError) {
        return error.isOperational;
    }
    return false;
}
exports.isTrustedError = isTrustedError;
const errorHandler = (err, res) => {
    // Log the error for debugging purposes
    console.error("ERROR:", err);
    if (err instanceof AppError_1.AppError) {
        if (err.httpCode) {
            // Check if the error is a known error with a status code
            res.status(err.httpCode).json({ error: err.message });
            return;
        }
    }
    res
        .status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map