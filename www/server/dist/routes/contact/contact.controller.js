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
var api_error_1 = require("../../helpers/api-error");
var user_model_1 = __importDefault(require("../../models/user.model"));
var data_form_1 = __importDefault(require("../../helpers/data-form"));
/**
 * Load contact and append to req.
 */
exports.loadSingle = function (req, res, next, id) { return __awaiter(void 0, void 0, void 0, function () {
    var contact, customContact, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.get(id)];
            case 1:
                contact = _a.sent();
                if (contact) {
                    customContact = {
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        email: contact.email,
                        jobTitle: contact.jobTitle,
                        phonePrefix: contact.phonePrefix,
                        phoneNumber: contact.phoneNumber,
                        website: contact.website,
                        city: contact.city,
                        country: contact.country,
                        image: contact.image,
                        socials: contact.socials
                    };
                    // @ts-ignore
                    req.contact = contact;
                    next();
                }
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, next(err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
/**
 * Get contact single
 * @returns {Contact}
 */
exports.getSingle = function (req, res, next) {
    return res.json(
    // @ts-ignore
    new data_form_1.default(req.contact));
};
/**
 * Get contact single
 * @returns {Contacts[]}
 */
exports.getSearch = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var search, query, contactsReturnFilter, contactsResults, filterResults, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // Comparing IDS to match token id
                // @ts-ignore
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.equals(req.params.userId))) {
                    return [2 /*return*/, next(new api_error_1.UnauthorizedError())];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                search = new RegExp(req.query.name, 'i');
                query = {
                    $and: [
                        {
                            $or: [
                                { firstName: search },
                                { lastName: search },
                            ]
                        },
                    ]
                };
                contactsReturnFilter = { _id: 1, firstName: 1, lastName: 1, image: 1 };
                return [4 /*yield*/, user_model_1.default.find(query, contactsReturnFilter).exec()];
            case 2:
                contactsResults = _b.sent();
                filterResults = contactsResults.filter(function (r) { var _a; return (_a = req.user) === null || _a === void 0 ? void 0 : _a.contacts.includes(r._id); });
                res.json(new data_form_1.default(filterResults));
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                console.log('err!!! ', err_2);
                return [2 /*return*/, next(new api_error_1.BadRequestError(err_2))];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * SaveContact
 * @property {string} req.body.data - contactId.
 * @returns {User}
 */
// TODO: Fix 'contacts' and 'save' to show correct.
exports.save = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, contact, contactFound, updatedUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                contact = req.body.data;
                contactFound = user === null || user === void 0 ? void 0 : user.contacts.includes(contact);
                // @ts-ignore
                if (contactFound || (user === null || user === void 0 ? void 0 : user._id) === req.body.data) {
                    return [2 /*return*/, next(new api_error_1.ConflictError('Contact is already in your list'))];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                // @ts-ignore
                user === null || user === void 0 ? void 0 : user.contacts.push(contact);
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.save())];
            case 2:
                updatedUser = _a.sent();
                if (updatedUser) {
                    res.json(new data_form_1.default(updatedUser));
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, next(new api_error_1.InternalServerError())];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Remove existing contact
 * @property {string} req.body.data - The contacts list.
 * @returns {void}
 */
exports.remove = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var updateContact, err_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, { $pullAll: { contacts: [req.params.contactId] } })];
            case 1:
                updateContact = _b.sent();
                if (!updateContact) {
                    throw new api_error_1.BadRequestError();
                }
                console.log('updateContact: ', updateContact);
                res.json(new data_form_1.default(updateContact));
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                return [2 /*return*/, next(new api_error_1.BadRequestError())];
            case 3: return [2 /*return*/];
        }
    });
}); };
// /**
//  * Update existing user
//  * @property {string} req.body.data - The contacts list.
//  * @returns {void}
//  */
// export const update = async(req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log('INSIDE HERE!!');
//     const updateContact = await User.findByIdAndUpdate(id, postData, { new: true });
//     if (!updateContact) {
//       res.status(400).json(
//         new DataForm({
//           code: 400,
//           message: `Unexpected Error: ${updateContect}`
//         })
//       )
//     }
//     res.json(new DataForm(updateContact))
//   } catch (err) {
//     res.status(400).json(
//       new DataForm({
//         code: 400,
//         message: `Unexpected Error: ${err}`
//       })
//     )
//   }
//   user.firstName = req.body.data.firstName;
//   user.save()
//     .then(savedUser => res.json(new DataForm(savedUser)))
//     .catch(e => next(e));
// }
// module.exports = { loadSingle, loadPublicUser, getSingle, getSearch, update, remove };
//# sourceMappingURL=contact.controller.js.map