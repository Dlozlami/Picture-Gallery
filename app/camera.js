import { Camera, CameraType, FlashMode } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import Button from "../src/components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import StoreToDB from "../src/components/storeToDB";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";

export default function CameraScreen() {
  const navigation = useNavigation();
  const [place, setPlace] = useState(null);
  const [location, setLocation] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [picture, setPicture] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();
      setCameraPermission(cameraStatus.granted);
      setLocationPermission(locationStatus.granted);

      if (locationPermission === false) {
        console.log("Permission to access location was denied");
        return;
      }

      if (cameraPermission === false) {
        <Text>Permission to access the camera was denied</Text>;
        return;
      }
      const locale = await Location.getCurrentPositionAsync({});
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const locale = await Location.getCurrentPositionAsync({});
        setLocation(locale);
        //console.log(locale);
        const data = await cameraRef.current.takePictureAsync();
        setImageURL(data.uri);
        //console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (imageURL) {
      try {
        let residential = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setPlace(residential);
        console.log("Place: ", place);
        const base64Data = await FileSystem.readAsStringAsync(imageURL, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setPicture(base64Data);
        //console.log(base64Data);

        alert("Picture saved 😃.");
        setImageURL(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.capture}>
        {!imageURL ? (
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
              onPress={() => setImageURL(null)}
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
