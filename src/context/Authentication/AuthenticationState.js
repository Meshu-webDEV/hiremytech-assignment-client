// Context
import {} from "../types";
import AuthenticationContext from "./AuthenticationContext";
import AuthenticationReducer from "./AuthenticationReducer";

// Utils
import { backendAPI } from "../../lib/backend";
import { useEffect, useReducer } from "react";
import { SELF_AUTHENTICATE, AUTHENTICATING, SIGNUP } from "../types";

const AuthenticationState = (props) => {
  const initialState = {
    authenticating: true,
    authenticated: false,
    user: null,
  };

  const [state, dispatch] = useReducer(AuthenticationReducer, initialState);

  const selfAuthenticate = async () => {
    try {
      const { data } = await backendAPI.get("/users/me");
      dispatch({
        type: SELF_AUTHENTICATE,
        payload: {
          authenticating: false,
          authenticated: true,
          user: data,
        },
      });
    } catch (error) {
      dispatch({
        type: SELF_AUTHENTICATE,
        payload: {
          authenticating: false,
          authenticated: false,
          user: null,
        },
      });
    }
  };

  const signup = async (form) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.post("/users/signup", form);
        dispatch({
          type: SIGNUP,
          payload: {
            authenticating: false,
            authenticated: true,
            user: data.id,
          },
        });
        return resolve();
      } catch (error) {
        console.log();
        dispatch({
          type: SELF_AUTHENTICATE,
          payload: {
            authenticating: false,
            authenticated: false,
            user: null,
          },
        });
        return reject(
          error?.response?.data?.errors?.length
            ? error?.response?.data?.errors.split(".")
            : error?.response?.data?.message
        );
      }
    });
  };

  const signin = async (form) => {
    return new Promise(async (resolve, reject) => {
      try {
        delete form["confirm-password"];
        const { data } = await backendAPI.post("/users/signin", form);
        dispatch({
          type: SIGNUP,
          payload: {
            authenticating: false,
            authenticated: true,
            user: data.id,
          },
        });
        return resolve(data);
      } catch (error) {
        dispatch({
          type: SELF_AUTHENTICATE,
          payload: {
            authenticating: false,
            authenticated: false,
            user: null,
          },
        });
        return reject(
          error?.response?.data?.errors?.length
            ? error?.response?.data?.errors.split(".")
            : error?.response?.data?.message
        );
      }
    });
  };

  const signout = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await backendAPI.get("/users/signout");
        dispatch({
          type: SELF_AUTHENTICATE,
          payload: {
            authenticating: false,
            authenticated: false,
            user: null,
          },
        });
        resolve();
      } catch (error) {
        console.log("error", error);
        resolve();
      }
    });
  };

  useEffect(() => {
    selfAuthenticate();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        authenticating: state.authenticating,
        authenticated: state.authenticated,
        user: state.user,
        signup,
        signin,
        signout,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationState;
