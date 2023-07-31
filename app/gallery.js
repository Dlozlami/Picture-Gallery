import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function PicGalleryInfo() {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const albumName = "picGallery";
        const album = await MediaLibrary.getAlbumAsync(albumName);

        if (album) {
          const { assets } = await MediaLibrary.getAssetsAsync({
            album: album,
          });
          setPictures(assets);
        } else {
          setPictures([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPictures();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PicGallery Information</Text>
      <Text style={styles.info}>
        Number of Pictures in PicGallery: {pictures.length}
      </Text>
      <FlatList
        data={pictures}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.pictureContainer}>
            <Image source={{ uri: item.uri }} style={styles.picture} />
            <Text style={styles.pictureName}>{item.filename}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  pictureContainer: {
    marginBottom: 20,
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  pictureName: {
    marginTop: 5,
    textAlign: "center",
  },
});
