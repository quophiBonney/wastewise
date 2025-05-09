import BinPickupsModel from "@/models/BinPickupModel";
import UserModel from "@/models/Users";
export const binPickupsController = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  const { name, region, town, driver, lat, lon } = req.body;
  try {
    const existingPickup = await BinPickupsModel.findOne({ name });
    if (existingPickup) {
      return res.status(409).json({ error: "Pickup centre already exist" });
    }
    const driverUser = await UserModel.findOne({ fullName: driver });
    if (!driverUser) {
      return res.status(404).json({ error: "Driver not found" });
    }
    const newRequest = await BinPickupsModel.create({
      name,
      lat,
      lon,
      region,
      town,
      driver: driverUser,
    });
    return res.status(201).json({
      message: "Bin pickup added successfully.",
      request: newRequest,
    });
  } catch (err) {
    console.error("Bin pickup error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const fetchBinPickups = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  try {
    const binPickups = await BinPickupsModel.find();
    return res.status(200).json(binPickups);
  } catch (err) {
    console.error("Error fetching bin pickups:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const fetchBinPickupLocations = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Pull region/town from query (they may be undefined)
  const { region, town } = req.query;

  // Build dynamic filter
  const filter = {};
  if (region) filter.region = region;
  if (town) filter.town = town;

  try {
    // Only select the lat & lon fields
    const pickups = await BinPickupsModel.find(filter, {
      lat: 1,
      lon: 1,
      _id: 0,
    });

    // Map to plain array of { lat, lon }
    const locations = pickups.map((p) => ({
      lat: p.lat,
      lon: p.lon,
    }));

    return res.status(200).json(locations);
  } catch (err) {
    console.error("Error fetching pickup locations:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updateBinPickupLocation = async (req, res) => {
  if (req.method !== "PATCH") {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  const { id, name, region, town, driver } = req.body;
  try {
    const updatedPickup = await BinPickupsModel.findByIdAndUpdate(
      id,
      { name, region, town, driver, lat, lon },
      { new: true }
    );
    if (!updatedPickup) {
      return res.status(404).json({ error: "Pickup not found" });
    }
    return res.status(200).json(updatedPickup);
  } catch (err) {
    console.error("Error updating pickup:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
export const deleteBinPickupLocation = async (req, res) => {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  const { id } = req.body;
  try {
    const deletedPickup = await BinPickupsModel.findByIdAndDelete(id);
    if (!deletedPickup) {
      return res.status(404).json({ error: "Pickup not found" });
    }
    return res.status(200).json({ message: "Pickup deleted successfully" });
  } catch (err) {
    console.error("Error deleting pickup:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
export const fetchBinPickupLocationByArea = async (req, res) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { region, town } = req.query;

  if (!region || !town) {
    return res.status(400).json({
      error: "Both `region` and `town` query parameters are required.",
    });
  }

  try {
    const pickups = await BinPickupsModel.find({
      region: region,
      town: town,
    }); // if you want driver details

    return res.status(200).json(pickups);
  } catch (err) {
    console.error("Error fetching pickups by area:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};
