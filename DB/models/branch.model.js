
import { Schema, model } from "mongoose";

const branchSchema = new Schema({
    location: {
        type: String,
        required: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true,
        lowercase: true
    },
    testCenter:{
        id: {
            type: Number, 
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    }
},
{
    timestamps: true,
}
);

const branchModel = model('Branch', branchSchema)

export default branchModel