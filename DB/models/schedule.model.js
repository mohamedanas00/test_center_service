import { Schema, model } from "mongoose";

const scheduleSchema = new Schema(
  {
    examId: {
        type: Schema.Types.ObjectId,
        ref: "Exam",
        required: true,
    },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
    },
    date:{
        type:String,
        required: true,
    },
    time: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const scheduleModel = model("Schedule", scheduleSchema);

export default scheduleModel;
