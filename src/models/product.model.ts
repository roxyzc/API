import { Model, UUIDV4, DataTypes } from "sequelize";
import db from "../configs/database.config";

interface IProductModel {
  idProduct?: string;
  namaProduct: string;
  harga: number;
  createdAt?: number;
  updatedAt?: number;
}

class Product extends Model<IProductModel> {
  createdAt?: number;
  updatedAt?: number;
}

Product.init(
  {
    idProduct: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4(),
    },
    namaProduct: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: (product) => {
        const time = Number(new Date().getTime());
        product.createdAt = time;
        product.updatedAt = time;
      },
    },
    modelName: "product",
    sequelize: db,
    timestamps: false,
    freezeTableName: true,
  }
);

export default Product;
