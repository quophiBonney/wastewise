// src/models/Users.js
import { mongoose, Schema } from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    name: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    issue: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["resolved", "pending", "in progress"],
        default: "pending",
    }
  },
  { timestamps: true }
);

const reportModel = mongoose.models.Reports
  ? mongoose.models.Reports
  : mongoose.model("reports", reportSchema);

export default reportModel;
