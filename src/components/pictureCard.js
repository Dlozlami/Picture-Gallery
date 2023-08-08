import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PictureCard({ photo }) {
  //console.log("This is a picture card", photo.url);
  let img = photo.url;
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={photo.url}
          resizeMode="cover"
          style={styles.img}
        >
          <View style={styles.info}>
            <Ionicons name="ios-location-sharp" size={24} color="white" />
            <Text style={styles.locationText}>{photo.location}</Text>
          </View>
        </ImageBackground>
      </View>
      <Modal visible={false}>
        <View></View>
        <View>
          <Image></Image>
        </View>
        <View></View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flex: 1,
    width: 150,
  },
  info: {
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flexDirection: "row",

    marginTop: 10,
  },
  locationText: {
    color: "white",
    fontSize: 16,
    fontStyle: "italic",
  },

  img: {},
});
