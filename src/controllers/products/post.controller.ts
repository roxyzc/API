import { type Request, type Response, type NextFunction } from "express";
import Product from "models/product.model";

const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { namaProduct, harga } = req.body;
  console.log(namaProduct, harga);
  try {
    const findProduct = await Product.create({
      namaProduct,
      harga,
    });
    res.status(200).json({ success: true, data: { Product: findProduct } });
  } catch (error) {
    next(error);
  }
};

export { postProduct };
