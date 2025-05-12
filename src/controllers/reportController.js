// src/controllers/userRegistration.js
import reportModel from "@/models/Reports";
import UserModel from "@/models/Users";

export const reportController = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { name, contact, issue, status } =
    req.body;

  try {
    const existing = await UserModel.findOne({ fullName: name });
    if (!existing) {
      return res
        .status(409)
        .json({ error: "User not found, try signing up" });
    }
    await reportModel.create({
      name: existing,
      contact,
      issue,
      status
    });

    return res
      .status(201)
      .json({
        message: "Report sent successfully.",
      });
  } catch (err) {
    console.error("Report error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const fetchReports = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  try {
    const reports = await reportModel.find();
    return res.status(200).json(reports);
  } catch (err) {
    console.error("Report fetch error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}