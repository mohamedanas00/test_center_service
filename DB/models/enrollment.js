import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema(
  {
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
    grade: {
      type:String ,
      required: true,
    },
    isMarked: {
      type: Boolean,
      default: false,
    },
    student:{
        id: {
            type: Number, 
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    }

  },
  {
    timestamps: true,
  }
);

const enrollmentModel = model("Enrollment", enrollmentSchema);

export default enrollmentModel;
