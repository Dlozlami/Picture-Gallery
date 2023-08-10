import { StyleSheet, ActivityIndicator, View, Modal } from "react-native";
import React from "react";

export default function Preloader(size, color, loading) {
  return (
    <Modal visible={false} style={styles.container}>
      <ActivityIndicator size={size ? size : "large"} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
});
