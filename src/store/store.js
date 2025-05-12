import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import requestReducer from "../slice/requestBinSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    request: requestReducer,
  },
});
