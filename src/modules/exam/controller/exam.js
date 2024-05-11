import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../../utils/errorHandling.js";
import examModel from "../../../../DB/models/exam.model.js";



export const createExam = asyncHandler(async (req, res) => {
    const { name, duration } = req.body;
    const testCenterId = req.user.id
    const newExam = await examModel.create({ name, duration, testCenterId });
    res.status(StatusCodes.CREATED).json({ message: "Exam created successfully", newExam });
})
