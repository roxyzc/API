"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateSchema_middleware_1 = require("../../middlewares/validateSchema.middleware");
const decrypt_controller_1 = require("../../controllers/decrypt/decrypt.controller");
const route = (0, express_1.Router)();
route.post("/decrypt", (0, validateSchema_middleware_1.validateSchema)(validateSchema_middleware_1.schema.decrypt), decrypt_controller_1.decrypt);
exports.default = route;
