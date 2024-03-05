"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postControllerStripeWebhook = exports.postControllerCreateStripeSession = void 0;
const asyncWrapper_1 = __importDefault(require("../utils/asyncWrapper"));
const AppError_1 = require("../AppError");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
const order_1 = require("../models/order");
const user_1 = require("../models/user");
require("dotenv").config();
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY);
exports.postControllerCreateStripeSession = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { data, isCartCheckout } = req.body;
    const lineItems = data.map((orderItem) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: orderItem.product.name,
                images: orderItem.product.imageUrls,
            },
            unit_amount: Math.round(orderItem.product.price * 100),
        },
        quantity: orderItem.quantity,
    }));
    const sessionMetadata = {
        customerId: _id.toString(),
        purchasedItems: JSON.stringify(data.map((orderItem) => ({
            product: orderItem.product._id,
            quantity: orderItem.quantity,
        }))),
        isCartCheckout: isCartCheckout.toString(),
    };
    const session = yield stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${process.env.CLIENT_URL}/profile?menu=orders`,
        cancel_url: `${process.env.CLIENT_URL}/payment-error`,
        client_reference_id: _id.toString(),
        metadata: sessionMetadata,
    });
    res.status(HttpStatusCode_1.default.OK).json({ url: session.url });
}));
const webhookSigningSecret = "whsec_d3840b003b74426c1ac77b25fdf3919433bfba47ddff0633ed89b45b4b223446";
exports.postControllerStripeWebhook = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSigningSecret);
    }
    catch (err) {
        throw new AppError_1.AppError("WEBHOOK_ERROR", 400, true, "Webhook error");
    }
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;
            /* Retrive session data */
            const customerId = session.metadata.customerId;
            const totalPrice = session.amount_total / 100;
            const purchasedProducts = JSON.parse(session.metadata.purchasedItems);
            const isCartCheckout = JSON.parse(session.metadata.isCartCheckout);
            /* Create an order in a database */
            console.log(purchasedProducts);
            yield order_1.OrderModel.createOrder({
                customerId,
                totalPrice,
                purchasedProducts,
            });
            /* If the cart is checked out, clear the cart */
            if (isCartCheckout) {
                const user = yield (0, user_1.getModelUserById)(customerId);
                user.cart = [];
                user === null || user === void 0 ? void 0 : user.save();
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
}));
//# sourceMappingURL=stripe.js.map