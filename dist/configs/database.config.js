"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = (_a = process.env.DB_PASSWORD) !== null && _a !== void 0 ? _a : "";
const dbHost = process.env.DB_HOST;
const dbDriver = process.env.DB_DRIVER;
const dbPort = Number(process.env.DB_PORT);
const connectToDatabase = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: false,
    port: dbPort,
});
exports.default = connectToDatabase;
