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
exports.postControllerEditProfile = exports.postControllerEditPassword = exports.postControllerDecreaseProductQuantityInCart = exports.postControllerIncreaseProductQuantityInCart = exports.postControllerRemoveProductFromCart = exports.postControllerAddProductToCart = exports.postControllerFetchUser = exports.postControllerSignout = exports.postControllerSignin = exports.postControllerSignup = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateJWT_1 = __importDefault(require("../utils/generateJWT"));
const product_1 = require("../models/product");
const asyncWrapper_1 = __importDefault(require("../utils/asyncWrapper"));
const AppError_1 = require("../AppError");
const HttpStatusCode_1 = __importDefault(require("../utils/HttpStatusCode"));
exports.postControllerSignup = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    /* Server-side validation */
    if (!name || !email || !password) {
        throw new AppError_1.AppError("MISSING_FIELDS", HttpStatusCode_1.default.BAD_REQUEST, true, "Please, provide all the fields");
    }
    if (password.length < 6) {
        throw new AppError_1.AppError("PASSWORD_TOO_SHORT", HttpStatusCode_1.default.BAD_REQUEST, true, "Password should be at least 6 characters long");
    }
    const userExists = yield user_1.User.findOne({ email });
    if (userExists) {
        throw new AppError_1.AppError("USER_EXISTS", HttpStatusCode_1.default.BAD_REQUEST, true, "User already exists!");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
    const newUser = new user_1.User({
        name,
        email,
        password: hashedPassword,
    });
    yield newUser.save();
    res.status(HttpStatusCode_1.default.CREATED).json({ message: "Signed up" });
}));
exports.postControllerSignin = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new AppError_1.AppError("MISSING_FIELDS", HttpStatusCode_1.default.BAD_REQUEST, true, "Please enter all the fields!");
    }
    const user = yield user_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.AppError("INCORRECT_EMAIL", HttpStatusCode_1.default.BAD_REQUEST, true, "User with this email does not exist!");
    }
    const doesPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!doesPasswordMatch) {
        throw new AppError_1.AppError("INCORRECT_PASSWORD", HttpStatusCode_1.default.BAD_REQUEST, true, "Incorrect password!");
    }
    /* Generate JWT here */
    (0, generateJWT_1.default)(res, user._id);
    res.status(HttpStatusCode_1.default.CREATED).json({
        message: "Singed in",
    });
}));
const postControllerSignout = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(HttpStatusCode_1.default.OK).json({ message: "Signed out" });
};
exports.postControllerSignout = postControllerSignout;
exports.postControllerFetchUser = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    yield user.populate([
        /* Poppulates products inside user's cart */
        {
            path: "cart.product",
            model: "Product",
            select: "name price imageUrls",
        },
        /* Poppulates products inside user's orders */
        {
            path: "orders",
            populate: {
                path: "purchasedProducts.product",
                model: "Product",
            },
        },
    ]);
    res.status(HttpStatusCode_1.default.OK).json({ user });
}));
exports.postControllerAddProductToCart = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    const user = req.user;
    const product = yield product_1.ProductModel.findById(productId);
    if (!product) {
        throw new AppError_1.AppError("PRODUCT_NOT_FOUND", HttpStatusCode_1.default.NOT_FOUND, true, "Product does not exist");
    }
    const existingProductIndex = user.cart.findIndex((cartItem) => {
        return cartItem.product.toString() === productId;
    });
    if (existingProductIndex !== -1) {
        user.cart[existingProductIndex].quantity += 1;
    }
    else {
        const newCartItem = { product: productId, quantity: 1 };
        user.cart.push(newCartItem);
    }
    yield user.save();
    res.status(HttpStatusCode_1.default.OK).json({ message: "Added to cart" });
}));
exports.postControllerRemoveProductFromCart = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { productId } = req.body;
    user.cart = user.cart.filter(item => item.product.toString() !== productId);
    yield user.save();
    res.status(HttpStatusCode_1.default.OK).json({ message: "Removed from cart" });
}));
exports.postControllerIncreaseProductQuantityInCart = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { productId } = req.body;
    const productToChangeIndex = user.cart.findIndex(item => item.product.toString() === productId);
    if (productToChangeIndex === -1)
        throw new AppError_1.AppError("NOT_FOUND", HttpStatusCode_1.default.RESET_CONTENT, true, "Product is not on your cart");
    user.cart[productToChangeIndex].quantity += 1;
    yield user.save();
    res.status(HttpStatusCode_1.default.OK).json({ message: "Quentity increased" });
}));
exports.postControllerDecreaseProductQuantityInCart = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { productId } = req.body;
    const productToChangeIndex = user.cart.findIndex(item => item.product.toString() === productId);
    if (productToChangeIndex === -1)
        throw new AppError_1.AppError("NOT_FOUND", HttpStatusCode_1.default.RESET_CONTENT, true, "Product is not on your cart");
    if (user.cart[productToChangeIndex].quantity === 1)
        return;
    user.cart[productToChangeIndex].quantity -= 1;
    yield user.save();
    res.status(HttpStatusCode_1.default.OK).json({ message: "Quantity decreased" });
}));
exports.postControllerEditPassword = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { password } = req.body;
    const doesPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (doesPasswordMatch)
        throw new AppError_1.AppError("PASSWORDS_MATCH", HttpStatusCode_1.default.BAD_REQUEST, true, "New password must be different from old password");
    const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
    user.password = hashedPassword;
    user.save();
    res
        .status(HttpStatusCode_1.default.OK)
        .json({ message: "Password updated successfully" });
}));
exports.postControllerEditProfile = (0, asyncWrapper_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { firstName, lastName } = req.body;
    const name = `${firstName} ${lastName}`;
    user.name = name;
    user.save();
    res.status(HttpStatusCode_1.default.OK).json({ message: "User information updated" });
}));
//# sourceMappingURL=user.js.map