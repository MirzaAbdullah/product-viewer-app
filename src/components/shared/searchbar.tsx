import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { View } from "./Themed";

import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React from "react";

interface Props {
  placeholder: string;
  searchBy: string;
  onChangeSearchBy: (event: any) => void;
  handleClearSearchFilter: (event: any) => void;
  handleSearchFilter: (event: any) => void;
}

export const SearchBar: React.FC<Props> = ({
  placeholder,
  searchBy,
  onChangeSearchBy,
  handleClearSearchFilter,
  handleSearchFilter,
}: Props) => {
  return (
    <View style={styles.searchView}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSearchBy}
          value={searchBy}
          placeholder={placeholder}
          keyboardType="default"
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity
          disabled={searchBy === ""}
          onPress={handleClearSearchFilter}
        >
          <FontAwesome5
            style={styles.clearIcon}
            name="times-circle"
            size={20}
            color="#9f9f9f"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={searchBy === ""}
        onPress={handleSearchFilter}
        style={{ marginRight: 10 }}
      >
        <View style={styles.button}>
          <AntDesign
            name="search1"
            size={24}
            color={searchBy !== "" ? "white" : "#cbcbcb"}
            style={styles.buttonIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  clearIcon: {
    padding: 2,
    marginRight: 5,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
    color: "#424242",
  },
  searchView: {
    flex: 1,
    flexDirection: "row",
    height: "10.5%",
    width: "97%",
    position: "absolute",
    marginTop: 5,
    marginLeft: 5,
  },
  tableView: {
    flex: 1,
    marginTop: 75,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    color: "black",
    height: 40,
    borderRadius: 5,
    marginTop: 12,
  },
  buttonIcon: {
    padding: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
