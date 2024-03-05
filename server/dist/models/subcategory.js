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
exports.getModelSubcategoryProducts = exports.SubcategoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SubcategorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    parentCategory: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    products: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" }],
}, {
    versionKey: false,
});
/* SubcategorySchema.post("save", async function (doc, next) {
  try {
    await CategoryModel.findByIdAndUpdate(
      doc.parentCategory,
      { $addToSet: { subcategories: doc._id } },
      { new: true }
    );
    next();
  } catch (error: any) {
    next(error);
  }
}); */
exports.SubcategoryModel = mongoose_1.default.model("Subcategory", SubcategorySchema);
const getModelSubcategoryProducts = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield exports.SubcategoryModel.findOne({ slug })
        .populate("products")
        .select("products");
    if (data === null)
        return null;
    return data.products;
});
exports.getModelSubcategoryProducts = getModelSubcategoryProducts;
//# sourceMappingURL=subcategory.js.map