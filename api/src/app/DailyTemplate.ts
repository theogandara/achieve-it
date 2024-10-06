import { model, Schema } from 'mongoose';

export const DailyTemplate = model(
  'DailyTemplate',
  new Schema({
    items: {
      type: [
        {
          name: { type: String, required: true },
        },
      ],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  })
);
