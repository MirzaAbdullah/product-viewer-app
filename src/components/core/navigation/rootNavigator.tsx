import React from "react";

import { RootStackParamList } from "../../../types";
import { BottomTabNavigator } from "./bottomTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useColorScheme from "../../../hooks/useColorScheme";

import ModalScreen from "../../../screens/ModalScreen";
import NotFoundScreen from "../../../screens/NotFoundScreen";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerStyle: { backgroundColor: "papayawhip" },
        }}
      >
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{
            headerShown: true,
            title: "Products Management",
          }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
