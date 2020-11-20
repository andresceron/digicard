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
var express_1 = require("express");
var paramValidation = __importStar(require("../../config/param-validation"));
var uploadCtrl = __importStar(require("./upload.controller"));
var multer_1 = __importDefault(require("multer"));
// todo: move to service?
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        var fileName = file.originalname.toLowerCase().split(' ').join('-');
        console.log('fileName:: ', fileName);
        cb(null, fileName);
    }
});
var upload = multer_1.default({ storage: storage });
var router = express_1.Router();
router.route('/')
    /** POST /api/upload - Create new user */
    .post(paramValidation.uploadProfilePicValidation, upload.single('data[image]'), uploadCtrl.uploadSingle);
exports.default = router;
//# sourceMappingURL=upload.route.js.map