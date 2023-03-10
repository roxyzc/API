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
exports.postProduct = void 0;
const product_model_1 = __importDefault(require("../../models/product.model"));
const postProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { namaProduct, harga } = req.body;
    console.log(namaProduct, harga);
    try {
        const findProduct = yield product_model_1.default.create({
            namaProduct,
            harga,
        });
        res.status(200).json({ success: true, data: { Product: findProduct } });
    }
    catch (error) {
        next(error);
    }
});
exports.postProduct = postProduct;
