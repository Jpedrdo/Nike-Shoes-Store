import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import { colors, fonts, sizes } from "../theme";
import { Svg, Polygon } from "react-native-svg";

const TrendingShoes = ({ shoe, handleSelect }) => {
  const { id, type, bgColor, name, price, img, index } = shoe;
  const trendingStyle = index ? {} : { marginLeft: sizes.padding };

  return (
    <TouchableOpacity
      key={id}
      style={{
        ...styles.mainTouch,
        ...trendingStyle,
      }}
      onPress={() => handleSelect(shoe)}
    >
      <Text style={styles.type}>{type}</Text>
      <View
        style={{
          ...styles.bgView,
          backgroundColor: bgColor,
          ...styles.trendingShadow,
        }}
      >
        <View style={styles.nameView}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
      <View style={styles.svg}>
        <Svg height="100%" width="100%">
          <Polygon points="0,0 160,0 160,80" fill="white" />
        </Svg>
      </View>
      <Image source={img} resizeMode="cover" style={styles.img} />
    </TouchableOpacity>
  );
};

export default TrendingShoes;

const styles = StyleSheet.create({
  mainTouch: {
    height: 240,
    width: 180,
    justifyContent: "center",
    marginHorizontal: sizes.base,
  },
  type: {
    color: colors.gray,
    ...fonts.h5,
  },
  bgView: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: sizes.base,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginRight: sizes.padding,
    paddingLeft: sizes.radius,
    paddingRight: sizes.padding,
    paddingBottom: sizes.radius,
  },
  nameView: {
    height: "35%",
    justifyContent: "space-between",
  },
  name: {
    color: colors.white,
    ...fonts.body4,
  },
  price: {
    color: colors.white,
    ...fonts.h3,
  },
  svg: {
    position: "absolute",
    top: 27,
    right: 0,
    width: "95%",
    height: "100%",
  },
  img: {
    position: "absolute",
    top: 50,
    right: 0,
    width: "98%",
    height: 80,
    transform: [{ rotate: "-15deg" }],
  },
});
