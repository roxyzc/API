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
exports.getProducts = exports.getProduct = void 0;
const product_model_1 = __importDefault(require("../../models/product.model"));
const sequelize_1 = require("sequelize");
const crypto_js_1 = __importDefault(require("crypto-js"));
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_model_1.default.findOne({
            where: { idProduct: id },
        });
        res.status(200).json({
            success: true,
            data: { product: crypto_js_1.default.AES.encrypt(JSON.stringify(product), process.env.SALT).toString() },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProduct = getProduct;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = Number.isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit);
    const page = Number.isNaN(Number(req.query.page)) ? 1 : Number(req.query.page);
    const search = req.query.search === undefined || req.query.search === "" ? "" : req.query.search;
    const start = (page - 1) * limit;
    const end = page * limit;
    try {
        const products = yield product_model_1.default.findAndCountAll({
            where: {
                namaProduct: { [sequelize_1.Op.like]: `%${search}%` },
            },
            order: [["updatedAt", "ASC"]],
            limit,
            offset: start,
        });
        const count = products.count;
        const pagination = {};
        Object.assign(pagination, { totalRow: count, totalPage: Math.ceil(count / limit) });
        if (end < count) {
            Object.assign(pagination, { next: { page: page + 1, limit, remaining: count - (start + limit) } });
        }
        if (start > 0) {
            Object.assign(pagination, { prev: { page: page - 1, limit, ramaining: count - (count - start) } });
        }
        if (page > Math.ceil(count / limit)) {
            Object.assign(pagination, { prev: { remaining: count } });
        }
        const data = products.rows.length === 0
            ? products.rows
            : crypto_js_1.default.AES.encrypt(JSON.stringify(products.rows), process.env.SALT).toString();
        res.status(200).json({
            success: true,
            pagination,
            data: { products: data },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getProducts = getProducts;
