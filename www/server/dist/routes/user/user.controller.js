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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.list = exports.update = exports.get = exports.load = void 0;
var user_model_1 = __importDefault(require("../../models/user.model"));
var data_form_1 = __importDefault(require("../../helpers/data-form"));
var api_error_1 = require("../../helpers/api-error");
/**
 * Load user and append to req.
 */
exports.load = function (req, res, next, id) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                // TODO: Fix _id not found in User
                // @ts-ignore
                if (id.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
                    throw new api_error_1.UnauthorizedError();
                }
                return [4 /*yield*/, user_model_1.default.get(id)];
            case 1:
                user = _b.sent();
                if (user) {
                    req.user = user;
                    return [2 /*return*/, next()];
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                // TODO: Fix possible error log.
                // Logger.error('UserCtrlLoadErr: ', err);
                return [2 /*return*/, next(err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Get user
 * @returns {User}
 */
exports.get = function (req, res) {
    return res.json(new data_form_1.default(req.user));
};
// /**
//  * Update existing user
//  * @property {string} req.body.data - The user.
//  * @property {string} req.body.data.socials - The users social list.
//  * @property {string} req.file - The file of post
//  * @returns {User}
//  */
exports.update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, bodyData, _i, _a, key, updatedUser, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = req.user;
                bodyData = req.body.data || undefined;
                if (!!!user) return [3 /*break*/, 4];
                // TODO: fix all props not showing correctly
                // TODO: Make a loop instead to go through every user property and match and update
                // TODO: Check this typing error of 'user[key]'
                for (_i = 0, _a = Object.keys(bodyData); _i < _a.length; _i++) {
                    key = _a[_i];
                    // @ts-ignore
                    user[key] = bodyData[key];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user.save()];
            case 2:
                updatedUser = _b.sent();
                res.json(new data_form_1.default(updatedUser));
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                return [2 /*return*/, next(err_2)];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
// TODO: Remove list call if not used
exports.list = function (req, res) {
    // Todo: Fix the list pagination
    // const { limit = 50, skip = 0 } = req.query;
    // User.list({ limit, skip })
    //   .then(users => res.json(users))
    //   .catch(e => next(e));
    // return res.send('hello');
};
/**
 * Delete user.
 * @returns {User}
 */
exports.remove = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, deletedUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.remove())];
            case 2:
                deletedUser = _a.sent();
                if (deletedUser) {
                    console.log('deletedUser', deletedUser);
                    res.json(new data_form_1.default({
                        id: deletedUser._id,
                        firstName: deletedUser.firstName,
                        lastName: deletedUser.lastName,
                        email: deletedUser.email
                    }));
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                console.log('err', err_3);
                return [2 /*return*/, next(new api_error_1.InternalServerError(err_3))];
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=user.controller.js.map