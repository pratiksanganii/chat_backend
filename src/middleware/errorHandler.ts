import { NextFunction, Request, Response } from 'express';
import { InternalError } from '../helpers/errors';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let message = InternalError;

  try {
    const parsed = JSON.parse(err.message);
    if (parsed.statusCode) statusCode = parsed.statusCode;
    if (parsed.message) message = parsed.message;
    res.statusCode = statusCode;
    return res.json({ message });
  } catch (e) {
    console.log(e);
  }
  return res.json({ err });
}

export function notFoundHandler(req: Request, res: Response) {
  res.statusCode = 404;
  return res.json({ message: 'Not Found.' });
}
