"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var compression_1 = __importDefault(require("compression"));
var method_override_1 = __importDefault(require("method-override"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var passport_1 = __importDefault(require("passport"));
var path_1 = __importDefault(require("path"));
var index_route_1 = __importDefault(require("../index.route"));
var error_1 = __importDefault(require("../helpers/error"));
var api_error_1 = require("../helpers/api-error");
exports.default = (function (_a) {
    /**
     * App Configuration
     */
    var app = _a.app;
    /** Parse body params and attach them to req.body */
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    /** MISSING COMMENT ON WHAT IT IS FOR */
    app.use(cookie_parser_1.default());
    app.use(compression_1.default());
    app.use(method_override_1.default());
    /**
     * Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
     * It shows the real origin IP in the heroku or Cloudwatch logs
     */
    app.enable('trust proxy');
    /** Secure apps by setting various HTTP headers */
    app.use(helmet_1.default());
    /** Enable CORS - Cross Origin Resource Sharing */
    app.use(cors_1.default());
    /** Passport configuration */
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    require('../config/passport-service');
    /** Mount all routes on /api path */
    app.use('/api', index_route_1.default);
    // Serve UI dist
    var distDir = path_1.default.resolve(__dirname, '../../../ui/dist/angularnode/index.html');
    app.use(express_1.default.static(distDir));
    /** catch 404 and forward to error handler */
    app.use(function (req, res, next) {
        return next(new api_error_1.NotFoundError('API not found'));
    });
    /** ErrorHandler for all API Error */
    app.use(error_1.default);
});
//# sourceMappingURL=express.js.map