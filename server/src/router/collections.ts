import express from "express";
import { getControllerCollections } from "../controllers/collections";
import { endpoints } from "../constants/endpoints";

export default (router: express.Router) => {
  router.get(endpoints.collections, getControllerCollections);
};
