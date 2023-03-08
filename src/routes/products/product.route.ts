import { Router } from "express";
import { getProduct, getProducts } from "@controller/products/get.controller";
import { postProduct } from "@controller/products/post.controller";
import { validateSchema, schema } from "middlewares/validateSchema.middleware";
import { updateProduct } from "@controller/products/put.controller";
import { deleteProduct } from "@controller/products/delete.controller";

const route: Router = Router();

route.post("/product", validateSchema(schema.product.post), postProduct);
route.get("/products", getProducts);
route
  .route("/product/:id")
  .get(getProduct)
  .put(validateSchema(schema.product.update), updateProduct)
  .delete(deleteProduct);

export default route;
