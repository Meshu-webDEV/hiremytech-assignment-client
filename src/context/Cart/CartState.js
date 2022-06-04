// Context
import { RESET_CART, SET_CART } from "./../types";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";

// Utils
import { backendAPI } from "../../lib/backend";
import { useReducer } from "react";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";
import { useNavigate } from "react-router-dom";

const CartState = (props) => {
  const initialState = {
    cart: {
      total: 0,
      items: {},
      price: 0,
    },
  };

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = (item) => {
    console.log("Adding to cart");
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
  };
  const removeFromCart = (item) => {
    console.log("Removing item");
    dispatch({
      type: REMOVE_FROM_CART,
      payload: item,
    });
  };

  const checkout = async (cart) => {
    try {
      // create cart on api
      const { data } = await backendAPI.post("/carts/", cart);

      // navigate to checkout/?cart=UUID
      navigate(`/checkout/?cart=${data.result.UUID}`);

      console.log(data.result.UUID);
    } catch (error) {
      console.log(error);
    }
  };

  const pay = async (cart) => {
    try {
      // create cart on api
      const { data } = await backendAPI.post("/orders/", cart);

      // navigate to checkout/?cart=UUID
      navigate(`/dashboard/orders/${data.result.UUID}`);
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async (UUID) => {
    try {
      // create cart on api
      const { data } = await backendAPI.get(`/carts/${UUID}`);
      console.log(data.result.cart);
      dispatch({
        type: SET_CART,
        payload: data.result.cart,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetCart = () => {
    return dispatch({
      type: RESET_CART,
      payload: initialState,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        removeFromCart,
        addToCart,
        getCart,
        pay,
        resetCart,
        checkout,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
