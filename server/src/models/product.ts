import mongoose from "mongoose";
import { SubcategoryModel } from "./subcategory";
import { CategoryModel } from "./category";
import path from "path";

export type ProductType = mongoose.Document & {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  imageUrls: string[];
  price: number;
  originalPrice?: number;
  isDiscounted: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ProductSchema = new mongoose.Schema<ProductType>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    versionKey: false,
  }
);

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

export const ProductModel = mongoose.model<ProductType>(
  "Product",
  ProductSchema
);

export const getModelAllProducts = (): Promise<ProductType[]> =>
  ProductModel.find();

export const getModelFeaturedProducts = (): Promise<ProductType[]> =>
  ProductModel.find({ isFeatured: true });

export const getModelDiscountedProducts = (): Promise<ProductType[]> =>
  ProductModel.find({ isDiscounted: true });

export const getModelProductBySlug = (slug: string) =>
  ProductModel.findOne({ slug });

export const getModelProductsByQuery = (
  query: string
): Promise<ProductType[]> =>
  ProductModel.find({
    $or: [
      { name: { $regex: new RegExp(query, "i") } },
      { description: { $regex: new RegExp(query, "i") } },
    ],
  });
