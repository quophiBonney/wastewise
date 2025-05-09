// src/models/Users.js
import mongoose from "mongoose";

const BinOfficesSchema = new mongoose.Schema(
  {
    supervisor: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    region: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    location: {
      lat: { 
        type: Number, 
        required: true 
      },
      lng: { 
        type: Number, 
        required: true 
      },
    }
  },
  { timestamps: true }
);

const BinOfficesModel = mongoose.models.BinOffices
  ? mongoose.models.BinOffices
  : mongoose.model("bin offices", BinOfficesSchema);

export default BinOfficesModel;
