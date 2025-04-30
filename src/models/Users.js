// src/models/Users.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "member", "user"],
      default: "user",
    },
    region: { type: String, required: true },
    town: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.Users
  ? mongoose.models.Users
  : mongoose.model("Users", UserSchema);

export default UserModel;
