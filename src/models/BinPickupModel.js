// src/models/Users.js
import { mongoose, Schema } from "mongoose";

const BinPickupsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BinPickupsModel = mongoose.models.BinPickups
  ? mongoose.models.BinPickups
  : mongoose.model("Bin Pickups", BinPickupsSchema);

export default BinPickupsModel;
