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
exports.getControllerCollections = void 0;
const category_1 = require("../models/category");
const asyncWrapper_1 = __importDefault(require("../utils/asyncWrapper"));
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
exports.getControllerCollections = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, category_1.getModelCollections)();
    res.status(HttpStatusCode_1.default.OK).json(data);
}));
//# sourceMappingURL=collections.js.map