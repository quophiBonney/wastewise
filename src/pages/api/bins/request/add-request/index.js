// src/pages/api/auth/signup.js
import dbConnect from "@/utils/db";
import { requestBin } from "@/controllers/binRequest";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end();
  }

  await dbConnect();
  return requestBin(req, res);
}
