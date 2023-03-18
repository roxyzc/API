import { type Request, type Response, type NextFunction } from "express";
import joi, { type ObjectSchema } from "joi";

const validateSchema = (schema: ObjectSchema | null, query?: ObjectSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema?.validateAsync(req.body);
      if (query !== null) {
        await query?.validateAsync(req.query);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const schema = {
  product: {
    post: joi.object({
      namaProduct: joi
        .string()
        .required()
        .trim()
        .min(1)
        .max(30)
        .regex(/^[\w\s]+$/)
        .label("Nama Product"),
      harga: joi.number().integer().min(0).strict().required().label("Harga"),
      stok: joi.number().integer().min(1).strict().label("Stok").required(),
    }),
    update: joi.object({
      namaProduct: joi
        .string()
        .trim()
        .min(1)
        .max(30)
        .regex(/^[\w\s]+$/)
        .label("Nama Product"),
      harga: joi.number().integer().min(0).strict().label("Harga"),
      stok: joi.number().integer().min(0).strict().label("Stok"),
    }),
  },
  decrypt: joi.object({
    code: joi.string().required().label("Code"),
  }),
};

const query = {
  get: joi.object({
    page: joi.number().integer().min(1).label("Page"),
    limit: joi.number().integer().min(1).max(10).label("Limit"),
    search: joi.string().label("Search"),
  }),
};

export { validateSchema, schema, query };
