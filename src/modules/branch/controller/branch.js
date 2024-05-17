import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../../utils/errorHandling.js";
import branchModel from "../../../../DB/models/branch.model.js";
import logsModel from "../../../../DB/models/logs.model.js";
import { ApiFeatures } from "../../../utils/apiFeature.js";


export const createBranch = asyncHandler(async (req, res) => {
    const { location, address } = req.body;
    const testCenter = req.user
    const newBranch = await branchModel.create({
        location, address, testCenter: {
            id: testCenter.id
            , name: testCenter.name, email: testCenter.email
        }
    });
    await logsModel.create({
        userId: testCenter.id,
        email: testCenter.email,
        role: testCenter.role,
        action: `Create Branch successfully with id ${newBranch._id}`,
    })
    res.status(StatusCodes.CREATED).json({ message: "Branch created successfully", newBranch });
})

export const updateBranch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { location, address } = req.body;
    const testCenter = req.user
    const isExistBranch = await branchModel.findById(id);

    if (!isExistBranch) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Branch not found" });
    }

    if (location) {
        isExistBranch.location = location
    }
    if (address) {
        isExistBranch.address = address
    }
    await isExistBranch.save();
    await logsModel.create({
        userId: testCenter.id,
        email: testCenter.email,
        role: testCenter.role,
        action: `TestCenter Update Branch successfully with id ${isExistBranch._id}`,
    })
    res.status(StatusCodes.OK).json({ message: "Branch updated successfully", isExistBranch });
})


export const SearchByLocation = asyncHandler(async (req, res) => {

    let apiFeatures = new ApiFeatures(
        branchModel.find(),
        req.query
    )
        .fields()
        .pagination(branchModel)
        .search()
        .sort()
        .filter();

    let branches = await apiFeatures.mongooseQuery.exec();

    res.status(StatusCodes.OK).json({
        branches,
        countDocuments: apiFeatures.countDocuments,
    });
})

export const GetBranchesByID = asyncHandler(async (req, res) => {

    const testCenter = req.user
    const id = testCenter.id
    console.log(id);
    const branches = await branchModel.find({ testCenter: {
        id: id,
        name: testCenter.name,
        email: testCenter.email
    } });
    if (!branches) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Branch not found" });
    }
    res.status(StatusCodes.OK).json({ branches });
}) 