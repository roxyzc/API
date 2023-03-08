import { type Request, type Response, type NextFunction } from "express";
import Product from "models/product.model";

const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { idProduct: id } }).then(async (data) => {
      if (data !== null) {
        await data?.destroy();
      }
      return data;
    });
    if (product === null) return res.status(404).json({ success: false, error: { message: "product not found" } });
    res.status(200).json({ success: true, data: { message: "success", product } });
  } catch (error) {
    next(error);
  }
};

export { deleteProduct };
