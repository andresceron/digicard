import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { HttpError } from './api-error';

function errorHandler(error: HttpError, req: Request, res: Response, next: NextFunction) {
  const status = error.statusCode || httpStatus.BAD_REQUEST;
  const message = error.message || 'Unexpected Error';

  res.status(status).send({
    status,
    message
  });

  next();
}

export default errorHandler;
