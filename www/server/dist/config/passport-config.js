"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateTokenUser = exports.authenticate = void 0;
var passport_1 = __importDefault(require("passport"));
var data_form_1 = require("../helpers/data-form");
exports.authenticate = function (req, res, next) {
    return passport_1.default.authenticate("jwt", {
        session: false
    }, function (err, user, info) {
        if (err) {
            console.log('!!AUTHENTICATION ERROR!! ', err);
            return next(err);
        }
        if (!user) {
            console.log('!!NO AUTH USER!! ', err);
            return res.status(401).json(new data_form_1.DataForm({
                code: '401',
                error: 'UNAUTHORIZED_USER'
            }));
        }
        if (info) {
            console.log('!!AUTH INFOO!! ', info);
        }
        // Forward user information to the next middleware
        req.user = user;
        next();
    })(req, res, next);
};
exports.authenticateTokenUser = function (req, res, next) {
    return passport_1.default.authenticate("jwt", {
        session: false
    }, function (err, user, info) {
        if (err) {
            console.log('!!AUTHENTICATION ERROR!! ', err);
            return next(err);
        }
        if (!user || !user._id.equals(req.params.userId)) {
            console.log('!!NO AUTH USER!! ', err);
            return res.status(401).json(new data_form_1.DataForm({
                code: '401',
                error: 'UNAUTHORIZED_USER'
            }));
        }
        if (info) {
            console.log('!!AUTH INFOO!! ', info);
        }
        // Forward user information to the next middleware
        req.user = user;
        next();
    })(req, res, next);
};
// export { authenticate, authenticateTokenUser };
//# sourceMappingURL=passport-config.js.map