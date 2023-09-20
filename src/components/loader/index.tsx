import { Colors } from "configs";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default Loader;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: Colors.overlayWhite,
    justifyContent: "center",
    alignItems: "center",
    zIndex: Number.MAX_SAFE_INTEGER,
  },
});
