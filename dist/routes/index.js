"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_middleware_1 = require("../middlewares/errorHandler.middleware");
const product_route_1 = __importDefault(require("./products/product.route"));
const _routes = [["", product_route_1.default]];
const routes = (app) => {
    _routes.forEach((route) => {
        const [url, router] = route;
        app.use(`/api${url}`, router);
    });
    app.use(errorHandler_middleware_1.notfound);
    app.use(errorHandler_middleware_1.errorHandler);
};
exports.default = routes;
