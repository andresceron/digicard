"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var util_1 = __importDefault(require("util"));
var config_1 = __importDefault(require("./config"));
var debug = require('debug')('express-mongoose-es6-rest-api:index');
// make bluebird default Promise
var bluebird_1 = __importDefault(require("bluebird")); // eslint-disable-line no-global-assign
var logger_1 = __importDefault(require("../loaders/logger"));
var constants_1 = require("../constants/constants");
exports.default = (function () {
    // plugin bluebird promise in mongoose
    mongoose_1.default.Promise = bluebird_1.default;
    // connect to mongo db
    mongoose_1.default.connect(config_1.default.mongo.host, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        keepAlive: true
    }, function () {
        logger_1.default.info("\u26A1\uFE0F[db] Connected to mongo database \u26A1\uFE0F");
    });
    mongoose_1.default.connection.on('error', function () {
        logger_1.default.error("unable to connect to database: " + config_1.default.mongo.host);
        throw new Error("unable to connect to database: " + config_1.default.mongo.host);
    });
    // print mongoose logs in dev env
    if (config_1.default.mongooseDebug) {
        mongoose_1.default.set(constants_1.LOG_LEVELS.DEBUG, function (collectionName, method, query, doc) {
            debug(collectionName + "." + method, util_1.default.inspect(query, false, 20), doc);
        });
    }
});
//# sourceMappingURL=mongoose.js.map