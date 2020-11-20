"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
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