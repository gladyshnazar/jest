"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shop_1 = require("../controllers/shop");
const endpoints_1 = require("../constants/endpoints");
exports.default = (router) => {
    router.get(endpoints_1.endpoints.shop.all, shop_1.getControllerAllProducts);
    router.get(endpoints_1.endpoints.shop.featured, shop_1.getControllerFeaturedProducts);
    router.get(endpoints_1.endpoints.shop.discounted, shop_1.getControllerDiscountedProducts);
    router.get(endpoints_1.endpoints.shop.category(":slug"), shop_1.getControllerProductsByCategorySlug);
    router.get(endpoints_1.endpoints.shop.product(":slug"), shop_1.getControllerProductBySlug);
};
//# sourceMappingURL=shop.js.map