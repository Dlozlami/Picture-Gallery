import { createSlice } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";

const initialState = {};

export const databaseSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    createTableAlbum: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const { createTableAlbum } = databaseSlice.actions;

export default databaseSlice.reducer;
