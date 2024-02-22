import express from "express";
import { endpoints } from "../constants/endpoints";

import {
  postControllerCreateStripeSession,
  postControllerStripeWebhook,
} from "../controllers/stripe";
import { protect } from "../middleware/protect";

export default (router: express.Router) => {
  router.post(
    endpoints.stripe.createSession,
    protect,
    postControllerCreateStripeSession
  );
  router.post(endpoints.stripe.webhook, postControllerStripeWebhook);
};
