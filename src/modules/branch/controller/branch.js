import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../../utils/errorHandling.js";
import branchModel from "../../../../DB/models/branch.model.js";


export const createBranch =asyncHandler(async (req, res) => {
    const { location, address } = req.body;
    const testCenterId =req.user.id
    const newBranch = await branchModel.create({ location, address, testCenter:{id:testCenterId
    ,name:req.user.name, email:req.user.email
    } });
    res.status(StatusCodes.CREATED).json({ message: "Branch created successfully", newBranch });    
})

export const updateBranch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { location, address } = req.body;
    const isExistBranch = await branchModel.findById(id);

    if (!isExistBranch) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Branch not found" });
    }

    if(location){
        isExistBranch.location = location
    }
    if(address){
        isExistBranch.address = address
    }
    await isExistBranch.save();
    res.status(StatusCodes.OK).json({ message: "Branch updated successfully", isExistBranch });
})