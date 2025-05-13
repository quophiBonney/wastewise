// src/pages/api/auth/signup.js
import dbConnect from "@/utils/db";
import { updateBinRequestStatus } from "@/controllers/binRequest";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end();
  }

  await dbConnect();
  return updateBinRequestStatus(req, res);
}


