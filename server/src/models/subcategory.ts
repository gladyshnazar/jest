import mongoose from "mongoose";
import { CategoryModel, CategoryType } from "./category";
import { ProductType } from "./product";

export type SubcategoryType = mongoose.Document & {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  parentCategory: mongoose.Types.ObjectId | CategoryType;
  products: mongoose.Types.ObjectId[] | ProductType[];
};

const SubcategorySchema = new mongoose.Schema<SubcategoryType>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    versionKey: false,
  }
);

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

export const SubcategoryModel = mongoose.model<SubcategoryType>(
  "Subcategory",
  SubcategorySchema
);

export const getModelSubcategoryProducts = async (
  slug: string
): Promise<any> => {
  const data = await SubcategoryModel.findOne({ slug })
    .populate("products")
    .select("products");
  if (data === null) return null;
  return data.products;
};
