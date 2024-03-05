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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./router"));
const error_handler_1 = require("./middleware/error-handler");
const endpoints_1 = require("./constants/endpoints");
require("dotenv").config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(endpoints_1.endpoints.stripe.webhook, body_parser_1.default.raw({ type: "application/json" }));
app.use(body_parser_1.default.json());
const port = process.env.PORT || 8080;
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server running on ${process.env.SERVER_URL}`);
});
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(process.env.MONGO_URI);
mongoose_1.default.connection.on("error", (error) => console.error(error));
app.use("/", (0, router_1.default)());
app.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, error_handler_1.isTrustedError)(err)) {
        next(err);
    }
    /* At this point, error is operational and is an instance of AppError */
    (0, error_handler_1.errorHandler)(err, res);
}));
process.on("unhandledRejection", (reason, promise) => {
    throw reason;
});
process.on("uncaughtException", (error) => {
    (0, error_handler_1.errorHandler)(error);
    if (!(0, error_handler_1.isTrustedError)(error)) {
        process.exit(1);
    }
});
module.exports = app;
//# sourceMappingURL=index.js.map