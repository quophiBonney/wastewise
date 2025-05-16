import dbConnect from "@/utils/db";
import { fetchBinPickupLocationByArea } from "@/controllers/binPickupsController";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end();
  }

  await dbConnect();
  return fetchBinPickupLocationByArea(req, res);
}