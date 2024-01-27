import { NextFunction, Request, Response } from 'express';
import { HTTPError, Regex, passwordNotMatch } from '../helpers/errors';
import User from '../database/model/userModel';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = await verifyPayload(req.body, 2);
    return res.json({ payload });
  } catch (e) {
    next(e);
  }
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = await verifyPayload(req.body, 1);
    const user = new User(payload);
    await user.save();
    return res.json({ payload, user });
  } catch (e) {
    next(e);
  }
}

// verify payload (type 1 for signup and 2 for login)
async function verifyPayload(body: any, type: 1 | 2) {
  // verify phone
  let phone = +body?.phone;
  if (!phone || phone?.toString().length !== 10 || isNaN(phone))
    throw HTTPError({ param: 'phone' });
  let email;
  let password = body?.password;
  let name;
  if (type == 1) {
    // verify email
    email = body?.email;
    if (!Regex.email.test(email)) throw HTTPError({ param: 'email' });
    // verify password
    if (password !== body?.confirmPassword)
      throw HTTPError({ param: 'password', message: passwordNotMatch });
    // verify name
    name = body?.name;
    if (typeof name !== 'string' || name?.length < 3)
      throw HTTPError({ param: 'name' });
  }
  if (!Regex.password.test(password))
    throw HTTPError(
      type == 1 ? { param: 'password' } : { message: 'Invalid Credentials' }
    );
  let proj: any = {};
  if (type == 2) {
    const fields = ['password', 'email', 'name', 'phone'];
    for (let f of fields) proj[f] = true;
  }
  const user = await User.findOne({ phone }, proj);
  // if validating signup and phone already registerd
  if (type == 1 && user)
    throw HTTPError({ message: 'User already exist with that Phone.' });
  if (type == 2 && !user) throw HTTPError({ message: 'User does not exist.' });
  if (type == 1) return { phone, email, password, name };
  const matched = user?.matchPassword(password);
  if (!matched) throw HTTPError({ message: 'Invalid Credentials' });
  return user;
}
