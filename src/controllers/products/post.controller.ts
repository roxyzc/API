import { type Request, type Response, type NextFunction } from "express";
import Product from "models/product.model";

const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { namaProduct, harga, stok } = req.body;
  try {
    const findProduct = await Product.findOne({
      where: {
        namaProduct,
        harga,
      },
    }).then(async (value) => {
      if (value === null) {
        const product = await Product.create({
          namaProduct,
          harga,
          stok,
          image: "https://cdn.discordapp.com/attachments/755224936414445629/1085156061255831582/no-image-icon-10.png",
        });
        return product;
      }
      await value.update({
        stok: value.getDataValue("stok") + Number(stok),
      });
      await value.reload();
      return value;
    });

    res.status(200).json({ success: true, data: { Product: findProduct } });
  } catch (error) {
    next(error);
  }
};

export { postProduct };
