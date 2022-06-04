// Context
import { ITEMS_LOADING } from "../types";
import ItemsContext from "./ItemsContext";
import ItemsReducer from "./ItemsReducer";

// Utils
import { backendAPI } from "../../lib/backend";
import { useEffect, useReducer } from "react";
import { INITIAL_ITEMS_LOAD, SET_ITEM } from "../types";
import { useNavigate } from "react-router-dom";

const ItemsState = (props) => {
  const initialState = {
    loading: true,
    myItems: [],
    items: [],
    item: {},
    categories: [],
  };

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(ItemsReducer, initialState);

  const getItems = (category_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: ITEMS_LOADING,
          payload: true,
        });
        const { data } = await backendAPI.get(
          `/items${category_id ? `/by-category/${category_id}` : "/"}`
        );

        dispatch({
          type: INITIAL_ITEMS_LOAD,
          payload: data.items,
        });

        return resolve();
      } catch (error) {
        reject(error);
      } finally {
        dispatch({
          type: ITEMS_LOADING,
          payload: false,
        });
      }
    });
  };

  const getMyItems = () => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: ITEMS_LOADING,
          payload: true,
        });
        const { data } = await backendAPI.get(`/items`);

        dispatch({
          type: INITIAL_ITEMS_LOAD,
          payload: data.items,
        });

        return resolve();
      } catch (error) {
        reject(error);
      } finally {
        dispatch({
          type: ITEMS_LOADING,
          payload: false,
        });
      }
    });
  };

  const getItem = (item_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: ITEMS_LOADING,
          payload: true,
        });
        const { data } = await backendAPI.get(`/items/${item_id}`);

        console.log(data.item);

        dispatch({
          type: SET_ITEM,
          payload: data.item,
        });

        return resolve();
      } catch (error) {
        reject(error);
      } finally {
        dispatch({
          type: ITEMS_LOADING,
          payload: false,
        });
      }
    });
  };

  const newItem = (item) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: ITEMS_LOADING,
          payload: true,
        });
        const { data } = await backendAPI.post(`/items`, item);

        navigate("/dashboard/items");

        return resolve();
      } catch (error) {
        reject(error);
      } finally {
        dispatch({
          type: ITEMS_LOADING,
          payload: false,
        });
      }
    });
  };

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

  return (
    <ItemsContext.Provider
      value={{
        items: state.items,
        myItems: state.myItems,
        item: state.item,
        categories: state.categories,
        loading: state.loading,
        getItems,
        getMyItems,
        newItem,
        getItem,
        getCategories,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsState;
