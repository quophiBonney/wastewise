// src/controllers/userRegistration.js
import binRequestsModel from "@/models/BinRequests";
import { binRequestValidations } from "@/validations/binRequestValidations";
import axios from "axios";

export const requestBin = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Validate request body
  let validated;
  try {
    validated = binRequestValidations.parse(req.body);
  } catch (zodError) {
    return res
      .status(400)
      .json({ error: "Invalid input", details: zodError.errors });
  }

  const { houseAddress, region, town, houseHoldSize, contact, status } =
    validated;

  try {
    // Check for existing request
    const existing = await binRequestsModel.findOne({ houseAddress });
    if (existing) {
      return res
        .status(409)
        .json({ error: "A bin has already been requested for this address." });
    }

    const randomCode = Math.floor(Math.random() * 1_000_000)
      .toString()
      .padStart(6, "0");
    const binCode = `BIN-${randomCode}`;

    // Create new request
    await binRequestsModel.create({
      houseAddress,
      region,
      town,
      houseHoldSize,
      contact,
      binCode,
      status,
    });

    // Prepare and URL‑encode your SMS text
    const smsText = encodeURIComponent(
      `Your bin request has been received. Keep and bring this code along when coming for your bin: ${binCode}`
    );
    try {
      const smsUrl = `https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.ARKESEL_API_KEY}&to=${contact}&from=Waste%20Wise&sms=${smsText}`;
      const response = await axios.get(smsUrl);
      console.log("SMS sent successfully:", response.data);
    } catch (smsErr) {
      console.error(
        "Error sending SMS:",
        smsErr.response?.data || smsErr.message
      );
    }
    return res
      .status(201)
      .json({
        message: "Bin request submitted, you will receive an SMS shortly.",
      });
  } catch (err) {
    console.error("Bin request error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
export const fetchBinRequest = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  try {
    const binRequests = await binRequestsModel.find();
    return res.status(200).json(binRequests);
  } catch (err) {
    console.error("Error fetching bin requests:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updateBinRequestStatus = async (req, res) => { 
  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  const { id, status } = req.body;
  try {
    const updatedRequest = await binRequestsModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    return res.status(200).json({message: "Request status updated successfully", updatedRequest});
  } catch (err) {
    console.error("Error updating bin request:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}