import { Router } from "express";
import * as examController from "./controller/exam.js";
import auth, { userAuth } from '../../middleware/auth.js';


const examRouter = Router();

examRouter.post("/",auth(userAuth.testCenter), examController.createExam);
examRouter.get("/",auth(userAuth.testCenter) ,examController.getExams);

export default examRouter