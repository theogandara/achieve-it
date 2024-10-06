import { model, Schema } from 'mongoose';

export const QuitHabit = model(
  'QuitHabit',
  new Schema({
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    lastTime: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  })
);
