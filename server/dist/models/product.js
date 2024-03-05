"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelProductsByQuery = exports.getModelProductBySlug = exports.getModelDiscountedProducts = exports.getModelFeaturedProducts = exports.getModelAllProducts = exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true,
    },
    imageUrls: { type: [String], required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    isFeatured: { type: Boolean, default: false },
    isDiscounted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    versionKey: false,
});
/* ProductSchema.post("save", async function (doc, next) {
  try {
    const subcategory = await SubcategoryModel.findById(doc.category);
    if (subcategory) {
      subcategory.products.push(doc._id);
      await subcategory.save();
    } else {
      const category = await CategoryModel.findById(doc.category);
      if (category) {
        category.products.push(doc._id);
        await category.save();
      }
    }
    next();
  } catch (error: any) {
    next(error);
  }
}); */
exports.ProductModel = mongoose_1.default.model("Product", ProductSchema);
const getModelAllProducts = () => exports.ProductModel.find();
exports.getModelAllProducts = getModelAllProducts;
const getModelFeaturedProducts = () => exports.ProductModel.find({ isFeatured: true });
exports.getModelFeaturedProducts = getModelFeaturedProducts;
const getModelDiscountedProducts = () => exports.ProductModel.find({ isDiscounted: true });
exports.getModelDiscountedProducts = getModelDiscountedProducts;
const getModelProductBySlug = (slug) => exports.ProductModel.findOne({ slug });
exports.getModelProductBySlug = getModelProductBySlug;
const getModelProductsByQuery = (query) => exports.ProductModel.find({
    $or: [
        { name: { $regex: new RegExp(query, "i") } },
        { description: { $regex: new RegExp(query, "i") } },
    ],
});
exports.getModelProductsByQuery = getModelProductsByQuery;
//# sourceMappingURL=product.js.map