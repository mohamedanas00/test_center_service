import { StatusCodes } from "http-status-codes";
import scheduleModel from "../../../../DB/models/schedule.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import logsModel from "../../../../DB/models/logs.model.js";

export const createSchedule = asyncHandler(async (req, res,next) => {
  const { date, time, capacity } = req.body;
  const { examId, branchId } = req.query;
  const testCenter = req.user;
  const newSchedule = await scheduleModel.create({
    examId,
    branchId,
    date,
    time,
    capacity,
  });
  await logsModel.create({
    userId: testCenter.id,
    email: testCenter.email,
    role: testCenter.role,
    action: `Create Exam Schedule successfully with id ${newSchedule._id}`,
})
  res
    .status(StatusCodes.CREATED)
    .json({ message: "Schedule created successfully", newSchedule });
});


export const GetAllExamSchedule = asyncHandler(async (req, res,next) => {
  const {examId}  = req.params
  const schedules = await scheduleModel.find({ examId });
  res.status(StatusCodes.OK).json({ schedules });
})