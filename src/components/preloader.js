import { StyleSheet, ActivityIndicator, View, Modal } from "react-native";
import React from "react";

export default function Preloader(size, color, loading) {
  return (
    <Modal visible={loading} style={styles.container} transparent>
      <ActivityIndicator size={size ? size : "large"} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
