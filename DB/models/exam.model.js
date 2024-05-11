import { Schema, model } from "mongoose";

const examSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    duration: {
      type: String,
      required: true,
      lowercase: true,
    },
    testCenterId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const examModel = model("Exam", examSchema);

export default examModel;
