import { Model, Schema } from 'mongoose';
import { commonModel } from './dbHelp';

const userSchema = new Schema({
  name: commonModel.string(),
  email: commonModel.string(),
  password: commonModel.string(),
  jwtToken: commonModel.string(false), // not required
  lastLogin: { type: Date, required: false },
});
const User = new Model('User', userSchema);
export default User;
