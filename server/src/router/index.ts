import express from "express";

import collections from "./collections";
import shop from "./shop";
import search from "./search";
import user from "./user";
import stripe from "./stripe";

const router = express.Router();

export default (): express.Router => {
  user(router);
  collections(router);
  shop(router);
  search(router);
  stripe(router);

  return router;
};
