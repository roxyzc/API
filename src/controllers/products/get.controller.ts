import { type Request, type Response, type NextFunction } from "express";
import Product from "models/product.model";
import { Op } from "sequelize";
import crypto from "crypto-js";

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { idProduct: id },
    });

    const data =
      product === null ? [] : crypto.AES.encrypt(JSON.stringify(product), process.env.SALT as string).toString();
    res.status(200).json({
      success: true,
      data: { product: data },
    });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const limit = Number.isNaN(Number(req.query.limit)) ? 10 : Number(req.query.limit);
  const page = Number.isNaN(Number(req.query.page)) ? 1 : Number(req.query.page);
  const search = req.query.search === undefined || req.query.search === "" ? "" : req.query.search;
  const start = (page - 1) * limit;
  const end = page * limit;

  try {
    const products = await Product.findAndCountAll({
      where: {
        namaProduct: { [Op.like]: `%${search as string}%` },
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

    const data =
      products.rows.length === 0
        ? products.rows
        : crypto.AES.encrypt(JSON.stringify(products.rows), process.env.SALT as string).toString();

    res.status(200).json({
      success: true,
      pagination,
      data: {
        products: data,
        // encrypt: JSON.parse(crypto.AES.decrypt(data as string, process.env.SALT as string).toString(crypto.enc.Utf8)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export { getProduct, getProducts };
