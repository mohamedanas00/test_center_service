import connectDB from "../DB/connection.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import branchRouter from "./modules/branch/branch.routes.js";
import examRouter from "./modules/exam/exam.routes.js";
import scheduleRouter from "./modules/schedule/schedule.routes.js";
import enrollmentRouter from "./modules/enrollment/enrollment.routes.js";
const initApp = (app, express) => {
  app.use(express.json());

  app.use("/branch", branchRouter);
  app.use("/exam", examRouter);
  app.use("/schedule", scheduleRouter);
  app.use("/examRegister", enrollmentRouter);



  app.use(globalErrorHandling);

  app.use("/*", (req, res, next) => {
    return res.json({ message: "In_valid Routing🚫" });
  });
  connectDB();
};

export default initApp;
