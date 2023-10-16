import { AppRegistry, Platform } from "react-native";
import expo from "./app.json";
import App from "./App";

if (module.hot) {
  module.hot.accept();
}

AppRegistry.registerComponent(expo.slug, () => App);
if (Platform.OS === "web") {
  AppRegistry.runApplication(expo.slug, {
    initialProps: {},
    rootTag: document.getElementById("app-root"),
  });
}
