import express from "express";

import asyncWrapper from "../utils/asyncWrapper";
import { AppError } from "../AppError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { OrderModel } from "../models/order";
import { getModelUserById } from "../models/user";

require("dotenv").config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY!);

export const postControllerCreateStripeSession = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const { _id } = req.user;
    const { data, isCartCheckout } = req.body;

    const lineItems = data.map((orderItem: any) => ({
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
      purchasedItems: JSON.stringify(
        data.map((orderItem: any) => ({
          product: orderItem.product._id,
          quantity: orderItem.quantity,
        }))
      ),
      isCartCheckout: isCartCheckout.toString(),
    };

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.BASE_URL}/profile?menu=orders`,
      cancel_url: `${process.env.BASE_URL}/payment-error`,
      client_reference_id: _id.toString(),
      metadata: sessionMetadata,
    });

    res.status(HttpStatusCode.OK).json({ url: session.url });
  }
);

const webhookSigningSecret =
  "whsec_d3840b003b74426c1ac77b25fdf3919433bfba47ddff0633ed89b45b4b223446";
export const postControllerStripeWebhook = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        webhookSigningSecret
      );
    } catch (err: any) {
      throw new AppError("WEBHOOK_ERROR", 400, true, "Webhook error");
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;

        /* Retrive session data */
        const customerId = session.metadata!.customerId;
        const totalPrice = session.amount_total! / 100;
        const purchasedProducts = JSON.parse(
          session.metadata!.purchasedItems
        ) as { product: string; quantity: number }[];
        const isCartCheckout = JSON.parse(
          session.metadata!.isCartCheckout
        ) as boolean;

        /* Create an order in a database */
        console.log(purchasedProducts);
        await OrderModel.createOrder({
          customerId,
          totalPrice,
          purchasedProducts,
        });

        /* If the cart is checked out, clear the cart */
        if (isCartCheckout) {
          const user = await getModelUserById(customerId);
          user!.cart = [];
          user?.save();
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
);
