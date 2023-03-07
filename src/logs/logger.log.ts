import { createLogger, format, transports } from "winston";
import moment from "moment";

const logger = createLogger({
  transports: [new transports.Console({})],
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.printf(({ timestamp, message, level }) => {
      return `[${moment(timestamp).format("MMMM Do YYYY, h:mm:ss")}] - ${level}: ${message as string}`;
    })
  ),
});

export default logger;
