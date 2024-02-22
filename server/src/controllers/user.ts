import express from "express";
import { CartItemType, User, UserType } from "../models/user";
import bcrypt from "bcryptjs";
import generateJWT from "../utils/generateJWT";
import { ProductModel } from "../models/product";
import asyncWrapper from "../utils/asyncWrapper";
import { AppError } from "../AppError";
import HttpStatusCode from "../utils/HttpStatusCode";
import { HydratedDocument } from "mongoose";

export const postControllerSignup = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const { name, email, password } = req.body;

    /* Server-side validation */
    if (!name || !email || !password) {
      throw new AppError(
        "MISSING_FIELDS",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Please, provide all the fields"
      );
    }

    if (password.length < 6) {
      throw new AppError(
        "PASSWORD_TOO_SHORT",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Password should be at least 6 characters long"
      );
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError(
        "USER_EXISTS",
        HttpStatusCode.BAD_REQUEST,
        true,
        "User already exists!"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser: HydratedDocument<UserType> = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(HttpStatusCode.CREATED).json({ message: "Signed up" });
  }
);

export const postControllerSignin = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError(
        "MISSING_FIELDS",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Please enter all the fields!"
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(
        "INCORRECT_EMAIL",
        HttpStatusCode.BAD_REQUEST,
        true,
        "User with this email does not exist!"
      );
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
      throw new AppError(
        "INCORRECT_PASSWORD",
        HttpStatusCode.BAD_REQUEST,
        true,
        "Incorrect password!"
      );
    }

    /* Generate JWT here */
    generateJWT(res, user._id);
    res.status(HttpStatusCode.CREATED).json({
      message: "Singed in",
    });
  }
);

export const postControllerSignout = (
  req: express.Request,
  res: express.Response
) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(HttpStatusCode.OK).json({ message: "Signed out" });
};

export const postControllerFetchUser = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const user = req.user;
    await user.populate([
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

    res.status(HttpStatusCode.OK).json({ user });
  }
);

export const postControllerAddProductToCart = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const { productId } = req.body;
    const user = req.user;

    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new AppError(
        "PRODUCT_NOT_FOUND",
        HttpStatusCode.NOT_FOUND,
        true,
        "Product does not exist"
      );
    }

    const existingProductIndex = user.cart.findIndex((cartItem: any) => {
      return cartItem.product.toString() === productId;
    });

    if (existingProductIndex !== -1) {
      user.cart[existingProductIndex].quantity += 1;
    } else {
      const newCartItem: CartItemType = { product: productId, quantity: 1 };
      user.cart.push(newCartItem);
    }

    await user.save();
    res.status(HttpStatusCode.OK).json({ message: "Added to cart" });
  }
);

export const postControllerRemoveProductFromCart = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const user = req.user;
    const { productId } = req.body;

    user.cart = user.cart.filter(item => item.product.toString() !== productId);

    await user.save();
    res.status(HttpStatusCode.OK).json({ message: "Removed from cart" });
  }
);

export const postControllerIncreaseProductQuantityInCart = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const user = req.user;
    const { productId } = req.body;

    const productToChangeIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (productToChangeIndex === -1)
      throw new AppError(
        "NOT_FOUND",
        HttpStatusCode.RESET_CONTENT,
        true,
        "Product is not on your cart"
      );

    user.cart[productToChangeIndex].quantity += 1;
    await user.save();
    res.status(HttpStatusCode.OK).json({ message: "Quentity increased" });
  }
);

export const postControllerDecreaseProductQuantityInCart = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const user = req.user;
    const { productId } = req.body;

    const productToChangeIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (productToChangeIndex === -1)
      throw new AppError(
        "NOT_FOUND",
        HttpStatusCode.RESET_CONTENT,
        true,
        "Product is not on your cart"
      );

    if (user.cart[productToChangeIndex].quantity === 1) return;
    user.cart[productToChangeIndex].quantity -= 1;
    await user.save();
    res.status(HttpStatusCode.OK).json({ message: "Quantity decreased" });
  }
);

export const postControllerEditPassword = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const user = req.user;
    const { password } = req.body;

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (doesPasswordMatch)
      throw new AppError(
        "PASSWORDS_MATCH",
        HttpStatusCode.BAD_REQUEST,
        true,
        "New password must be different from old password"
      );

    const hashedPassword = await bcrypt.hash(password, 8);
    user.password = hashedPassword;
    user.save();

    res
      .status(HttpStatusCode.OK)
      .json({ message: "Password updated successfully" });
  }
);

export const postControllerEditProfile = asyncWrapper(
  async (req: express.Request, res: express.Response) => {
    const user = req.user;
    const { firstName, lastName } = req.body;

    const name = `${firstName} ${lastName}`;
    user.name = name;
    user.save();

    res.status(HttpStatusCode.OK).json({ message: "User information updated" });
  }
);
