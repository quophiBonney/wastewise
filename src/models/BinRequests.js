// src/models/Users.js
import { mongoose } from "mongoose";


const binRequestsSchema = new mongoose.Schema(
  {
    houseAddress: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    houseHoldSize: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    binCode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'requested'],
        default: 'requested'
    }
  },
  { timestamps: true }
);

const binRequestsModel = mongoose.models.BinRequests
  ? mongoose.models.BinRequests
  : mongoose.model("Bins Request", binRequestsSchema);

export default binRequestsModel;