"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ConflictError = exports.NotAcceptableError = exports.MethodNotAllowedError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.HttpError = void 0;
var http_status_1 = __importDefault(require("http-status"));
/**
 * The Base class for all HTTP errors
 */
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(name, message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.statusCode = 0;
        _this.name = name;
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
/**
 * Represents a BAD REQUEST error. The request could not be understood by the
 * server due to malformed syntax. The client SHOULD NOT repeat the request
 * without modifications.
 */
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message) {
        var _this = _super.call(this, 'BadRequestError', message || 'Bad Request') || this;
        Object.setPrototypeOf(_this, BadRequestError.prototype);
        _this.statusCode = http_status_1.default.BAD_REQUEST;
        return _this;
    }
    return BadRequestError;
}(HttpError));
exports.BadRequestError = BadRequestError;
/**
 * Represents an UNAUTHORIZED error. The request requires user authentication. The response
 * MUST include a WWW-Authenticate header field containing a challenge applicable to the
 * requested resource.
 */
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message) {
        var _this = _super.call(this, 'UnauthorizedError', message || 'Unauthorized') || this;
        Object.setPrototypeOf(_this, UnauthorizedError.prototype);
        _this.statusCode = http_status_1.default.UNAUTHORIZED;
        return _this;
    }
    return UnauthorizedError;
}(HttpError));
exports.UnauthorizedError = UnauthorizedError;
/**
 * Represents a FORBIDDEN error. The server understood the request, but is refusing to
 * fulfill it. Authorization will not help and the request SHOULD NOT be repeated.
 */
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(message) {
        var _this = _super.call(this, 'ForbiddenError', message || 'Forbidden') || this;
        Object.setPrototypeOf(_this, ForbiddenError.prototype);
        _this.statusCode = http_status_1.default.FORBIDDEN;
        return _this;
    }
    return ForbiddenError;
}(HttpError));
exports.ForbiddenError = ForbiddenError;
/**
 * Represents a NOT FOUND error. The server has not found anything matching
 * the Request-URI. No indication is given of whether the condition is temporary
 * or permanent.
 * This error is commonly used when the server does not wish to reveal exactly why
 * the request has been refused, or when no other response is applicable.
 */
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        var _this = _super.call(this, 'NotFoundError', message || 'Not Found') || this;
        Object.setPrototypeOf(_this, NotFoundError.prototype);
        _this.statusCode = http_status_1.default.NOT_FOUND;
        return _this;
    }
    return NotFoundError;
}(HttpError));
exports.NotFoundError = NotFoundError;
/**
 * Represents a METHOD NOT ALLOWED error. The method specified in the Request-Line is not allowed for
 * the resource identified by the Request-URI. The response MUST include an Allow header
 * containing a list of valid methods for the requested resource.
 */
var MethodNotAllowedError = /** @class */ (function (_super) {
    __extends(MethodNotAllowedError, _super);
    function MethodNotAllowedError(message) {
        var _this = _super.call(this, 'MethodNotAllowedError', message || 'Method Not Allowed') || this;
        Object.setPrototypeOf(_this, MethodNotAllowedError.prototype);
        _this.statusCode = http_status_1.default.METHOD_NOT_ALLOWED;
        return _this;
    }
    return MethodNotAllowedError;
}(HttpError));
exports.MethodNotAllowedError = MethodNotAllowedError;
/**
 * Represents a NOT ACCEPTABLE error. The resource identified by the request is only capable of
 * generating response entities which have content characteristics not acceptable according
 * to the accept headers sent in the request.
 */
var NotAcceptableError = /** @class */ (function (_super) {
    __extends(NotAcceptableError, _super);
    function NotAcceptableError(message) {
        var _this = _super.call(this, 'NotAcceptableError', message || 'Not Acceptable') || this;
        Object.setPrototypeOf(_this, NotAcceptableError.prototype);
        _this.statusCode = http_status_1.default.NOT_ACCEPTABLE;
        return _this;
    }
    return NotAcceptableError;
}(HttpError));
exports.NotAcceptableError = NotAcceptableError;
/**
 * Represents a CONFLICT error. The request could not be completed due to a
 * conflict with the current state of the resource.
 */
var ConflictError = /** @class */ (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(message) {
        var _this = _super.call(this, 'ConflictError', message || 'Conflict') || this;
        Object.setPrototypeOf(_this, ConflictError.prototype);
        _this.statusCode = http_status_1.default.CONFLICT;
        return _this;
    }
    return ConflictError;
}(HttpError));
exports.ConflictError = ConflictError;
/**
 * Represents an Internet Server error.
 * There was an unknown issue during the process of the request
 */
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message) {
        var _this = _super.call(this, 'InternalServerError', message || 'Internal Server Error') || this;
        Object.setPrototypeOf(_this, InternalServerError.prototype);
        _this.statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        return _this;
    }
    return InternalServerError;
}(HttpError));
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=api-error.js.map