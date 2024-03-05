"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelUserById = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CartItemSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, default: 1 },
}, {
    _id: false,
});
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minLength: 6 },
    cart: [CartItemSchema],
    orders: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Order" }],
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = mongoose_1.default.model("User", UserSchema);
const getModelUserById = (id) => exports.User.findById(id);
exports.getModelUserById = getModelUserById;
//# sourceMappingURL=user.js.map