import { Types } from 'mongoose';

export const commonModel = {
  string: (required: boolean = true) => ({
    type: String,
    ...(required ? { required: true } : {}),
  }),
  getRef: (ref: string) => ({
    type: Types.ObjectId,
    ref,
  }),
};
