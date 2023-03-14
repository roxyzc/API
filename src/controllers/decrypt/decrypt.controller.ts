import { type Request, type Response, type NextFunction } from "express";
import crypto from "crypto-js";

const decrypt = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { code } = req.body;
  try {
    const data = JSON.parse(crypto.AES.decrypt(code as string, process.env.SALT as string).toString(crypto.enc.Utf8));
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export { decrypt };
