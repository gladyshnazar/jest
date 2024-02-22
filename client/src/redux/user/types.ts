import { ProductType } from "../shop/types";
import { ErrorType, StatusType } from "../types";

export type CartItemType = {
  quantity: number;
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrls: string[];
  };
};

export type OrderType = {
  _id: string;
  customerId: number;
  purchasedProducts: { product: ProductType; quantity: number }[];
  totalPrice: number;
  updatedAt: string;
  createdAt: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  cart: CartItemType[];
  orders: OrderType[];
  updatedAt: string;
  createdAt: string;
};

export type UserState = {
  data: UserType | null;
  status: StatusType;
  error: ErrorType;
};
