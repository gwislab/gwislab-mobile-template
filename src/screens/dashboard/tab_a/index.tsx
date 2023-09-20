import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "components";
import { SharedStyles } from "configs";

const TabA = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.titleContainer}
    >
      <View style={styles.container2}>
        <Text text={"from tab A"} />
      </View>
    </ScrollView>
  );
};

export default TabA;

const styles = StyleSheet.create({
  titleContainer: {
    ...SharedStyles.rowBetweenStart,
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  container2: {
    width: 100,
    marginRight: 10,
  },
});
