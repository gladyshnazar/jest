"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protect_1 = require("../middleware/protect");
const endpoints_1 = require("../constants/endpoints");
const user_1 = require("../controllers/user");
exports.default = (router) => {
    /* Fetch and auth */
    router.post(endpoints_1.endpoints.user.fetch, protect_1.protect, user_1.postControllerFetchUser);
    router.post(endpoints_1.endpoints.user.signup, user_1.postControllerSignup);
    router.post(endpoints_1.endpoints.user.signin, user_1.postControllerSignin);
    router.post(endpoints_1.endpoints.user.signout, user_1.postControllerSignout);
    /* Cart */
    router.post(endpoints_1.endpoints.user.profile.cart.add, protect_1.protect, user_1.postControllerAddProductToCart);
    router.post(endpoints_1.endpoints.user.profile.cart.remove, protect_1.protect, user_1.postControllerRemoveProductFromCart);
    router.post(endpoints_1.endpoints.user.profile.cart.increaseQuantity, protect_1.protect, user_1.postControllerIncreaseProductQuantityInCart);
    router.post(endpoints_1.endpoints.user.profile.cart.decreaseQuantity, protect_1.protect, user_1.postControllerDecreaseProductQuantityInCart);
    /* Edit */
    router.post(endpoints_1.endpoints.user.profile.edit.password, protect_1.protect, user_1.postControllerEditPassword);
    router.post(endpoints_1.endpoints.user.profile.edit.info, protect_1.protect, user_1.postControllerEditProfile);
};
//# sourceMappingURL=user.js.map