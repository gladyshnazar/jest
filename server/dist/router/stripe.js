"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = require("../constants/endpoints");
const stripe_1 = require("../controllers/stripe");
const protect_1 = require("../middleware/protect");
exports.default = (router) => {
    router.post(endpoints_1.endpoints.stripe.createSession, protect_1.protect, stripe_1.postControllerCreateStripeSession);
    router.post(endpoints_1.endpoints.stripe.webhook, stripe_1.postControllerStripeWebhook);
};
//# sourceMappingURL=stripe.js.map