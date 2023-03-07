import { type Request, type Response, type NextFunction, type ErrorRequestHandler } from "express";
import { NotFound } from "http-errors";
import logger from "../logs/logger.log";

const notfound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFound());
};

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  logger.error(error.message);
  res.status(error.status ?? 500).json({
    success: false,
    status: error.status ?? 500,
    error: {
      message: error.message,
    },
  });
};

export { notfound, errorHandler };
