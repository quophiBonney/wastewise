// src/pages/api/auth/signup.js
import dbConnect from "@/utils/db";
import { reportController } from "@/controllers/reportController";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end();
  }

  await dbConnect();
  return reportController(req, res);
}
