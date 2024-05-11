import { Router } from "express";
import * as enrollmentController from "./controller/enrollment.js";
import auth, { userAuth } from '../../middleware/auth.js';


const enrollmentRouter = Router();

enrollmentRouter.post("/:scheduleId",auth(userAuth.student), enrollmentController.createEnrollment);
enrollmentRouter.patch("/:enrollmentId",auth(userAuth.testCenter), enrollmentController.setGrade);

export default enrollmentRouter