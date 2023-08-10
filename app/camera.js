import { Camera, CameraType, FlashMode } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";

import Button from "../src/components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  requestPermissions,
  capturePhoto,
  setImageURL,
} from "../features/cameraSlice";
import { useDispatch, useSelector } from "react-redux";
import * as SQLite from "expo-sqlite";

export default function CameraScreen() {
  const db = SQLite.openDatabase("picgallery.db");
  const {
    cameraPermission,
    locationPermission,
    currentStreetAddress,
    imageURL,
  } = useSelector((state) => state.camera);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(requestPermissions());
    if (locationPermission) {
      console.log("Permission to access location was denied");
      return;
    }

    if (!cameraPermission) {
      console.log("Permission to access camera was denied");
      return;
    }
  }, []);

  //isFocused ? console.log("On camera") : console.log("off air");
  const takePicture = async () => {
    if (cameraRef) {
      dispatch(capturePhoto(cameraRef));
    }
  };

  const saveImage = async () => {
    if (imageURL) {
      try {
        const base64Data = await FileSystem.readAsStringAsync(imageURL, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setPicture(base64Data);
        //console.log(base64Data.split(":")[0]);

        alert("Picture saved 😃.");
        dispatch(setImageURL(null));
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      {console.log("This is my location: ", currentStreetAddress)}

      <View style={styles.capture}>
        {!imageURL ? (
          isFocused ? (
            <Camera
              style={styles.camera}
              type={type}
              flashMode={flash}
              ref={cameraRef}
            >
              <View style={styles.moreOptions}>
                <Button
                  icon={"retweet"}
                  onPress={() =>
                    setType(
                      type === CameraType.back
                        ? CameraType.front
                        : CameraType.back
                    )
                  }
                />
                <Button
                  icon={"flash"}
                  color={
                    flash === Camera.Constants.FlashMode.off ? "gray" : "white"
                  }
                  onPress={() =>
                    setFlash(
                      flash === Camera.Constants.FlashMode.off
                        ? Camera.Constants.FlashMode.on
                        : Camera.Constants.FlashMode.off
                    )
                  }
                />
              </View>
            </Camera>
          ) : null
        ) : (
          <Image source={{ uri: imageURL }} style={styles.camera} />
        )}
      </View>
      <View style={styles.controls}>
        {imageURL ? (
          <View style={styles.moreOptions}>
            <Button
              title={"Re-take"}
              icon={"retweet"}
              onPress={() => dispatch(setImageURL(null))}
            />
            <Button title={"Save"} icon={"check"} onPress={saveImage} />
          </View>
        ) : (
          <View style={styles.moreOptions}>
            <TouchableOpacity>
              <Text>N/A</Text>
            </TouchableOpacity>
            <Button icon={"camera"} onPress={takePicture} size={48} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("gallery");
              }}
            >
              <MaterialIcons name="photo-library" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  moreOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
  },
  capture: {
    height: "90%",
  },
  controls: {
    height: "10%",
  },
});
