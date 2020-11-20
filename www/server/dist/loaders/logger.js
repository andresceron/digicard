"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var config_1 = __importDefault(require("../config/config"));
var errorStackTracerFormat = winston_1.default.format(function (info) {
    if (info.meta && info.meta instanceof Error) {
        info.message = info.message + " " + info.meta.stack;
    }
    return info;
});
var format = {
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.default.format.prettyPrint({
        colorize: true
    }), winston_1.default.format.splat(), errorStackTracerFormat()),
    stderrLevels: ['error']
};
var Logger = winston_1.default.createLogger({
    level: config_1.default.logs.level,
    levels: winston_1.default.config.npm.levels,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    })),
    transports: [new winston_1.default.transports.Console(format)],
    exceptionHandlers: [new winston_1.default.transports.Console(format)]
});
Logger.exitOnError = false;
exports.default = Logger;
//# sourceMappingURL=logger.js.map