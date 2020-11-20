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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var paramValidation = __importStar(require("../../config/param-validation"));
var passportAuth = __importStar(require("../../config/passport-authcheck"));
var userCtrl = __importStar(require("./user.controller"));
var router = express_1.Router();
router.route('/');
/** GET /api/users - Get list of users */
// .get(userCtrl.list)
router.route('/:userId')
    /** GET /api/users/:userId - Get user */
    .get(passportAuth.authenticateTokenUser, userCtrl.get)
    // TODO: This needs to refactor and move to own sub-route like /:userId/upload
    /** PUT /api/users/:userId - Update user */
    .put(passportAuth.authenticateTokenUser, paramValidation.updateUserValidation, userCtrl.update)
    /** PATCH /api/users/:userId - Update user contacts */
    // .patch(passportAuth.authenticateTokenUser, paramValidation.saveContactValidation, userCtrl.saveContact)
    /** DELETE /api/users/:userId - Delete user */
    // TODO: Need to test this
    .delete(passportAuth.authenticateTokenUser, userCtrl.remove);
/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);
exports.default = router;
//# sourceMappingURL=user.route.js.map