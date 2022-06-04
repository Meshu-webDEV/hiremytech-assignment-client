import {
  INITIAL_ORDERS_LOAD,
  ORDERS_LOADING,
  SET_ORDER,
  RESET_ORDER_STATE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case INITIAL_ORDERS_LOAD:
      return {
        ...state,
        orders: action.payload,
      };
    case ORDERS_LOADING:
      console.log("here?", action.payload);
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case RESET_ORDER_STATE:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};
