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
var passportAuth = __importStar(require("../../config/passport-authcheck"));
var contactCtrl = __importStar(require("./contact.controller"));
var router = express_1.Router(); // eslint-disable-line new-cap
router.route('/:userId/search')
    /** GET /api/contacts/:userId/search?name={string} - Get contacts */
    .get(passportAuth.authenticateTokenUser, contactCtrl.getSearch);
// TODO: improve this
router.route('/:contactId/save')
    /** GET /api/contacts/:contactId/delete - Delete contact */
    .patch(passportAuth.authenticate, contactCtrl.save);
// TODO: improve this
router.route('/:contactId/delete')
    /** GET /api/contacts/:contactId/delete - Delete contact */
    .delete(passportAuth.authenticate, contactCtrl.remove);
router.route('/:contactId/detail')
    /** GET /api/contacts/:contactId/detail - Get Contact Detail */
    .get(contactCtrl.getSingle);
/** PATCH /api/contacts/:userId - Update user */
// .patch(passportAuth.authenticateTokenUser, contactCtrl.update)
/** Load post when API with contactId or UserId route parameter is hit */
// router.param('userId', contactCtrl.loadUser);
router.param('contactId', contactCtrl.loadSingle);
exports.default = router;
//# sourceMappingURL=contact.route.js.map