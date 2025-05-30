// src/controllers/userLogin.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import UserModel from "@/models/Users";

export const loginUser = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { sub: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // set the cookie
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 2 * 60 * 60,
      })
    );

    // *** return the token and minimal user info ***
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
