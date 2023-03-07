import { type Request, type Response, type NextFunction } from "express";
import Product from "models/product.model";
import { Op } from "sequelize";

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { idProduct: id },
    });
    res.status(200).json({ success: true, data: { product } });
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
    res.status(200).json({ success: true, pagination, data: { products } });
  } catch (error) {
    next(error);
  }
};

export { getProduct, getProducts };
