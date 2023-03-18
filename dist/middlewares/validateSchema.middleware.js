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
exports.query = exports.schema = exports.validateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const validateSchema = (schema, query) => {
    return (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (schema === null || schema === void 0 ? void 0 : schema.validateAsync(req.body));
            if (query !== null) {
                yield (query === null || query === void 0 ? void 0 : query.validateAsync(req.query));
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.validateSchema = validateSchema;
const schema = {
    product: {
        post: joi_1.default.object({
            namaProduct: joi_1.default
                .string()
                .required()
                .trim()
                .min(1)
                .max(30)
                .regex(/^[\w\s]+$/)
                .label("Nama Product"),
            harga: joi_1.default.number().integer().min(0).strict().required().label("Harga"),
            stok: joi_1.default.number().integer().min(1).strict().label("Stok").required(),
        }),
        update: joi_1.default.object({
            namaProduct: joi_1.default
                .string()
                .trim()
                .min(1)
                .max(30)
                .regex(/^[\w\s]+$/)
                .label("Nama Product"),
            harga: joi_1.default.number().integer().min(0).strict().label("Harga"),
            stok: joi_1.default.number().integer().min(0).strict().label("Stok"),
        }),
    },
    decrypt: joi_1.default.object({
        code: joi_1.default.string().required().label("Code"),
    }),
};
exports.schema = schema;
const query = {
    get: joi_1.default.object({
        page: joi_1.default.number().integer().min(1).label("Page"),
        limit: joi_1.default.number().integer().min(1).max(10).label("Limit"),
        search: joi_1.default.string().label("Search"),
    }),
};
exports.query = query;
