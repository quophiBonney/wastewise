import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const createBinOffice = createAsyncThunk(
  "bin/office",
  async (officeData) => {
    const response = await axios.post("/api/bins", officeData);
    return response.data;
  }
);

export const fetchBinOffices = createAsyncThunk("bins/fetchAll", async () => {
  const response = await axios.get("/api/bins/get-office");
  return response.data;
});

export const updateBinOffice = createAsyncThunk(
  "bins/update",
  async ({ id, ...fields }) => {
    const response = await axios.put(`/api/bins/update-office/${id}`, fields);
    return response.data;
  }
);

export const deleteBinOffice = createAsyncThunk("request/delete", async (id) => {
  await axios.delete(`/api/bins/delete-office/${id}`);
  return id;
});

// Initial State
const initialState = {
  items: [],
  status: "idle",
  error: null,
};

// Slice Definition
const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Requests
      .addCase(fetchBinOffices.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBinOffices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBinOffices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update Request
      .addCase(updateBinOffice.fulfilled, (state, action) => {
        const idx = state.items.findIndex((r) => r._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      // Delete Request
      .addCase(deleteBinOffice.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r._id !== action.payload);
      });
  },
});

export default requestSlice.reducer;
