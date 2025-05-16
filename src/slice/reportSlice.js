// src/store/reportSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1️⃣ Send / Create a report
export const sendReport = createAsyncThunk(
  "reports/send",
  async (reportData, thunkAPI) => {
    const response = await axios.post("/api/reports/add-report", reportData);
    // Expect the created report back
    return response.data;
  }
);

// 2️⃣ Fetch all reports
export const fetchReports = createAsyncThunk(
  "reports/fetchAll",
  async (_, thunkAPI) => {
    const response = await axios.get("/api/reports/all-reports");
    // Expect an array of reports
    return response.data;
  }
);

// 3️⃣ Update a report
export const updateReport = createAsyncThunk(
  "reports/update",
  async ({ id, ...fields }, thunkAPI) => {
    const response = await axios.put(`/api/reports/update-report/${id}`, fields);
    // Expect the updated report
    return response.data;
  }
);

// 4️⃣ Delete a report
export const deleteReport = createAsyncThunk(
  "reports/delete",
  async (id, thunkAPI) => {
    await axios.delete(`/api/report/delete-report/${id}`);
    // Return the id so we can remove it locally
    return id;
  }
);

const initialState = {
  items: [], // the list of reports
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // — sendReport
      .addCase(sendReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(sendReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // — fetchReports
      .addCase(fetchReports.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // — updateReport
      .addCase(updateReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        const idx = state.items.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // — deleteReport
      .addCase(deleteReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
