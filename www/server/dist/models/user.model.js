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
// import Promise from 'bluebird';
var mongoose_1 = require("mongoose");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var config_1 = __importDefault(require("../config/config"));
/**
 * User Schema
 */
var userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    website: {
        type: String,
        required: false
    },
    jobTitle: {
        type: String,
        required: false
    },
    phonePrefix: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false,
        match: [/^[1-9][0-9]{5,15}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.'],
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    socials: {
        type: Array,
        required: false,
        default: [
            { id: 'behance', baseUrl: 'https://www.behance.net/$$socialid$$', value: undefined },
            { id: 'facebook', baseUrl: 'https://www.facebook.com/$$socialid$$', value: undefined },
            { id: 'github', baseUrl: 'https://www.github.com/$$socialid$$', value: undefined },
            { id: 'instagram', baseUrl: 'https://www.instagram.com/$$socialid$$', value: undefined },
            { id: 'linkedin', baseUrl: 'https://www.linkedin.com/in/$$socialid$$', value: undefined },
            { id: 'pinterest', baseUrl: 'https://www.pinterest.com/$$socialid$$', value: undefined },
            { id: 'skype', baseUrl: 'skype:live:$$socialid$$', value: undefined },
            { id: 'snapchat', baseUrl: 'https://www.snapchat.com/add/$$socialid$$', value: undefined },
            { id: 'spotify', baseUrl: 'https://open.spotify.com/user/$$socialid$$', value: undefined },
            { id: 'tiktok', baseUrl: 'https://www.tiktok.com/@$$socialid$$', value: undefined },
            { id: 'tumblr', baseUrl: 'https://$$socialid$$.tumblr.com/', value: undefined },
            { id: 'twitter', baseUrl: 'https://www.twitter.com/$$socialid$$', value: undefined },
            { id: 'vimeo', baseUrl: 'https://www.vimeo.com/$$socialid$$', value: undefined },
            { id: 'whatsapp', baseUrl: 'https://wa.me/$$socialid$$', value: undefined },
            { id: 'youtube', baseUrl: 'https://youtube.com/$$socialid$$', value: undefined },
        ],
    },
    contacts: [],
    image: {
        type: String,
        required: false
    },
    qr: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    hash: { type: String },
    salt: { type: String },
    refreshToken: { type: String, required: false },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: String, required: false }
});
/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
/**
 * Methods
 */
// TODO: Evaluate to move this methos to a service instead.
userSchema.methods.generateJWT = function () {
    return jsonwebtoken_1.default.sign({
        email: this.email,
        id: this._id,
    }, config_1.default.jwtSecret, {
        expiresIn: 10000
    });
};
userSchema.methods.validatePassword = function (password) {
    console.log('validatePassword', password);
    var hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 128, 128, "sha512")
        .toString("hex");
    return this.hash === hash;
};
userSchema.methods.setPassword = function (password) {
    this.salt = crypto_1.default.randomBytes(16).toString("hex");
    this.hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 128, 128, "sha512")
        .toString("hex");
};
userSchema.methods.toAuthJSON = function (token) {
    return {
        _id: this._id,
        email: this.email,
        token: token,
        username: this.username
    };
};
/**
 * Statics
 */
userSchema.statics.get = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, this.findById(id)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw user;
                    }
                    return [2 /*return*/, user];
                case 2:
                    err_1 = _a.sent();
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    });
};
userSchema.statics.list = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.skip, skip = _c === void 0 ? 0 : _c, _d = _b.limit, limit = _d === void 0 ? 50 : _d;
    return this.find()
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec();
};
/**
 * @typedef User
 */
exports.default = mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.model.js.map