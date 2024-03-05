"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collections_1 = __importDefault(require("./collections"));
const shop_1 = __importDefault(require("./shop"));
const search_1 = __importDefault(require("./search"));
const user_1 = __importDefault(require("./user"));
const stripe_1 = __importDefault(require("./stripe"));
const router = express_1.default.Router();
exports.default = () => {
    (0, user_1.default)(router);
    (0, collections_1.default)(router);
    (0, shop_1.default)(router);
    (0, search_1.default)(router);
    (0, stripe_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map