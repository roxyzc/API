import { type Request, type Response, type NextFunction } from "express";
import Product from "models/product.model";
import { Op } from "sequelize";

const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { namaProduct, harga, stok } = req.body;
  const { id } = req.params;
  try {
    const findProduct = await Product.findOne({
      where: {
        namaProduct,
        harga,
        [Op.not]: {
          idProduct: id,
        },
      },
    });

    const product = await Product.findOne({ where: { idProduct: id } })
      .then(async (data): Promise<any> => {
        if (data !== null) {
          await data?.update({
            namaProduct,
            harga,
            stok: Number(stok) + (Number(findProduct?.getDataValue("stok")) | 0),
          });
          await data?.reload();
        }
        return data;
      })
      .then(async (data) => {
        await findProduct?.destroy();
        return data;
      });

    if (product === null) return res.status(404).json({ success: false, error: { message: "product not found" } });
    return res.status(200).json({ success: true, data: { message: "success", product } });
  } catch (error) {
    next(error);
  }
};

export { updateProduct };
