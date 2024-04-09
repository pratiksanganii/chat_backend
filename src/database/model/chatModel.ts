import { ObjectId, model } from 'mongoose';
import { commonModel } from './dbHelp';
import { Schema } from 'mongoose';

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

const Chat = model('Chat', chatSchema);
export default Chat;
