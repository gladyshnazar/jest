"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("../controllers/collections");
const endpoints_1 = require("../constants/endpoints");
exports.default = (router) => {
    router.get(endpoints_1.endpoints.collections, collections_1.getControllerCollections);
};
//# sourceMappingURL=collections.js.map