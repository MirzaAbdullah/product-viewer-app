import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScrollView, StyleSheet } from "react-native";
import { useRoute, useIsFocused } from "@react-navigation/native";

import { Dimensions } from "react-native";
import { View } from "../../components/shared/Themed";

import { RootTabScreenProps } from "../../types";
import { Text, Card } from "react-native-paper";
import { productsModal } from "../../modals/productsModal";
import { Badge, Stack } from "@react-native-material/core";
import { ActivityLoader } from "../../components/shared/activityLoader";

export default function ProductDetailsScreen({
  navigation,
}: RootTabScreenProps<"ProductsDetails">) {
  const isFocused = useIsFocused();
  const route = useRoute();
  const productId = (route.params as any).id;
  const windowWidth = Dimensions.get("window").width;

  const { productsList } = useSelector((state: any) => state.products);
  const [productDetails, setProductDetails] = useState<productsModal>();
  const [isProductDetailsLoaded, setIsProductDetailsLoaded] =
    useState<boolean>(false);

  //load the list within the store
  useEffect(() => {
    if (isFocused) {
      setIsProductDetailsLoaded(false);
      setProductDetails(undefined);
    }

    const filteredProduct = productsList.find(
      (product: productsModal) => product.id === Number(productId)
    );

    setProductDetails(filteredProduct);
    setIsProductDetailsLoaded(true);
  }, [route, isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView horizontal={true}>
          <View style={{ minWidth: windowWidth }}>
            {isProductDetailsLoaded ? (
              <Card>
                <Card.Cover
                  style={{
                    height: 300,
                    width: windowWidth,
                  }}
                  source={
                    productDetails
                      ? { uri: productDetails.image }
                      : require("../../../assets/noImage.png")
                  }
                />
                <Card.Title
                  style={{ width: windowWidth }}
                  title={productDetails?.title}
                />
                <Card.Content style={{ width: windowWidth }}>
                  {productDetails ? (
                    <>
                      <Text variant="bodyMedium">
                        <Text style={{ fontWeight: "bold" }}>Description</Text>:{" "}
                        {productDetails?.description}
                      </Text>
                      <Text variant="bodyMedium">
                        <Text style={{ fontWeight: "bold" }}>Price</Text>: €
                        {productDetails?.price}
                      </Text>
                    </>
                  ) : (
                    <Stack fill center spacing={4} style={{ marginBottom: 50 }}>
                      <Badge label="No Data Available" color="papayawhip" />
                    </Stack>
                  )}
                </Card.Content>
              </Card>
            ) : (
              <ActivityLoader />
            )}
          </View>
        </ScrollView>
      </ScrollView>
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
