import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const createBinPickupCentre = createAsyncThunk(
  "bins/pickups",
  async (pickupData) => {
    const response = await axios.post("/api/bins/pickups/add-centre", pickupData);
    return response.data;
  }
);

export const getBinPickupCentres = createAsyncThunk(
  "bins/pickups/fetchAll",
  async () => {
    const response = await axios.get("/api/bins/pickups/get-centres");
    return response.data;
  }
);

export const updateBinPickupCentre = createAsyncThunk(
  "bins/pickups/update",
  async ({ id, ...fields }) => {
    const response = await axios.put(`/api/bins/pickups/update-centre/${id}`, fields);
    return response.data;
  }
);

export const getBinPickupLocations = createAsyncThunk(
  "bins/pickups/locations",
  async () => {
    const response = await axios.get(
      `/api/bins/pickups/get-locations`,
    );
    return response.data;
  }
);
export const getBinPickupAreas = createAsyncThunk(
  "bins/pickups/area",
  async () => {
    const response = await axios.get(`/api/bins/pickups/get-areas`);
    return response.data;
  }
);
export const deleteBinPickupCentre = createAsyncThunk(
  "request/delete",
  async (id) => {
    await axios.delete(`/api/bins/pickups/delete-centre/${id}`);
    return id;
  }
);

// Initial State
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

// Slice Definition
const pickupsSlice = createSlice({
  name: "pickups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Pickup Centres
      .addCase(getBinPickupCentres.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBinPickupCentres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getBinPickupCentres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch Locations
      .addCase(getBinPickupLocations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBinPickupLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getBinPickupLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Get Areas
      .addCase(getBinPickupAreas.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBinPickupAreas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getBinPickupAreas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update Request
      .addCase(updateBinPickupCentre.fulfilled, (state, action) => {
        const idx = state.items.findIndex((r) => r._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      // Delete Request
      .addCase(deleteBinPickupCentre.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r._id !== action.payload);
      })
      // Create Pickup Centre
      .addCase(createBinPickupCentre.fulfilled, (state, action) => {
        state.items.push(action.payload.request);
      });
  },
});

export default pickupsSlice.reducer;
