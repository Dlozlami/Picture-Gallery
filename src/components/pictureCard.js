import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function PictureCard({ photo }) {
  const [openModal, setOpenModal] = useState(false);
  //console.log("This is a picture card", photo.url);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setOpenModal(true)}
      >
        <ImageBackground source={photo.url} resizeMode="cover">
          <View style={styles.info}>
            <Ionicons name="ios-location-sharp" size={24} color="white" />
            <Text style={styles.locationText}>{photo.location}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <Modal visible={openModal} style={{}}>
        <View style={styles.containerModal}>
          <View
            style={{ ...styles.infoModal, justifyContent: "space-between" }}
          >
            <Ionicons name="image-outline" size={24} color="white" />
            <TouchableOpacity onPress={() => setOpenModal(false)}>
              <Ionicons name="close-circle-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.img}>
            <Image
              source={photo.url}
              resizeMode="cover"
              style={{ width: "100%", height: 230 }}
            />
          </View>

          <View style={styles.infoModal}>
            <Ionicons name="ios-location-sharp" size={24} color="white" />
            <Text style={styles.locationTextModal}>{photo.location}</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 150,
    margin: 5,
  },
  info: {
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    flexDirection: "row",

    marginTop: 75,
  },
  locationText: {
    color: "white",
    fontSize: 16,
    fontStyle: "italic",
  },

  containerModal: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  infoModal: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    flexDirection: "row",
  },
  locationTextModal: {
    color: "white",
    fontSize: 16,
    fontStyle: "italic",
  },

  img: {},
});
