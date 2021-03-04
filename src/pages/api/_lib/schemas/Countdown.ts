import { Schema, model } from "mongoose";

const CountdownSchema = new Schema(
  {
    time: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Countdown", CountdownSchema);
