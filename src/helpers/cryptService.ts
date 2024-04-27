import { AES, MD5 } from 'crypto-js';
import { config } from 'dotenv';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
config();
const msgKey = process.env.MSG_CRYPT;
const phoneKey = process.env.PHONE_CRYPT;
const passKey = process.env.PASS_CRYPT;
const jwtKey = process.env.JWT_SECRET;
if (typeof phoneKey !== 'string') process.exit(1);
if (typeof passKey !== 'string') process.exit(1);
if (typeof jwtKey !== 'string') process.exit(1);
if (typeof msgKey !== 'string') process.exit(1);

// md5 hash
const getMd5Hash = (phone: number | string) => MD5(phone.toString()).toString();

// encrypt phone
const encryptPhone = (phone: string) =>
  AES.encrypt(phone.toString(), phoneKey).toString();

// decrypt phone
const decryptPhone = (phone: string) => AES.decrypt(phone, phoneKey);

// hash password
const hashPassword = (password: string) => {
  const salt = genSaltSync();
  return hashSync(password, salt);
};
// check password
const checkPassword = (pass: string, hash: string) => compareSync(pass, hash);

// generate jwt token
const generateJWT = (data: any, expiry = '1m') =>
  sign(data, jwtKey, { expiresIn: expiry });

// verify jwt token
const verifyJWT = (token: string) => verify(token, jwtKey);

// encrypt message
const encryptMsg = (msg: string) =>
  AES.encrypt(msg.toString(), msgKey).toString();

// decrypt message
const decryptMsg = (msg: string) => AES.decrypt(msg, msgKey).toString();

export {
  decryptPhone,
  encryptPhone,
  hashPassword,
  checkPassword,
  getMd5Hash,
  verifyJWT,
  generateJWT,
  encryptMsg,
  decryptMsg,
};
