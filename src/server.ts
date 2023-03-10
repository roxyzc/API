import "dotenv/config";
import express, { type Application } from "express";
import routes from "./routes";
import logger from "./logs/logger.log";
import cors from "cors";
import morgan from "morgan";
import connectToDatabase from "configs/database.config";

const app: Application = express();
const port: number = Number(process.env.PORT) ?? 3000;

connectToDatabase
  .sync()
  .then(async () => {
    return logger.info("connection to database successfully");
  })
  .catch(async (error) => {
    logger.error(error.message);
    process.exit(1);
  });

if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

routes(app);
const server = app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});

export default server;
