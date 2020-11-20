"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
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