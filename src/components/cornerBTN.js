import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function CornerBTN({
  name = "plus",
  size = 28,
  bgColor = "black",
  textColor = "white",
  onPressFunction,
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.circle, backgroundColor: bgColor }}
      onPress={onPressFunction}
    >
      <FontAwesome5 name={name} size={size} color={textColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 7,
    margin: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 9999,
    padding: 10,
    borderRadius: 100,
  },
});
