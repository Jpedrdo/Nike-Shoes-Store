import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { colors, fonts, sizes } from "../theme";

const ModalSize = ({ openModal, selectedItem, handleModal, handleCart }) => {
  const { id, bgColor, img, name, type, price, sizes } = selectedItem;
  const [selectedSize, setSelectedSize] = useState(0);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={() => handleModal()}
    >
      <View style={styles.bluer}>
        <TouchableOpacity
          style={styles.absolute}
          onPress={() => handleModal()}
        />
        <View style={{ ...styles.mainView, backgroundColor: bgColor }}>
          <View style={styles.viewImg}>
            <Image source={img} resizeMode="contain" style={styles.img} />
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>{type}</Text>
          <Text style={styles.price}>{price}</Text>
          <View style={styles.viewSize}>
            <View>
              <Text style={styles.textSelect}>Select size</Text>
            </View>
            <View style={styles.viewRenderSizes}>
              {sizes.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    ...styles.touchSize,
                    backgroundColor:
                      sizes[index] === selectedSize ? colors.white : null,
                  }}
                  onPress={() => setSelectedSize(sizes[index])}
                >
                  <Text
                    style={{
                      ...styles.textSize,
                      color:
                        sizes[index] === selectedSize
                          ? colors.black
                          : colors.white,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {!selectedSize ? (
            <View style={styles.noButton} />
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleCart({ ...selectedItem, amount: 1 })}
            >
              <Text style={styles.addText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalSize;

const styles = StyleSheet.create({
  bluer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000080",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  mainView: {
    justifyContent: "center",
    width: "85%",
  },
  viewImg: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -sizes.padding * 2,
  },
  img: {
    width: "90%",
    height: 170,
    transform: [{ rotate: "-15deg" }],
  },
  name: {
    marginTop: sizes.padding,
    marginHorizontal: sizes.padding,
    color: colors.white,
    ...fonts.body2,
  },
  type: {
    marginTop: sizes.base / 2,
    marginHorizontal: sizes.padding,
    color: colors.white,
    ...fonts.body3,
  },
  price: {
    marginTop: sizes.radius,
    marginHorizontal: sizes.padding,
    color: colors.white,
    ...fonts.h1,
  },
  viewSize: {
    flexDirection: "row",
    marginTop: sizes.radius,
    marginHorizontal: sizes.padding,
  },
  textSelect: {
    color: colors.white,
    ...fonts.body3,
  },
  viewRenderSizes: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    marginLeft: sizes.radius,
  },
  addButton: {
    width: "100%",
    height: 70,
    marginTop: sizes.base,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  addText: {
    color: colors.white,
    ...fonts.largeTitleBold,
  },
  touchSize: {
    width: 35,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 5,
  },
  textSize: {
    ...fonts.body4,
  },
  noButton: {
    height: 20,
  },
});
