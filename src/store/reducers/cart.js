const initialState = {
  cartProducts: [],
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ACTION_CART":
      return {
        ...state,
        cartProducts: [...action.payload],
      };
    case "CART_CLEAR":
      return {
        ...state,
        cartProducts: [],
      };
    default:
      return state;
  }
};
