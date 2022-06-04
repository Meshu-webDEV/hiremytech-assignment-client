// Context
import {} from "../types";
import SystemContext from "./SystemContext";
import SystemReducer from "./SystemReducer";

// Utils
import { backendAPI } from "../../lib/backend";
import { useEffect, useReducer } from "react";
import { SET_SYS_CATEGORIES } from "../types";

const SystemState = (props) => {
  const initialState = {
    categories: [],
  };

  const [state, dispatch] = useReducer(SystemReducer, initialState);

  const getCategories = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await backendAPI.get("/categories");
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    const _getInitial = async () => {
      try {
        const { categories } = await getCategories();
        dispatch({
          type: SET_SYS_CATEGORIES,
          payload: categories,
        });
      } catch (error) {
        console.log(error);
      }
    };

    _getInitial();
  }, []);

  return (
    <SystemContext.Provider
      value={{
        categories: state.categories,
      }}
    >
      {props.children}
    </SystemContext.Provider>
  );
};

export default SystemState;
