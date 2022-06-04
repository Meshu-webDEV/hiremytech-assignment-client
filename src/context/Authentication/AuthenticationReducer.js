import { SELF_AUTHENTICATE, AUTHENTICATING, SIGNUP, SIGNIN } from "../types";

export default (state, action) => {
  switch (action.type) {
    case AUTHENTICATING:
      return {
        ...state,
        authenticating: action.payload,
      };
    case SELF_AUTHENTICATE:
      return {
        ...state,
        ...action.payload,
      };
    case SIGNUP:
      return {
        ...state,
        ...action.payload,
      };
    case SIGNIN:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
