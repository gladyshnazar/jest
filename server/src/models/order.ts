import mongoose from "mongoose";
import { User } from "./user";

type PurchasedProduct = {
  product: mongoose.Types.ObjectId;
  quantity: number;
};

export type OrderType = mongoose.Document & {
  customerId: mongoose.Types.ObjectId;
  totalPrice: number;
  purchasedProducts: PurchasedProduct[];
  createdAt: Date;
  updatedAt: Date;
};

type OrderDataType = {
  customerId: string;
  totalPrice: number;
  purchasedProducts: { product: string; quantity: number }[];
};

type OrderModel = mongoose.Model<OrderType> & {
  createOrder(orderData: OrderDataType): Promise<OrderType>;
};

const OrderSchema = new mongoose.Schema<OrderType>(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    totalPrice: { type: Number, required: true },
    purchasedProducts: [
      {
        _id: false,
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

OrderSchema.statics.createOrder = async function ({
  customerId,
  totalPrice,
  purchasedProducts,
}: OrderDataType): Promise<OrderType> {
  console.log("SCHEMA", purchasedProducts);
  return this.create({
    customerId: new mongoose.Types.ObjectId(customerId),
    totalPrice,
    purchasedProducts: purchasedProducts.map(product => ({
      product: new mongoose.Types.ObjectId(product.product),
      quantity: product.quantity,
    })),
  });
};

OrderSchema.post("save", async function (doc, next) {
  try {
    const user = await User.findById(doc.customerId);

    user!.orders.push(doc._id);
    await user!.save();
    next();
  } catch (error: any) {
    next(error);
  }
});

export const OrderModel = mongoose.model<OrderType, OrderModel>(
  "Order",
  OrderSchema
);