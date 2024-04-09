import { ObjectId, model } from 'mongoose';
import { commonModel } from './dbHelp';
import { Schema } from 'mongoose';
import { decryptMsg, encryptMsg } from '../../helpers/cryptService';

interface IChatMethods {}

interface IChat {
  from: ObjectId;
  to: ObjectId;
  message: string;
}

const obj = {
  from: commonModel.getRef('User'),
  to: commonModel.getRef('User'),
  message: commonModel.string(),
};

const chatSchema = new Schema<IChat, {}, IChatMethods>(obj, {
  timestamps: true,
});

chatSchema.pre('save', function (next) {
  if (this.message) this.message = encryptMsg(this.message);
  next();
});

chatSchema.post('find', function (data: IChat[], next) {
  data.forEach((d) => {
    d.message = decryptMsg(d.message);
  });
  next();
});

const Chat = model('Chat', chatSchema);
export default Chat;
