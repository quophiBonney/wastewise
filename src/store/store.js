import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import requestReducer from "../slice/requestBinSlice";
import binPickupReducer from "../slice/binPickupsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    request: requestReducer,
    drivers: requestReducer,
    pickups: binPickupReducer,
  },
});
