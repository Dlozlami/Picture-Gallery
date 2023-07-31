import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import SQLite from "react-native-sqlite-storage";
import * as FileSystem from "expo-file-system";

export default function StoreToDB({ imgURL, locale }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const convertImageToBase64 = async () => {
      try {
        const base64Data = await FileSystem.readAsStringAsync(imgURL, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setImage(base64Data);
        console.log(base64Data);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    };

    const address = async () => {
      let residential = await Location.reverseGeocodeAsync({
        latitude: locale.coords.latitude,
        longitude: locale.coords.longitude,
      });
      setPlace(residential);
      console.log(residential);
    };
  }, [image, place]);

  return <View>{place}</View>;
}

const styles = StyleSheet.create({});
