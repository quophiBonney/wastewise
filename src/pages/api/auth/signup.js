// src/pages/api/auth/signup.js
import dbConnect from "@/utils/db"; // now a real function
import { registerUser } from "@/controllers/userRegistration";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end();
  }

  await dbConnect(); // ✅ this works
  return registerUser(req, res); // controller stays `async (req,res)`
}
