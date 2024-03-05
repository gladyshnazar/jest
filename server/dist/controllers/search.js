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
exports.getControllerProductsByQuery = void 0;
const asyncWrapper_1 = __importDefault(require("../utils/asyncWrapper"));
const AppError_1 = require("../AppError");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const product_1 = require("../models/product");
exports.getControllerProductsByQuery = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.params;
    if (!query)
        throw new AppError_1.AppError("NO_QUERY", HttpStatusCode_1.default.BAD_REQUEST, true, "Query was not provided");
    const data = yield (0, product_1.getModelProductsByQuery)(query);
    res.status(HttpStatusCode_1.default.OK).json(data);
}));
//# sourceMappingURL=search.js.map