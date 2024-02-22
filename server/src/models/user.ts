import mongoose from "mongoose";
import { ProductType } from "./product";
import { OrderType } from "./order";

export type CartItemType = {
  quantity: number;
  product: mongoose.Types.ObjectId | ProductType;
};
export type UserType = mongoose.Document & {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  cart: CartItemType[];
  updatedAt: string;
  createdAt: string;
  orders: mongoose.Types.ObjectId[];
};

const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, default: 1 },
  },
  {
    _id: false,
  }
);

const UserSchema = new mongoose.Schema<UserType>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minLength: 6 },
    cart: [CartItemSchema],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = mongoose.model<UserType>("User", UserSchema);

export const getModelUserById = (id: string) => User.findById(id);
