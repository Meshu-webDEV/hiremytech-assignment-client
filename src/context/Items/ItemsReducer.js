import { INITIAL_ITEMS_LOAD, ITEMS_LOADING, SET_ITEM } from "../types";

export default (state, action) => {
  switch (action.type) {
    case INITIAL_ITEMS_LOAD:
      return {
        ...state,
        items: action.payload,
      };
    case SET_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
