import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks for signup, login, logout
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/signup", userData);
      return response.data;
    } catch (error) {
      const resp = error.response?.data || {};
      const message = resp.message || error.message || "Signup failed";
      const fieldErrors = resp.errors || null;
      return thunkAPI.rejectWithValue({ message, fieldErrors });
    }
  }
);

export const getDrivers = createAsyncThunk( 
  "auth/getDrivers",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/auth/drivers`);
      return response.data;
    } catch (error) {
      const resp = error.response?.data || {};
      const message = resp.message || error.message || "Failed to fetch drivers";
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
// slice/authSlice.js

export const loginUser = createAsyncThunk(
  "auth/login",                        // make sure the action type matches your slice
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      return response.data;            // should include { token, user, message }
    } catch (error) {
      // pull out a clean message from the server if it exists
      const resp = error.response?.data || {};
      const message = resp.message || "Login failed";
      // rejectWithValue so we can access `action.payload` in extraReducers
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    await axios.post("/api/logout");
    return {};
  }
);
const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.message = action.payload.message || "Signup successful!";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Signup failed";
        state.fieldErrors = action.payload?.fieldErrors || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        // back-end should return a nice message here
        state.message = action.payload.message || "Login successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = null; // we won’t toast this
        state.message = action.payload || action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.token = null;
        state.user = null;
      })
      .addCase(getDrivers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getDrivers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getDrivers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
      });
  },
});

export default authSlice.reducer;