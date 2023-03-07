import { Router } from "express";
import { getProduct, getProducts } from "@controller/products/get.controller";
import { postProduct } from "@controller/products/post.controller";
import { validateSchema, schema } from "middlewares/validateSchema.middleware";

const route: Router = Router();

route.post("/product", validateSchema(schema.product.post), postProduct);
route.get("/products", getProducts);
route.get("/product/:id", getProduct);

export default route;
