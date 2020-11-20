"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("@hapi/joi"));
var api_error_1 = require("../helpers/api-error");
exports.loginValidation = function (req, res, next) {
    var joiLoginSchema = joi_1.default.object().keys({
        data: {
            email: joi_1.default.string().required(),
            password: joi_1.default.string().required()
        }
    });
    var error = joiLoginSchema.validate(req.body).error;
    if (error) {
        return next(new api_error_1.NotFoundError('Missing content to send'));
    }
    next();
};
exports.registerValidation = function (req, res, next) {
    var joiSchema = joi_1.default.object().keys({
        data: {
            firstName: joi_1.default.string().required(),
            lastName: joi_1.default.string().required(),
            email: joi_1.default.string().required(),
            password: joi_1.default.string().required(),
        }
    });
    var error = joiSchema.validate(req.body).error;
    if (error) {
        return next(new api_error_1.NotFoundError('Missing content to send'));
    }
    next();
};
/** PUT /api/users/:userId - Update user */
exports.updateUserValidation = function (req, res, next) {
    var joiSchema = joi_1.default.object().keys({
        data: joi_1.default.any().required()
    });
    var error = joiSchema.validate(req.body).error;
    if (error) {
        return next(new api_error_1.NotFoundError('Missing content to send'));
    }
    next();
};
/** PATCH /api/users/:userId - Update user contacts */
exports.saveContactValidation = function (req, res, next) {
    var joiSchema = joi_1.default.object().keys({
        data: joi_1.default.any().required()
    });
    var error = joiSchema.validate(req.body).error;
    if (error) {
        return next(new api_error_1.NotFoundError('Missing content to send'));
    }
    next();
};
/** POST /api/upload - Upload image*/
exports.uploadProfilePicValidation = function (req, res, next) {
    var joiSchema = joi_1.default.object().keys({
        data: {
            file: joi_1.default.any().required()
        }
    });
    var error = joiSchema.validate(req.body).error;
    if (error) {
        return next(new api_error_1.NotFoundError('Missing content to send'));
    }
    next();
};
//# sourceMappingURL=param-validation.js.map