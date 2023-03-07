"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_service_1 = __importDefault(require("../services/database.service"));
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = (_a = process.env.DB_PASSWORD) !== null && _a !== void 0 ? _a : "";
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER;
void (0, database_service_1.default)(dbHost, dbUser, dbPassword, dbName);
const connectToDatabase = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: false,
});
exports.default = connectToDatabase;
