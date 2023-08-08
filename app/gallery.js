import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import CornerBTN from "../src/components/cornerBTN";
import { pictures } from "../pic/pictures";
import PictureCard from "../src/components/pictureCard";
import TestComp from "../src/components/testComp";

export default function Gallery() {
  const navigation = useNavigation();
  //console.log(pictures);

  return (
    <View style={styles.container}>
      <CornerBTN
        name="camera"
        onPressFunction={() => {
          navigation.navigate("camera");
        }}
      />
      <FlatList
        data={pictures}
        keyExtractor={(photo) => photo.id}
        renderItem={({ item: photo }) => <PictureCard photo={photo} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});
