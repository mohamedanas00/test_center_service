import { StatusCodes } from "http-status-codes";
import enrollmentModel from "../../../../DB/models/enrollment.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import logsModel from "../../../../DB/models/logs.model.js";
import scheduleModel from "../../../../DB/models/schedule.model.js";


export const createEnrollment = asyncHandler(async (req, res) => {
    const { scheduleId } = req.params;
    const  student  = req.user;
    const isExist = await enrollmentModel.findOne({
        'student.id': student.id,
        scheduleId
    });
    if (isExist) {
       return res.status(StatusCodes.BAD_REQUEST).json({ message: "Student already registered for this exam in this time" });
    }

    const schedule = await scheduleModel.findById(scheduleId);
    const today = new Date();
    if (today > new Date(schedule.date)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Schedule date has expired" });
    }
   const time = new Date(`${schedule.date}T${schedule.time}:00.000Z`);
    if (today > time) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Schedule time has expired" });
    }

        
    const newRegister = await enrollmentModel.create({
        scheduleId,
        examId: schedule.examId,
        student:{
            id: student.id,
            name: student.name,
            email: student.email
        },
    });
    await logsModel.create({
        userId: student.id,
        email: student.email,
        role: student.role,
        action: "ExamRegistered",
    })
    res
        .status(StatusCodes.CREATED)
        .json({ message: "Enrollment created successfully", newRegister });
})

export const setGrade = asyncHandler(async (req, res) => {
    const {enrollmentId } = req.params;
    const { grade } = req.body;
    const isExist = await enrollmentModel.findById(enrollmentId);
    if (!isExist) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Enrollment not found" });
    }
    isExist.grade = grade;
    isExist.isMarked = true;
    await isExist.save();
    await logsModel.create({
        userId: isExist.student.id,
        email: isExist.student.email,
        role: isExist.student.role,
        action: `Grade set successfully with id ${isExist._id}`,
    })
    res
        .status(StatusCodes.OK)
        .json({ message: "Grade set successfully", isExist });
})


export const ViewAllExamsWithGrade = asyncHandler(async (req, res) => {
    const enrollments = await enrollmentModel
        .find()
        .populate({
            path: "scheduleId",
        })
        .populate({
            path: "examId",
            select: "name duration"
        })
        .select("grade isMarked student examId scheduleId");
    res
        .status(StatusCodes.OK)
        .json({ message: "Enrollments retrieved successfully", enrollments: enrollments.map(enrollment => ({
            id: enrollment._id,
            student: enrollment.student,
            grade: enrollment.grade,
            isMarked: enrollment.isMarked,
            exam: {
                id: enrollment.examId._id,
                name: enrollment.examId.name,
                duration: enrollment.examId.duration
            },
            schedule: {
                date: enrollment.scheduleId.date,
                time: enrollment.scheduleId.time,
                capacity: enrollment.scheduleId.capacity
            }
        })) });

})

export const ViewStudentExamHistory= asyncHandler(async (req, res) => {
    const enrollments = await enrollmentModel
        .find({ "student.id": req.user.id })
        .populate({
            path: "scheduleId",
        })
        .populate({
            path: "examId",
            select: "name duration"
        })
        .select("grade isMarked student examId scheduleId");
    res
        .status(StatusCodes.OK)
        .json({ message: "Enrollments retrieved successfully", enrollments: enrollments.map(enrollment => ({
            id: enrollment._id,
            grade: enrollment.grade,
            isMarked: enrollment.isMarked,
            exam: {
                id: enrollment.examId._id,
                name: enrollment.examId.name,
                duration: enrollment.examId.duration
            },
            schedule: { 
                date: enrollment.scheduleId.date,
                time: enrollment.scheduleId.time,
                capacity: enrollment.scheduleId.capacity
            }
        })) });
})