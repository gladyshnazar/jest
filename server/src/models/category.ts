import mongoose from "mongoose";
import { ProductModel, ProductType } from "./product";
import { SubcategoryType } from "./subcategory";

export type CategoryType = mongoose.Document & {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  imageUrl: string;
  products: mongoose.Types.ObjectId[] | ProductType[];
  subcategories: mongoose.Types.ObjectId[] | SubcategoryType[];
};

const CategorySchema = new mongoose.Schema<CategoryType>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    ],
  },
  {
    versionKey: false,
  }
);

export const CategoryModel = mongoose.model<CategoryType>(
  "Category",
  CategorySchema
);

export const getModelCollections = () =>
  CategoryModel.find().populate("subcategories");

export const getModelCategoryProducts = async (
  slug: string
): Promise<ProductType[] | null> => {
  const category: CategoryType | null = await CategoryModel.findOne({ slug });

  if (!category) return null;
  const categoryIds = [category._id, ...category.subcategories];

  const data = await ProductModel.aggregate([
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
};
