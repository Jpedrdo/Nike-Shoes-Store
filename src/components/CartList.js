import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import { colors, fonts } from "../theme";
import { Entypo } from "@expo/vector-icons";

const CartList = ({ shoe, handleDelete }) => {
  const { id, name, price, amount, img } = shoe;

  return (
    <View key={id} style={styles.mainTouch}>
      <View style={styles.viewRow}>
        <View style={styles.viewImg}>
          <Image source={img} resizeMode="contain" style={styles.img} />
        </View>
        <View style={styles.nameView}>
          <Text style={styles.name}>
            {name} {amount > 1 ? `(${amount}x)` : ""}
          </Text>
          <Text style={styles.price}>
            ${Number(price.replace(/[^\d]/g, "")) * amount}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.viewTrash}
        onPress={() => handleDelete(shoe)}
      >
        <Entypo name="trash" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CartList;

const styles = StyleSheet.create({
  mainTouch: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  viewRow: {
    flex: 1,
    flexDirection: "row",
  },
  viewImg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewTrash: {
    width: 35,
    marginLeft: 20,
    marginRight: 10,
  },
  img: {
    width: 90,
    height: 60,
  },
  nameView: {
    flex: 1.6,
    justifyContent: "center",
  },
  name: {
    color: colors.gray,
    ...fonts.body4,
  },
  price: {
    ...fonts.h4,
  },
});
