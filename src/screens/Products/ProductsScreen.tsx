import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";

import { View } from "../../components/shared/Themed";
import { DataTable } from "../../components/shared/DataTable";
import { useIsFocused } from "@react-navigation/native";

import { RootTabScreenProps } from "../../types";
import { SearchBar } from "../../components/shared/searchbar";
import { getAllProducts } from "../../services/productsService";
import {
  productsModal,
  productsTableHeaders,
  productsTableRowsWidth,
} from "../../modals/productsModal";
import { filterBasedOnAnyValueOnAllKeys } from "../../utils/searchInArrays";

export default function ProductsScreen({
  navigation,
}: RootTabScreenProps<"Products">) {
  const isFocused = useIsFocused();
  const [searchBy, onChangeSearchBy] = useState<string>("");
  const [localProductList, setLocalProductList] = useState<
    Array<productsModal>
  >([]);

  const { productsList } = useSelector((state: any) => state.products);

  const onRefresh = useCallback(() => {
    setLocalProductList([]);
    onChangeSearchBy("");
    getAllProducts();
  }, []);

  //load the list within the store
  useEffect(() => {
    setLocalProductList([]);
    onChangeSearchBy("");
    getAllProducts();
  }, [isFocused]);

  function handleClearSearchFilter() {
    onChangeSearchBy("");
    setLocalProductList(productsList);
  }

  function handleSearchByAnyKey() {
    setLocalProductList(
      filterBasedOnAnyValueOnAllKeys(
        productsList,
        searchBy
      ) as Array<productsModal>
    );
  }

  function handleOnRowClick(e: string | number) {
    navigation.navigate("ProductsDetails", { id: e.toString() });
  }

  useEffect(() => {
    setTimeout(() => {
      setLocalProductList(productsList);
    }, 2000);
  }, [productsList]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search by Product"
        searchBy={searchBy}
        onChangeSearchBy={onChangeSearchBy}
        handleClearSearchFilter={handleClearSearchFilter}
        handleSearchFilter={handleSearchByAnyKey}
      ></SearchBar>
      <View style={styles.tableView}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={false}
              title="Release the screen to get the refreshed products"
              onRefresh={onRefresh}
            />
          }
        >
          <ScrollView horizontal={true}>
            <DataTable
              dataKey="id"
              headers={Object.values(productsTableHeaders)}
              rows={Object.keys(productsTableHeaders)}
              data={localProductList}
              rowsWidth={Object.values(productsTableRowsWidth)}
              isIconRequired={false}
              isDataLoaded={localProductList.length > 0}
              handleOnRowClick={handleOnRowClick}
            ></DataTable>
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
}

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
