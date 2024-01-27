import { Schema, model } from 'mongoose';
import { commonModel } from './dbHelp';
import {
  checkPassword,
  encryptPhone,
  getMd5Hash,
  hashPassword,
} from '../../helpers/cryptService';

interface IUserMethods {
  matchPassword(pass: string): boolean;
}
interface IUser {
  name: string;
  email: string;
  phone: string;
  uniquePhone: string;
  password: string;
  jwtToken: string;
  lastLogin: Date;
}

const obj = {
  name: commonModel.string(),
  email: commonModel.string(),
  phone: commonModel.string(),
  uniquePhone: { ...commonModel.string(), unique: true },
  password: commonModel.string(),
  jwtToken: commonModel.string(false), // not required
  lastLogin: { type: Date, required: false },
};
const userSchema = new Schema<IUser, {}, IUserMethods>(obj, {
  timestamps: true,
});

userSchema.pre('validate', function (next) {
  if (this.phone) this.uniquePhone = getMd5Hash(this.phone);
  next();
});

userSchema.pre('save', function (next) {
  // encrypt phone before saving into database
  if (this.phone) {
    this.uniquePhone = getMd5Hash(this.phone);
    this.phone = encryptPhone(this.phone);
  }
  // encrypt password before saving into database
  if (this.password) this.password = hashPassword(this.password);
  next();
});

userSchema.pre('findOne', function (next) {
  const query = this.getQuery();
  // if finding by phone then use md5 hash
  if (query?.phone) {
    query.uniquePhone = getMd5Hash(query.phone);
    delete query.phone;
    this.setQuery(query);
  }
  next();
});

userSchema.methods.matchPassword = function (pass: string) {
  return checkPassword(pass, this.password);
};

const User = model('User', userSchema);
export default User;
