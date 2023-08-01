import { configureStore } from "@reduxjs/toolkit";
import databaseReducer from "./features/databaseSlice";

export const store = configureStore({
  reducer: {
    databases: databaseReducer,
  },
});
