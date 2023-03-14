import { type Request, type Response, type NextFunction } from "express";
import Product from "models/product.model";

const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { namaProduct, harga, stok } = req.body;
  console.log(namaProduct, harga);
  try {
    const findProduct = await Product.create({
      namaProduct,
      harga,
      stok,
      image: "https://cdn.discordapp.com/attachments/755224936414445629/1085156061255831582/no-image-icon-10.png",
    });
    res.status(200).json({ success: true, data: { Product: findProduct } });
  } catch (error) {
    next(error);
  }
};

export { postProduct };
