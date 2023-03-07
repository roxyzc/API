import { Sequelize, type Dialect } from "sequelize";
import createDatabaseIfNotExists from "services/database.service";

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = (process.env.DB_PASSWORD as string) ?? "";
const dbHost = process.env.DB_HOST as string;
const dbDriver = process.env.DB_DRIVER as Dialect;

void createDatabaseIfNotExists(dbHost, dbUser, dbPassword, dbName);

const connectToDatabase = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
});

export default connectToDatabase;
