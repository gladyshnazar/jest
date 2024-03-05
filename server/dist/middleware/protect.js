"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = require("../models/user");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const AppError_1 = require("../AppError");
exports.protect = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    token = req.cookies.jwt;
    if (!token) {
        throw new AppError_1.AppError("NO_TOKEN", HttpStatusCode_1.default.UNAUTHORIZED, true, "Unauthenticated");
    }
    const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = yield user_1.User.findById(verified.userId);
    if (!user) {
        throw new AppError_1.AppError("NOT_FOUND", HttpStatusCode_1.default.NOT_FOUND, true, "User not found");
    }
    req.user = user;
    next();
}));
//# sourceMappingURL=protect.js.map