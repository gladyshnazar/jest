"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (res, userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "3h",
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false, // Use secure cookies in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });
};
exports.default = generateJWT;
//# sourceMappingURL=generateJWT.js.map