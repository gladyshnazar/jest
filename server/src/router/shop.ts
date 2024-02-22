import express from "express";
import {
  getControllerAllProducts,
  getControllerDiscountedProducts,
  getControllerFeaturedProducts,
  getControllerProductBySlug,
  getControllerProductsByCategorySlug,
} from "../controllers/shop";
import { endpoints } from "../constants/endpoints";

export default (router: express.Router) => {
  router.get(endpoints.shop.all, getControllerAllProducts)
  router.get(endpoints.shop.featured, getControllerFeaturedProducts);
  router.get(endpoints.shop.discounted, getControllerDiscountedProducts);
  router.get(
    endpoints.shop.category(":slug"),
    getControllerProductsByCategorySlug
  );
  router.get(endpoints.shop.product(":slug"), getControllerProductBySlug);
};
