import express, { type Application } from "express";
import cors from "cors";
import routes from "routes";

const createServer = () => {
  const app: Application = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  routes(app);
  return app;
};

export default createServer;
