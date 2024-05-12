import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../../utils/errorHandling.js";
import examModel from "../../../../DB/models/exam.model.js";
import logsModel from "../../../../DB/models/logs.model.js";



export const createExam = asyncHandler(async (req, res) => {
    const { name, duration } = req.body;
    const testCenter = req.user
    const  testCenterId= req.user.id

    const newExam = await examModel.create({ name, duration, testCenterId });
    await logsModel.create({
        userId: testCenter.id,
        email: testCenter.email,
        role: testCenter.role,
        action: `Create Exam successfully with id ${newExam._id}`,
    })
    res.status(StatusCodes.CREATED).json({ message: "Exam created successfully", newExam });
})


