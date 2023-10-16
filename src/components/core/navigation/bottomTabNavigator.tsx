import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";
import ProductsScreen from "../../../screens/Products/ProductsScreen";
import ProductDetailsScreen from "../../../screens/ProductsDetails/ProductDetailsScreen";
import { RootTabParamList, RootTabScreenProps } from "../../../types";

import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Products"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Products"
        component={ProductsScreen}
        options={({ navigation }: RootTabScreenProps<"Products">) => ({
          title: "Products",
          headerTitle: "Products List",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Octicons
              name="checklist"
              size={30}
              color={color}
              style={{ marginBottom: -3 }}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="ProductsDetails"
        component={ProductDetailsScreen}
        initialParams={{ id: "0" }}
        options={({ navigation }: RootTabScreenProps<"ProductsDetails">) => ({
          title: "Product Details",
          headerTitle: "Product Details",
          tabBarIcon: ({ color }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProductsDetails", { id: "0" });
              }}
            >
              <Octicons
                name="tasklist"
                size={30}
                color={color}
                style={{ marginBottom: -3 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
};
