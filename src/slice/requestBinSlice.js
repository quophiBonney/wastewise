import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const requestBin = createAsyncThunk(
  "request/new",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/bins/request/add-request",
        requestData
      );
      return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        return rejectWithValue({ message: err.response.data.error });
      } else {
        return rejectWithValue({ message: err.message || "Unknown error" });
      }
    }
  }
);

export const fetchBinRequests = createAsyncThunk(
  "request/fetchAll",
  async () => {
    const response = await axios.get("/api/bins/request/all-requests");
    return response.data;
  }
);

export const updateBinRequest = createAsyncThunk(
  "request/update",
  async ({ id, ...fields }) => {
    const response = await axios.put(
      `/api/bins/request/update-request/${id}`,
      fields
    );
    return response.data;
  }
);

export const deleteBinRequest = createAsyncThunk(
  "request/delete",
  async (id) => {
    await axios.delete(`/api/bins/request/delete-request/${id}`);
    return id;
  }
);

// Initial State
const initialState = {
  items: [],
  status: "idle",
  error: null,
  message: null,
};

// Slice Definition
const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestBin.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(requestBin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(requestBin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error
        state.message = null;
      })
      // Fetch Requests
      .addCase(fetchBinRequests.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBinRequests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBinRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Update Request
      .addCase(updateBinRequest.fulfilled, (state, action) => {
        const idx = state.items.findIndex((r) => r._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      // Delete Request
      .addCase(deleteBinRequest.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r._id !== action.payload);
      });
  },
});

export default requestSlice.reducer;
