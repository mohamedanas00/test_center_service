import { StatusCodes } from "http-status-codes";
import scheduleModel from "../../../../DB/models/schedule.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const createSchedule = asyncHandler(async (req, res) => {
  const { date, time, capacity } = req.body;
  const { examId, branchId } = req.query;
  const newSchedule = await scheduleModel.create({
    examId,
    branchId,
    date,
    time,
    capacity,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Schedule created successfully", newSchedule });
});
