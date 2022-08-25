import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { colors, fonts, sizes } from "../theme";
import { cartProducts } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { trendingData, recentlyData } from "../data";
import { TrendingShoes, RecentlyShoes, ModalSize } from "../components";

const Home = () => {
  const dispatch = useDispatch();
  const dispatchCart = (value) => dispatch(cartProducts(value));
  const cartState = useSelector((state) => state.cart.cartProducts);
  const recentlyFlatList = useRef();
  const [trending] = useState(trendingData);
  const [recently, setRecently] = useState(recentlyData);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleModal = () => setOpenModal(!openModal);

  const handleSelect = (shoe, fromRecently) => {
    setSelectedItem(shoe);
    handleModal();

    if (fromRecently) {
      const newRecently = recently.filter(({ id }) => id !== shoe.id);
      setRecently([shoe, ...newRecently]);
      recentlyFlatList.current.scrollToOffset({ animated: false, offset: 0 });
    }
  };

  const handleCart = (shoe) => {
    const newData = new Array(shoe, ...cartState);
    const newProducts = newData.map((s, index) => {
      if (s.name === shoe.name && !!index) {
        return { ...s, amount: s.amount + 1 };
      } else return s;
    });
    dispatchCart([
      ...new Map(newProducts.map((p) => [(({ name }) => name)(p), p])).values(),
    ]);
    handleModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.trendingTitle}>TRENDING</Text>
      <View style={styles.viewTrending}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={trending}
          renderItem={({ item }) => (
            <TrendingShoes shoe={item} handleSelect={handleSelect} />
          )}
          keyExtractor={({ id }) => id}
        />
      </View>
      <View style={styles.viewRecent}>
        <View style={styles.viewRecentText}>
          <Image
            source={require("../imgs/recently.png")}
            resizeMode="contain"
            style={styles.recentImg}
          />
        </View>
        <View style={styles.viewFlatRecent}>
          <FlatList
            ref={recentlyFlatList}
            showsVerticalScrollIndicator={false}
            data={recently}
            renderItem={({ item }) => (
              <RecentlyShoes shoe={item} handleSelect={handleSelect} />
            )}
            keyExtractor={({ id }) => id}
          />
        </View>
      </View>
      {openModal && (
        <ModalSize
          openModal={openModal}
          selectedItem={selectedItem}
          handleModal={handleModal}
          handleCart={handleCart}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  trendingTitle: {
    marginTop: sizes.radius,
    marginHorizontal: sizes.padding,
    ...fonts.largeTitleBold,
  },
  viewTrending: {
    height: 260,
    marginTop: sizes.radius,
  },
  viewRecent: {
    flex: 1,
    flexDirection: "row",
    marginTop: sizes.padding,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  viewRecentText: {
    width: 70,
    marginLeft: sizes.base,
  },
  viewFlatRecent: {
    flex: 1,
    paddingBottom: sizes.padding,
  },
  recentImg: {
    width: "100%",
    height: "100%",
  },
});
