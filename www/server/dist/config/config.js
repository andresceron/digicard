"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
var dotenv_1 = __importDefault(require("dotenv"));
var constants_1 = require("../constants/constants");
var envFound = dotenv_1.default.config();
if (process.env.ENV === constants_1.LOCAL && envFound.error) {
    throw new Error("Could not find .env file");
}
var envVarsSchema = joi_1.default.object({
    LOG_LEVEL: joi_1.default.string().valid(constants_1.LOG_LEVELS.ERROR, constants_1.LOG_LEVELS.WARNING, constants_1.LOG_LEVELS.INFO, constants_1.LOG_LEVELS.HTTP, constants_1.LOG_LEVELS.VERBOSE, constants_1.LOG_LEVELS.DEBUG).default(constants_1.LOG_LEVELS.INFO),
    NODE_ENV: joi_1.default.string().valid(constants_1.NODE_ENV.DEV, constants_1.NODE_ENV.TEST, constants_1.NODE_ENV.PROD).default(constants_1.NODE_ENV.DEV),
    PORT: joi_1.default.number().default(3000),
    MONGOOSE_DEBUG: joi_1.default.boolean().when('NODE_ENV', {
        is: joi_1.default.string().equal(constants_1.NODE_ENV.DEV),
        then: joi_1.default.boolean().default(true),
        otherwise: joi_1.default.boolean().default(false),
    }),
    JWT_SECRET: joi_1.default.string().required().description('JWT Secret required to sign'),
    MONGO_HOST: joi_1.default.string().required().description('Mongo DB host url'),
    MONGO_PORT: joi_1.default.number().default(27017),
    AWS_ID: joi_1.default.string(),
    AWS_SECRET: joi_1.default.string(),
    AWS_REGION: joi_1.default.string(),
    AWS_BUCKET_NAME: joi_1.default.string() //.default('angularnode2')
}).unknown().required();
var _a = envVarsSchema.validate(process.env), error = _a.error, envVars = _a.value;
if (error) {
    throw new Error("Config validation error: " + error.message);
}
var config = {
    logs: {
        level: envVars.LOG_LEVEL
    },
    env: envVars.NODE_ENV,
    port: Number(envVars.PORT) || 80,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    jwtSecret: envVars.JWT_SECRET,
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT
    },
    aws: {
        id: envVars.AWS_ID,
        secret: envVars.AWS_SECRET,
        region: envVars.AWS_REGION,
        bucket_name: envVars.AWS_BUCKET_NAME
    }
};
exports.default = config;
//# sourceMappingURL=config.js.map