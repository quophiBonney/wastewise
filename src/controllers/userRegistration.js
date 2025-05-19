// src/controllers/userRegistration.js
import bcrypt from "bcryptjs";
import UserModel from "@/models/Users";


export const registerUser = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 2) Validate input
  let data;
  try {
    data = req.body;
  } catch (err) {
    return res.status(400).json({ error: "Invalid input", details: err.errors });
  }

  const { fullName, email, role, password, region, town, location } = data;
try {
  if (!location) {
    return res.status(409).json({ message: "Location permission required" });
  }

  const [byEmail] = await Promise.all([UserModel.findOne({ email })]);
  if (byEmail) {
    return res.status(409).json({
      message: "User already exists",
      fieldErrors: { email: ["Email is already registered"] },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({
    fullName,
    email,
    role,
    password: hashedPassword,
    region,
    town,
    location: { lat: location.lat, lng: location.lng },
  });

  return res.status(201).json({
    message: "Registration successful",
    user: { id: newUser._id, fullName, email, role },
  });
} catch (error) {
  console.error("Registration error:", error);
  return res
    .status(500)
    .json({ message: "Server error", details: error.message });
}
};
export const fetchUsers = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
export const getDrivers = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const drivers = await UserModel.find({ role: "driver" });
    return res.status(200).json(drivers);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return res.status(500).json({ message: "Server error" });
  }
} 