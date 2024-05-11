
import { Schema, model } from "mongoose";

const logsSchema = new Schema({
    User:{
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
        role:{
            type: String,
            required: true
        }
    },
    action: {
        type: String,
        required: true,
        lowercase: true
    }

},
{
    timestamps: true,
}
);

const logsModel = model('Logs', logsSchema)

export default logsModel