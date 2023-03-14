import { Router } from "express";
import { validateSchema, schema } from "middlewares/validateSchema.middleware";
import { decrypt } from "@controller/decrypt/decrypt.controller";

const route: Router = Router();

route.get("/decrypt", validateSchema(schema.decrypt), decrypt);

export default route;
