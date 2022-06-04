import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  SET_CART,
} from "./../types";

export default (state, action) => {
  if (action.type === RESET_CART) return { ...action.payload };
  const { item, purchaseQuantity } = action.payload;
  switch (action.type) {
    case ADD_TO_CART:
      console.log({ item, quantity: purchaseQuantity + 1 });
      return {
        ...state,
        cart: {
          items: {
            ...state.cart.items,
            [`${item._id}`]: { item, quantity: purchaseQuantity + 1 },
          },
          total: state.cart.total + 1,
          price: (() => {
            const currentPrice = state.cart.price;
            return parseFloat((currentPrice + item.price).toFixed(2));
          })(),
        },
      };
    case REMOVE_FROM_CART:
      const item_to_remove = state.cart.items[item._id];
      item_to_remove.quantity = item_to_remove.quantity - 1;
      console.log(item_to_remove);
      return {
        ...state,
        cart: {
          items: {
            [`${item._id}`]: item_to_remove,
            ...state.cart.items,
          },
          total: state.cart.total - 1,
          price: (() => {
            const currentPrice = state.cart.price;
            return parseFloat((currentPrice - item.price).toFixed(2));
          })(),
        },
      };
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
