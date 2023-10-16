import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Text, View } from "../components/shared/Themed";
import useColorScheme from "../hooks/useColorScheme";

interface Props {
  navigation: any;
  route: Record<string, any>;
}

export default function ModalScreen({ navigation }: Props) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Modal</Text>
        <View style={styles.headerIcon}>
          <TouchableOpacity
            onPressOut={() => navigation.goBack()}
            style={{
              alignSelf: "flex-end",
            }}
          >
            <FontAwesome5
              name="times-circle"
              size={20}
              color={Colors[colorScheme].text}
              style={styles.modalCloserIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.modalBody}>
        <Text style={{ textAlign: "center" }}>No Data Available</Text>
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
  },
  headerIcon: {
    flex: 1,
    marginRight: 20,
  },
  modalCloserIcon: {
    marginTop: 20,
  },
  modalBody: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 15,
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: "100%",
  },
});
