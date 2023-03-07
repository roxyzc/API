"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const moment_1 = __importDefault(require("moment"));
const logger = (0, winston_1.createLogger)({
    transports: [new winston_1.transports.Console({})],
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.colorize(), winston_1.format.printf(({ timestamp, message, level }) => {
        return `[${(0, moment_1.default)(timestamp).format("MMMM Do YYYY, h:mm:ss")}] - ${level}: ${message}`;
    })),
});
exports.default = logger;
