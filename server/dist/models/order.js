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
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./user");
const OrderSchema = new mongoose_1.default.Schema({
    customerId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    totalPrice: { type: Number, required: true },
    purchasedProducts: [
        {
            _id: false,
            product: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true },
        },
    ],
}, {
    timestamps: true,
    versionKey: false,
});
OrderSchema.statics.createOrder = function ({ customerId, totalPrice, purchasedProducts, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("SCHEMA", purchasedProducts);
        return this.create({
            customerId: new mongoose_1.default.Types.ObjectId(customerId),
            totalPrice,
            purchasedProducts: purchasedProducts.map(product => ({
                product: new mongoose_1.default.Types.ObjectId(product.product),
                quantity: product.quantity,
            })),
        });
    });
};
OrderSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findById(doc.customerId);
            user.orders.push(doc._id);
            yield user.save();
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.OrderModel = mongoose_1.default.model("Order", OrderSchema);
//# sourceMappingURL=order.js.map