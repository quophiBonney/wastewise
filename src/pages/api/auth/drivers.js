// src/pages/api/auth/signup.js
import dbConnect from "@/utils/db"; // now a real function
import { getDrivers } from "@/controllers/userRegistration";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end();
  }

  await dbConnect(); // ✅ this works
  return getDrivers(req, res); // controller stays `async (req,res)`
}
