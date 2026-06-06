"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.envValidationSchema = joi_1.default.object({
    NODE_ENV: joi_1.default.string()
        .valid('development', 'test', 'production')
        .default('development'),
    PORT: joi_1.default.number().port().default(3000),
    DATABASE_URL: joi_1.default.string().required(),
    CORS_ORIGIN: joi_1.default.string().default('http://localhost:3000'),
    LOG_LEVEL: joi_1.default.string()
        .valid('fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent')
        .default('info'),
});
//# sourceMappingURL=env.validation.js.map