"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const logger_log_1 = __importDefault(require("./logs/logger.log"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const database_config_1 = __importDefault(require("./configs/database.config"));
const app = (0, express_1.default)();
const port = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 3000;
database_config_1.default
    .sync()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    return logger_log_1.default.info("connection to database successfully");
}))
    .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
    logger_log_1.default.error(error.message);
    process.exit(1);
}));
if (process.env.NODE_ENV === "production")
    app.set("trust proxy", 1);
if (process.env.NODE_ENV === "development")
    app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
(0, routes_1.default)(app);
app.listen(port, () => {
    logger_log_1.default.info(`Server is listening on port ${port}`);
});
