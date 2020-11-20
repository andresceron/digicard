"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("./config"));
var api_error_1 = require("../helpers/api-error");
exports.authenticate = function (req, res, next) {
    return passport_1.default.authenticate("jwt", {
        session: false
        // TODO: Replace all "any"
    }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(new api_error_1.UnauthorizedError());
        }
        if (info) {
            // TODO: What to do with this?
            console.log('!!AUTH INFOO!! ', info);
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.authenticateTokenUser = function (req, res, next) {
    return passport_1.default.authenticate("jwt", {
        session: false
    }, function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user || !user._id.equals(req.params.userId)) {
            return next(new api_error_1.UnauthorizedError());
        }
        if (info) {
            // TODO: What to do with this?
            console.log('!!AUTH INFOO!! ', info);
        }
        // Forward user information to the next middleware
        req.user = user;
        next();
    })(req, res, next);
};
exports.validateToken = function (req, res, next) {
    var authHeader = req.headers.authorization;
    var token = authHeader && authHeader.split(' ')[1] || '';
    jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret, function (err, user) {
        if (err) {
            return next(new api_error_1.UnauthorizedError());
        }
        req.user = user;
        next();
    });
};
//# sourceMappingURL=passport-authcheck.js.map