import { Router } from "express";
import * as branchController from "./controller/branch.js";
import auth, { userAuth } from '../../middleware/auth.js';

const branchRouter = Router();

branchRouter.post("/",auth(userAuth.testCenter), branchController.createBranch);
branchRouter.put("/:id",auth(userAuth.testCenter), branchController.updateBranch);

export default branchRouter