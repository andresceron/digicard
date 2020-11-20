"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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