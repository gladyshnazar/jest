"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const search_1 = require("../controllers/search");
const endpoints_1 = require("../constants/endpoints");
exports.default = (router) => {
    router.get(endpoints_1.endpoints.search(":query"), search_1.getControllerProductsByQuery);
};
//# sourceMappingURL=search.js.map