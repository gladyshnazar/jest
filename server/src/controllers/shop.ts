import express from "express";

import {
  ProductType,
  getModelAllProducts,
  getModelDiscountedProducts,
  getModelFeaturedProducts,
  getModelProductBySlug,
} from "../models/product";

import { getModelCategoryProducts } from "../models/category";
import { getModelSubcategoryProducts } from "../models/subcategory";
import HttpStatusCode from "../utils/HttpStatusCode";
import asyncWrapper from "../utils/asyncWrapper";
import { AppError } from "../AppError";

export const getControllerAllProducts = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const data = await getModelAllProducts();
    return res.status(HttpStatusCode.OK).json(data);
  }
);

export const getControllerFeaturedProducts = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const data = await getModelFeaturedProducts();
    return res.status(HttpStatusCode.OK).json(data);
  }
);

export const getControllerDiscountedProducts = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const data = await getModelDiscountedProducts();
    return res.status(200).json(data);
  }
);

export const getControllerProductsByCategorySlug = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const { slug } = req.params;
    if (!slug)
      throw new AppError(
        "NO_SLUG",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Category cannot be found"
      );

    let data: ProductType[] | null = [];

    /*
      Check if subcategoty with the given slug exists.
      If found, return its products.
    */
    data = await getModelSubcategoryProducts(slug);
    if (data !== null) return res.status(HttpStatusCode.OK).json(data);

    /*
      If no subbcategory is found with given slug,
      retrieve products of the category with the slug
      and all of its subcategories' products.
    */
    data = await getModelCategoryProducts(slug);
    if (data !== null) return res.status(HttpStatusCode.OK).json(data);

    /*
      If data is null, meaning there's no collection with given slug
      throw an error
    */
    throw new AppError(
      "NO_COLLECTION",
      HttpStatusCode.NOT_FOUND,
      true,
      "Collection does not exist!"
    );
  }
);

export const getControllerProductBySlug = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const { slug } = req.params;
    if (!slug)
      throw new AppError(
        "NO_SLUG",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Product cannot be found!"
      );

    const data = await getModelProductBySlug(slug);
    if (!data) {
      throw new AppError(
        "NOT_FOUND",
        HttpStatusCode.NOT_FOUND,
        true,
        "Product was not found!"
      );
    }

    return res.status(HttpStatusCode.OK).json(data);
  }
);
