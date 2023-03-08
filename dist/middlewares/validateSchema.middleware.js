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
exports.schema = exports.validateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const validateSchema = (schema) => {
    return (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body);
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
        }),
    },
};
exports.schema = schema;
