// src/controllers/userRegistration.js
import bcrypt from "bcryptjs";
import UserModel from "@/models/Users";
import registrationValidations from "@/validations/signupValidation";

export const registerUser = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // 2) Validate input
  let data;
  try {
    data = registrationValidations.parse(req.body);
  } catch (err) {
    return res.status(400).json({ error: "Invalid input", details: err.errors });
  }

  const { fullName, email, role, phone, password, region, town, location } = data;

  try {
    // 3) Check duplicates
    const [byEmail, byPhone] = await Promise.all([
      UserModel.findOne({ email }),
      UserModel.findOne({ phone }),
    ]);
    if (byEmail || byPhone) {
      return res.status(409).json({ error: "User with those credentials already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      fullName,
      email,
      role,
      phone,
      password: hashedPassword,
      region,
      town,
      location
    });

    return res.status(201).json({
      message: "Registration successful",
      user: { id: newUser._id, fullName, email, role },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
