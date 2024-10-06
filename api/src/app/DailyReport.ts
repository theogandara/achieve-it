import { model, Schema } from 'mongoose';

export const DailyReport = model(
  'DailyReport',
  new Schema({
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    items: {
      type: [
        {
          name: { type: String, required: true },
          done: { type: Boolean, required: true },
        },
      ],
      required: true,
    },
  })
);
