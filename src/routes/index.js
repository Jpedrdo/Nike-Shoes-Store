import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { useFonts } from "expo-font";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Routes = () => {
  const [loaded] = useFonts({
    "CarmenSans-Regular": require("../theme/fonts/CarmenSans-Regular.otf"),
    "CarmenSans-SemiBold": require("../theme/fonts/CarmenSans-SemiBold.otf"),
    "CarmenSans-Thin": require("../theme/fonts/CarmenSans-Thin.otf"),
    "CocoGothic-Bold": require("../theme/fonts/CocoGothic-Bold.ttf"),
    CocoGothic: require("../theme/fonts/CocoGothic.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default Routes;
