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
exports.getModelCategoryProducts = exports.getModelCollections = exports.CategoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = require("./product");
const CategorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    products: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" }],
    subcategories: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Subcategory" },
    ],
}, {
    versionKey: false,
});
exports.CategoryModel = mongoose_1.default.model("Category", CategorySchema);
const getModelCollections = () => exports.CategoryModel.find().populate("subcategories");
exports.getModelCollections = getModelCollections;
const getModelCategoryProducts = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield exports.CategoryModel.findOne({ slug });
    if (!category)
        return null;
    const categoryIds = [category._id, ...category.subcategories];
    const data = yield product_1.ProductModel.aggregate([
        {
            $match: {
                $or: [
                    { category: { $in: categoryIds } },
                    { subcategory: { $in: categoryIds } },
                ],
            },
        },
    ]);
    return data;
});
exports.getModelCategoryProducts = getModelCategoryProducts;
//# sourceMappingURL=category.js.map