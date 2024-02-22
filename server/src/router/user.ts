import express from "express";
import { protect } from "../middleware/protect";
import { endpoints } from "../constants/endpoints";

import {
  postControllerSignup,
  postControllerSignin,
  postControllerSignout,
  postControllerFetchUser,
  postControllerAddProductToCart,
  postControllerRemoveProductFromCart,
  postControllerIncreaseProductQuantityInCart,
  postControllerDecreaseProductQuantityInCart,
  postControllerEditPassword,
  postControllerEditProfile,
} from "../controllers/user";

export default (router: express.Router) => {
  /* Fetch and auth */
  router.post(endpoints.user.fetch, protect, postControllerFetchUser);
  router.post(endpoints.user.signup, postControllerSignup);
  router.post(endpoints.user.signin, postControllerSignin);
  router.post(endpoints.user.signout, postControllerSignout);

  /* Cart */
  router.post(
    endpoints.user.profile.cart.add,
    protect,
    postControllerAddProductToCart
  );
  router.post(
    endpoints.user.profile.cart.remove,
    protect,
    postControllerRemoveProductFromCart
  );
  router.post(
    endpoints.user.profile.cart.increaseQuantity,
    protect,
    postControllerIncreaseProductQuantityInCart
  );
  router.post(
    endpoints.user.profile.cart.decreaseQuantity,
    protect,
    postControllerDecreaseProductQuantityInCart
  );

  /* Edit */
  router.post(
    endpoints.user.profile.edit.password,
    protect,
    postControllerEditPassword
  );
  router.post(
    endpoints.user.profile.edit.info,
    protect,
    postControllerEditProfile
  );
};
