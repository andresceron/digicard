"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.LOG_LEVELS = exports.LOCAL = void 0;
exports.LOCAL = 'local';
var LOG_LEVELS;
(function (LOG_LEVELS) {
    LOG_LEVELS["ERROR"] = "error";
    LOG_LEVELS["WARNING"] = "warn";
    LOG_LEVELS["INFO"] = "info";
    LOG_LEVELS["HTTP"] = "http";
    LOG_LEVELS["VERBOSE"] = "verbose";
    LOG_LEVELS["DEBUG"] = "debug";
})(LOG_LEVELS = exports.LOG_LEVELS || (exports.LOG_LEVELS = {}));
var NODE_ENV;
(function (NODE_ENV) {
    NODE_ENV["DEV"] = "dev";
    NODE_ENV["TEST"] = "test";
    NODE_ENV["PROD"] = "prod";
})(NODE_ENV = exports.NODE_ENV || (exports.NODE_ENV = {}));
//# sourceMappingURL=constants.js.map