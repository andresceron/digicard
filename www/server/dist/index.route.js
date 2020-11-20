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
var auth_route_1 = __importDefault(require("./routes/auth/auth.route"));
var user_route_1 = __importDefault(require("./routes/user/user.route"));
var contact_route_1 = __importDefault(require("./routes/contact/contact.route"));
// import postRoutes from './routes/post/post.route';
var upload_route_1 = __importDefault(require("./routes/upload/upload.route"));
var passportAuth = __importStar(require("./config/passport-authcheck"));
var router = express_1.default.Router(); // eslint-disable-line new-cap
// TODO: use glob to match *.route files
/**
 * GET /health - Check service health
 */
router.get('/health', function (req, res) {
    return res.send('OK');
});
/**
 * Mount 'auth' routes at /auth
 */
router.use('/auth', auth_route_1.default);
/**
 * Mount 'user' routes at /users
 */
router.use('/users', passportAuth.authenticate, user_route_1.default);
// /**
//  * Mount 'contacts' routes at /contacts
//  */
router.use('/contacts', contact_route_1.default);
// /**
//  * Mount 'upload' routes at /upload
//  */
router.use('/upload', passportAuth.authenticate, upload_route_1.default);
exports.default = router;
//# sourceMappingURL=index.route.js.map