import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema(
  {
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    examId: {
      type: Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    student: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    grade: {
      type: String,
      default: "N/A",
    },
    isMarked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const enrollmentModel = model("Enrollment", enrollmentSchema);

export default enrollmentModel;
