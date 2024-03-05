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
exports.getControllerProductBySlug = exports.getControllerProductsByCategorySlug = exports.getControllerDiscountedProducts = exports.getControllerFeaturedProducts = exports.getControllerAllProducts = void 0;
const product_1 = require("../models/product");
const category_1 = require("../models/category");
const subcategory_1 = require("../models/subcategory");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const asyncWrapper_1 = __importDefault(require("../utils/asyncWrapper"));
const AppError_1 = require("../AppError");
exports.getControllerAllProducts = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, product_1.getModelAllProducts)();
    return res.status(HttpStatusCode_1.default.OK).json(data);
}));
exports.getControllerFeaturedProducts = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, product_1.getModelFeaturedProducts)();
    return res.status(HttpStatusCode_1.default.OK).json(data);
}));
exports.getControllerDiscountedProducts = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, product_1.getModelDiscountedProducts)();
    return res.status(200).json(data);
}));
exports.getControllerProductsByCategorySlug = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug)
        throw new AppError_1.AppError("NO_SLUG", HttpStatusCode_1.default.BAD_REQUEST, true, "Category cannot be found");
    let data = [];
    /*
      Check if subcategoty with the given slug exists.
      If found, return its products.
    */
    data = yield (0, subcategory_1.getModelSubcategoryProducts)(slug);
    if (data !== null)
        return res.status(HttpStatusCode_1.default.OK).json(data);
    /*
      If no subbcategory is found with given slug,
      retrieve products of the category with the slug
      and all of its subcategories' products.
    */
    data = yield (0, category_1.getModelCategoryProducts)(slug);
    if (data !== null)
        return res.status(HttpStatusCode_1.default.OK).json(data);
    /*
      If data is null, meaning there's no collection with given slug
      throw an error
    */
    throw new AppError_1.AppError("NO_COLLECTION", HttpStatusCode_1.default.NOT_FOUND, true, "Collection does not exist!");
}));
exports.getControllerProductBySlug = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    if (!slug)
        throw new AppError_1.AppError("NO_SLUG", HttpStatusCode_1.default.BAD_REQUEST, true, "Product cannot be found!");
    const data = yield (0, product_1.getModelProductBySlug)(slug);
    if (!data) {
        throw new AppError_1.AppError("NOT_FOUND", HttpStatusCode_1.default.NOT_FOUND, true, "Product was not found!");
    }
    return res.status(HttpStatusCode_1.default.OK).json(data);
}));
//# sourceMappingURL=shop.js.map