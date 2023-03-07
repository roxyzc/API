"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../configs/database.config"));
class Product extends sequelize_1.Model {
}
Product.init({
    idProduct: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: (0, sequelize_1.UUIDV4)(),
    },
    namaProduct: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    harga: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
}, {
    hooks: {
        beforeCreate: (product) => {
            const time = Number(new Date().getTime());
            product.createdAt = time;
            product.updatedAt = time;
        },
    },
    modelName: "product",
    sequelize: database_config_1.default,
    timestamps: false,
    freezeTableName: true,
});
exports.default = Product;
