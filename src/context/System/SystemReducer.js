import { SET_SYS_CATEGORIES } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_SYS_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};
