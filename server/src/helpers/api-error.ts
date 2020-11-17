import httpStatus from 'http-status';
/**
 * The Base class for all HTTP errors
 */
export abstract class HttpError extends Error {
  public statusCode = 0;

  protected constructor(name: string, public message: string) {
    super(message);
    this.name = name;
  }
}

/**
 * Represents a BAD REQUEST error. The request could not be understood by the
 * server due to malformed syntax. The client SHOULD NOT repeat the request
 * without modifications.
 */
export class BadRequestError extends HttpError {
  constructor(message?: string) {
    super('BadRequestError', message || 'Bad Request');
    Object.setPrototypeOf(this, BadRequestError.prototype);
    this.statusCode = httpStatus.BAD_REQUEST;
  }
}

/**
 * Represents an UNAUTHORIZED error. The request requires user authentication. The response
 * MUST include a WWW-Authenticate header field containing a challenge applicable to the
 * requested resource.
 */
export class UnauthorizedError extends HttpError {
  constructor(message?: string) {
    super('UnauthorizedError', message || 'Unauthorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    this.statusCode = httpStatus.UNAUTHORIZED;
  }
}

/**
 * Represents a FORBIDDEN error. The server understood the request, but is refusing to
 * fulfill it. Authorization will not help and the request SHOULD NOT be repeated.
 */
export class ForbiddenError extends HttpError {
  constructor(message?: string) {
    super('ForbiddenError', message || 'Forbidden');
    Object.setPrototypeOf(this, ForbiddenError.prototype);
    this.statusCode = httpStatus.FORBIDDEN;
  }
}

/**
 * Represents a NOT FOUND error. The server has not found anything matching
 * the Request-URI. No indication is given of whether the condition is temporary
 * or permanent.
 * This error is commonly used when the server does not wish to reveal exactly why
 * the request has been refused, or when no other response is applicable.
 */
export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super('NotFoundError', message || 'Not Found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.statusCode = httpStatus.NOT_FOUND;
  }
}

/**
 * Represents a METHOD NOT ALLOWED error. The method specified in the Request-Line is not allowed for
 * the resource identified by the Request-URI. The response MUST include an Allow header
 * containing a list of valid methods for the requested resource.
 */
export class MethodNotAllowedError extends HttpError {
  constructor(message?: string) {
    super('MethodNotAllowedError', message || 'Method Not Allowed');
    Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
    this.statusCode = httpStatus.METHOD_NOT_ALLOWED;
  }
}

/**
 * Represents a NOT ACCEPTABLE error. The resource identified by the request is only capable of
 * generating response entities which have content characteristics not acceptable according
 * to the accept headers sent in the request.
 */
export class NotAcceptableError extends HttpError {
  constructor(message?: string) {
    super('NotAcceptableError', message || 'Not Acceptable');
    Object.setPrototypeOf(this, NotAcceptableError.prototype);
    this.statusCode = httpStatus.NOT_ACCEPTABLE;
  }
}

/**
 * Represents a CONFLICT error. The request could not be completed due to a
 * conflict with the current state of the resource.
 */
export class ConflictError extends HttpError {
  constructor(message?: string) {
    super('ConflictError', message || 'Conflict');
    Object.setPrototypeOf(this, ConflictError.prototype);
    this.statusCode = httpStatus.CONFLICT;
  }
}

/**
 * Represents an Internet Server error.
 * There was an unknown issue during the process of the request
 */
export class InternalServerError extends HttpError {
  constructor(message?: string) {
    super('InternalServerError', message || 'Internal Server Error');
    Object.setPrototypeOf(this, InternalServerError.prototype);
    this.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  }
}
