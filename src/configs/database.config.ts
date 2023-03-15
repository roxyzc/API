import { Sequelize, type Dialect } from "sequelize";
// import createDatabaseIfNotExists from "services/database.service";

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = (process.env.DB_PASSWORD as string) ?? "";
const dbHost = process.env.DB_HOST as string;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPort = Number(process.env.DB_PORT);

// void createDatabaseIfNotExists(dbHost, dbUser, dbPassword, dbName, dbPort);

const connectToDatabase = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
  port: dbPort,
});

export default connectToDatabase;
