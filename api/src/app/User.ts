import { model, Schema } from 'mongoose';

export const User = model(
  'User',
  new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  })
);
