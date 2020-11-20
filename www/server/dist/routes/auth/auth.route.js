"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var paramValidation = __importStar(require("../../config/param-validation"));
var authCtrl = __importStar(require("./auth.controller"));
var passportAuth = __importStar(require("../../config/passport-authcheck"));
var router = express_1.default.Router(); // eslint-disable-line new-cap
/**
 * POST /api/auth/login
 * Returns token if correct username and password is provided
 */
router.route('/login')
    .post(paramValidation.loginValidation, authCtrl.login);
/**
 * POST /api/auth/login
 * Returns token if correct username and password is provided
 */
router.route('/register')
    .post(paramValidation.registerValidation, authCtrl.register);
/** GET
 * /api/auth/me
 * Returns token if authToken is valid
 */
router.route('/me')
    .get(passportAuth.validateToken, authCtrl.me);
exports.default = router;
//# sourceMappingURL=auth.route.js.map