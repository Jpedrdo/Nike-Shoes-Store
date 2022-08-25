export const cartProducts = (value) => ({
  type: "ACTION_CART",
  payload: value,
});

export const cartClean = () => ({
  type: "CART_CLEAR",
  payload: "",
});
