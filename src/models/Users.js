const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
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
  role: {
    type: String,
    enum: ["user", "admin", "driver"],
    default: "user"
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel;