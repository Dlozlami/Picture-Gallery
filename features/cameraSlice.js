import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";

// Utility function to get current location and set it in the state
export const getCurrentLocation = createAsyncThunk(
  "camera/getCurrentLocation",
  async (_, { dispatch }) => {
    try {
      const locale = await Location.getCurrentPositionAsync({});
      dispatch(setCurrentLocation(locale));
      let residential = await Location.reverseGeocodeAsync({
        latitude: locale.coords.latitude,
        longitude: locale.coords.longitude,
      });
      dispatch(setCurrentStreetAddress(residential));
    } catch (error) {
      console.log(error);
    }
  }
);

// Thunk to request camera and location permissions
export const requestPermissions = createAsyncThunk(
  "camera/requestPermissions",
  async (_, { dispatch }) => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    const locationStatus = await Location.requestForegroundPermissionsAsync();
    if (locationStatus.granted) {
      await dispatch(getCurrentLocation());
    }

    return { cameraStatus, locationStatus };
  }
);

export const capturePhoto = createAsyncThunk(
  "camera/capturePhoto",
  async (cameraRef, { dispatch }) => {
    try {
      const data = await cameraRef.current.takePictureAsync();
      dispatch(setImageURL(data.uri));
      console.log("Photo data: ", data);
    } catch (e) {
      console.log(e);
    }
  }
);

export const savePhoto = createAsyncThunk(
  "camera/savePhoto",
  async (_, { dispatch }) => {
    try {
      const base64Data = await FileSystem.readAsStringAsync(imageURL, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setPicture(base64Data);
      //console.log(base64Data.split(":")[0]);

      alert("Picture saved 😃.");
      setImageURL(null);
    } catch (e) {
      console.log(e);
    }
  }
);

const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    cameraPermission: null,
    locationPermission: null,
    imageURL: null,
    imageBase64: null,
    currentLocation: null,
    currentStreetAddress: null,
  },
  reducers: {
    setCameraPermission: (state, action) => {
      state.cameraPermission = action.payload;
    },
    setLocationPermission: (state, action) => {
      state.locationPermission = action.payload;
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setCurrentStreetAddress: (state, action) => {
      state.currentStreetAddress = action.payload;
    },

    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestPermissions.fulfilled, (state, action) => {
      state.cameraPermission = action.payload.cameraStatus.granted;
      state.locationPermission = action.payload.locationStatus.granted;
    });
  },
});

export const {
  setCameraPermission,
  setLocationPermission,
  setCurrentLocation,
  setCurrentStreetAddress,
  setImageURL,
} = cameraSlice.actions;
export default cameraSlice.reducer;
