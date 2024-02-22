import { loadStripe } from "@stripe/stripe-js";
import { Stripe } from "node_modules/@stripe/stripe-js/types";
const stripeKey = import.meta.env.VITE_STRIPE_KEY;

import axios from "@/configs/axios-config";
import { endpoints } from "@/constants/endpoints";

type CheckoutData = {
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrls: string[];
  };
  quantity: number;
}[];
export const handleCheckout = async (
  data: CheckoutData,
  isCartCheckout: boolean
) => {
  const stripe: Stripe | null = await loadStripe(stripeKey);
  if (!stripe) return;

  const res = await axios.post(
    endpoints.stripe.createSession,
    { data, isCartCheckout },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  window.location.href = res.data.url;
};
