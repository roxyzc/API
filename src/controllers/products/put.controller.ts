import { type Request, type Response, type NextFunction } from "express";
import Product from "models/product.model";

const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { namaProduct, harga } = req.body;
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { idProduct: id } }).then(async (data): Promise<any> => {
      if (data !== null) {
        await data?.update({ namaProduct, harga });
        await data?.reload();
      }
      return data;
    });
    if (product === null) return res.status(404).json({ success: false, error: { message: "product not found" } });
    return res.status(200).json({ success: true, data: { message: "success", product } });
  } catch (error) {
    next(error);
  }
};

export { updateProduct };
