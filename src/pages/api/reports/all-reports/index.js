// src/pages/api/auth/signup.js
import dbConnect from "@/utils/db";
import { fetchReports } from "@/controllers/reportController";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end();
  }

  await dbConnect();
  return fetchReports(req, res);
}
