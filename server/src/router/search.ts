import express from "express";
import { getControllerProductsByQuery } from "../controllers/search";
import { endpoints } from "../constants/endpoints";

export default (router: express.Router) => {
  router.get(endpoints.search(":query"), getControllerProductsByQuery);
};
