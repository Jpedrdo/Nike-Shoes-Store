import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { cartProducts } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { colors, fonts, sizes } from "../theme";
import CartList from "../components/CartList";

const Cart = () => {
  const dispatch = useDispatch();
  const dispatchCart = (value) => dispatch(cartProducts(value));
  const cartState = useSelector((state) => state.cart.cartProducts);

  const handleDelete = (shoe) => {
    const newRecently = cartState.filter(({ id }) => id !== shoe.id);
    dispatchCart(newRecently);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewFlatCart}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartState}
          renderItem={({ item }) => (
            <CartList shoe={item} handleDelete={handleDelete} />
          )}
          ItemSeparatorComponent={(_) => <View style={styles.divider} />}
          keyExtractor={({ id }) => id}
        />
      </View>
      <TouchableOpacity style={styles.checkout}>
        <Text style={styles.checkoutText}>{`CheckOut $${cartState.reduce(
          (sum, { price, amount }) =>
            sum + Number(price.replace(/[^\d]/g, "") * amount),
          0
        )}`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: "#0000001f",
    borderBottomWidth: 2,
    marginBottom: 16,
    marginTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  viewFlatCart: {
    flex: 1,
    marginTop: sizes.radius,
  },
  checkout: {
    display: "flex",
    width: "100%",
    backgroundColor: colors.lightGray,
    padding: 20,
  },
  checkoutText: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    ...fonts.body3,
  },
});
