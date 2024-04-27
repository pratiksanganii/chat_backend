import { NextFunction, Request, Response } from 'express';
import { verifyJWT } from '../helpers/cryptService';

export async function verifyToken(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const token: any = req.headers.access_token;
    const user = verifyJWT(token);
    req.user = user;
    return next();
  } catch (e) {
    console.log({ e });
    next(e);
  }
}
