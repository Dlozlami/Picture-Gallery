import { configureStore } from "@reduxjs/toolkit";
import cameraReducer from "./features/cameraSlice";

export const store = configureStore({
  reducer: {
    camera: cameraReducer,
  },
});
