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
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

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

      <Modal visible={openModal} transparent={true}>
        <View style={styles.containerModal}>
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={{ ...styles.infoModal, justifyContent: "space-between" }}
          >
            <Ionicons name="image-outline" size={24} color="white" />

            <Ionicons name="close-circle-outline" size={24} color="white" />
          </TouchableOpacity>

          <Image
            source={photo.url}
            resizeMode="contain"
            style={{ width: "100%", height: 550 }}
          />

          <View style={styles.infoModal}>
            <MaterialIcons name="my-location" size={20} color="white" />
            <Text> </Text>
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
    borderRadius: 10,
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
    justifyContent: "center",
    backgroundColor: "rgba(70,16,247, 0.5)",
    padding: 5,
  },
  infoModal: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  locationTextModal: {
    color: "white",
    fontSize: 20,
    fontStyle: "italic",
  },

  img: {},
});
