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
import dbConnect from "@/utils/db";
import { updateBinRequestStatus } from "@/controllers/binRequest";

/**
 * Handles the PUT request to update bin request status.
 * 
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The outgoing response object.
 */
export default async function handler(req, res) {
  // Check if the request method is PUT, if not return a 405 status code.
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end("Method Not Allowed");
  }

  try {
    // Establish a connection to the database.
    await dbConnect();
    
    // Update the bin request status.
    return updateBinRequestStatus(req, res);
  } catch (error) {
    // Log the error and return a 500 status code.
    console.error(error);
    return res.status(500).end("Internal Server Error");
  }
}