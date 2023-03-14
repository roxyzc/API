"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_controller_1 = require("../../controllers/products/get.controller");
const post_controller_1 = require("../../controllers/products/post.controller");
const validateSchema_middleware_1 = require("../../middlewares/validateSchema.middleware");
const put_controller_1 = require("../../controllers/products/put.controller");
const delete_controller_1 = require("../../controllers/products/delete.controller");
const route = (0, express_1.Router)();
route.post("/product", (0, validateSchema_middleware_1.validateSchema)(validateSchema_middleware_1.schema.product.post), post_controller_1.postProduct);
route.get("/products", (0, validateSchema_middleware_1.validateSchema)(null, validateSchema_middleware_1.query.get), get_controller_1.getProducts);
route
    .route("/product/:id")
    .get(get_controller_1.getProduct)
    .put((0, validateSchema_middleware_1.validateSchema)(validateSchema_middleware_1.schema.product.update), put_controller_1.updateProduct)
    .delete(delete_controller_1.deleteProduct);
exports.default = route;
