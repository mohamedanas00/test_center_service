import { Router } from "express";
import * as scheduleController from "./controller/schedule.js";
import auth, { userAuth } from '../../middleware/auth.js';


const scheduleRouter = Router();

scheduleRouter.post("/",auth(userAuth.testCenter), scheduleController.createSchedule);
scheduleRouter.get("/:examId",auth(userAuth.student) ,scheduleController.GetAllExamSchedule);
export default scheduleRouter