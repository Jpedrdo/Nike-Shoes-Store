import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Cart } from "../screens";
import { colors, fonts, sizes } from "../theme";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export const AppRoutes = () => {
  const cartState = useSelector((state) => state.cart.cartProducts);
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "SHOE SELECTOR",
          headerTintColor: colors.lightGray,
          headerTitleAlign: "left",
          headerTitleStyle: fonts.navTitle,
          headerRight: () => (
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => {
                cartState.length && navigation.navigate("Cart");
              }}
            >
              <Entypo
                style={cartState.length ? styles.cartIcon : {}}
                name="shopping-cart"
                size={24}
                color="black"
              />
              {!cartState.length ? (
                <></>
              ) : (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cartState.reduce((sum, { amount }) => sum + amount, 0)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: "",
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Text
              style={styles.textCart}
              onPress={() => {
                navigation.navigate("Cart");
              }}
            >
              CART
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    marginRight: sizes.padding,
    display: "flex",
    flexDirection: "row",
  },
  cartIcon: {
    position: "relative",
    left: 10,
  },
  badge: {
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    width: 22,
    height: 22,
    position: "relative",
    top: 8,
  },
  badgeText: {
    color: "#FFFFFF",
  },
  backArrow: {
    marginLeft: 20,
  },
  textCart: {
    color: colors.lightGray,
    ...fonts.navTitle,
    marginRight: sizes.padding,
  },
});
