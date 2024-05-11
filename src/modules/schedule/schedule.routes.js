import { Router } from "express";
import * as scheduleController from "./controller/schedule.js";
import auth, { userAuth } from '../../middleware/auth.js';


const scheduleRouter = Router();

scheduleRouter.post("/",auth(userAuth.testCenter), scheduleController.createSchedule);

export default scheduleRouter