"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notfound = void 0;
const http_errors_1 = require("http-errors");
const logger_log_1 = __importDefault(require("../logs/logger.log"));
const notfound = (_req, _res, next) => {
    next(new http_errors_1.NotFound());
};
exports.notfound = notfound;
const errorHandler = (error, _req, res, _next) => {
    var _a, _b;
    logger_log_1.default.error(error.message);
    res.status((_a = error.status) !== null && _a !== void 0 ? _a : 500).json({
        success: false,
        status: (_b = error.status) !== null && _b !== void 0 ? _b : 500,
        error: {
            message: error.message,
        },
    });
};
exports.errorHandler = errorHandler;
