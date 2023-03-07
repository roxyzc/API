import { type Application, type Router } from "express";
import { notfound, errorHandler } from "../middlewares/errorHandler.middleware";
import routeProduct from "./products/product.route";

const _routes: Array<[string, Router]> = [["", routeProduct]];

const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(`/api${url}`, router);
  });
  app.use(notfound);
  app.use(errorHandler);
};

export default routes;
