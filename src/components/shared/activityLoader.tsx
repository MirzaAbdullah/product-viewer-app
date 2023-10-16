import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const ActivityLoader: React.FC = () => {
  return (
    <View style={styles.horizontal}>
      <ActivityIndicator size="large" color="#0096FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    marginLeft: 150,
  },
});
