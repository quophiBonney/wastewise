// src/pages/api/auth/signup.js
import dbConnect from "@/utils/db";
import { deleteBinRequest } from "@/slice/requestBinSlice";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end();
  }

  await dbConnect();
  return deleteBinRequest(req, res);
}
