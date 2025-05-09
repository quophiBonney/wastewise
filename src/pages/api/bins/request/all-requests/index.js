import dbConnect from "@/utils/db"; // now a real function
import { fetchBinRequest } from "@/controllers/binRequest";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end();
  }

  await dbConnect();
  return fetchBinRequest(req, res);
}