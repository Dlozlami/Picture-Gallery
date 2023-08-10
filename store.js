import { configureStore } from "@reduxjs/toolkit";
import databaseReducer from "./features/databaseSlice";
import cameraReducer from "./features/cameraSlice";

export const store = configureStore({
  reducer: {
    databases: databaseReducer,
    camera: cameraReducer,
  },
});
