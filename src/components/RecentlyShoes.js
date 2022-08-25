import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import { colors, fonts, sizes } from "../theme";

const TrendingShoes = ({ shoe, handleSelect }) => {
  const { id, name, price, img } = shoe;

  return (
    <TouchableOpacity
      key={id}
      style={styles.mainTouch}
      onPress={() => handleSelect(shoe, true)}
    >
      <View style={styles.viewImg}>
        <Image source={img} resizeMode="contain" style={styles.img} />
      </View>
      <View style={styles.nameView}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TrendingShoes;

const styles = StyleSheet.create({
  mainTouch: {
    flex: 1,
    flexDirection: "row",
  },
  viewImg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 130,
    height: 100,
  },
  nameView: {
    flex: 1.5,
    marginLeft: sizes.radius,
    justifyContent: "center",
  },
  name: {
    color: colors.gray,
    ...fonts.body3,
  },
  price: {
    ...fonts.h3,
  },
});
