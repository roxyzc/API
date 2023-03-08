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
exports.deleteProduct = void 0;
const product_model_1 = __importDefault(require("../../models/product.model"));
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_model_1.default.findOne({ where: { idProduct: id } }).then((data) => __awaiter(void 0, void 0, void 0, function* () {
            if (data !== null) {
                yield (data === null || data === void 0 ? void 0 : data.destroy());
            }
            return data;
        }));
        if (product === null)
            return res.status(404).json({ success: false, error: { message: "product not found" } });
        res.status(200).json({ success: true, data: { message: "success", product } });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProduct = deleteProduct;
