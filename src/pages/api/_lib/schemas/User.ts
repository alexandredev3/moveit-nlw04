import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    countdown: {
      type: Schema.Types.ObjectId,
      ref: "Countdown",
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
