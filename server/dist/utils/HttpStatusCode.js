"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
    HttpStatusCode[HttpStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatusCode[HttpStatusCode["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    HttpStatusCode[HttpStatusCode["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    HttpStatusCode[HttpStatusCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCode[HttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpStatusCode || (HttpStatusCode = {}));
exports.default = HttpStatusCode;
//# sourceMappingURL=HttpStatusCode.js.map