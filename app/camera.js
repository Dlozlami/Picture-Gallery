import { Camera, CameraType, FlashMode } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import Button from "../src/components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import StoreToDB from "../src/components/storeToDB";

export default function CameraScreen() {
  const [place, setPlace] = useState(null);
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [flash, setFlash] = useState(FlashMode.off);
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

        //let options = makeEXIF(locale);
        //console.log(locale);
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        //console.log(data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        let residential = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setPlace(residential);

        alert("Picture saved 😃.");
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const makeEXIF = (locale) => {
    return {
      exif: true,
      additionalExif: {
        GPSLatitude: locale.coords.latitude,
        GPSLongitude: locale.coords.longitude,
        GPSAltitude: locale.coords.altitude,
        GPSDateTime: locale.timestamp,
      },
    };
  };

  return (
    <View style={styles.container}>
      {!image ? (
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
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            />
            <Button
              icon={"flash"}
              color={flash === FlashMode.off ? "gray" : "white"}
              onPress={() =>
                setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off)
              }
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <SafeAreaView>
        {image ? (
          <View style={styles.moreOptions}>
            <Button
              title={"Re-take"}
              icon={"retweet"}
              onPress={() => setImage(null)}
            />
            <Button title={"Save"} icon={"check"} onPress={saveImage} />
          </View>
        ) : (
          <View style={styles.moreOptions}>
            <TouchableOpacity>
              <MaterialIcons name="photo-library" size={24} color="black" />
            </TouchableOpacity>
            <Button icon={"camera"} onPress={takePicture} size={48} />
            <TouchableOpacity>
              <MaterialIcons name="photo-library" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {image && <StoreToDB imgURL={image} locale={location} />}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
    paddingVertical: 20,
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
});
