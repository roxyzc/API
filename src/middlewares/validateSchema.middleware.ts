import { type Request, type Response, type NextFunction } from "express";
import joi, { type ObjectSchema } from "joi";

const validateSchema = (schema: ObjectSchema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
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
    }),
  },
};

export { validateSchema, schema };
