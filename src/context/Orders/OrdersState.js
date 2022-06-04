// Context
import OrdersContext from "./OrdersContext";
import OrdersReducer from "./OrdersReducer";

// Utils
import { backendAPI } from "../../lib/backend";
import { useEffect, useReducer } from "react";
import {
  INITIAL_ORDERS_LOAD,
  SET_ORDER,
  ORDERS_LOADING,
  RESET_ORDER_STATE,
} from "../types";

const OrdersState = (props) => {
  const initialState = {
    loading: true,
    orders: [],
    order: {},
  };

  const [state, dispatch] = useReducer(OrdersReducer, initialState);

  const getOrder = (uuid) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: ORDERS_LOADING,
          payload: true,
        });
        const { data } = await backendAPI.get(`/orders/${uuid}`);

        dispatch({
          type: SET_ORDER,
          payload: data.order,
        });

        return resolve(data.order);
      } catch (error) {
        reject(error);
      } finally {
        dispatch({
          type: ORDERS_LOADING,
          payload: false,
        });
      }
    });
  };

  const getOrders = (uuid) => {
    return new Promise(async (resolve, reject) => {
      try {
        dispatch({
          type: ORDERS_LOADING,
          payload: true,
        });
        const { data } = await backendAPI.get(`/orders/me`);

        dispatch({
          type: INITIAL_ORDERS_LOAD,
          payload: data.orders,
        });

        return resolve();
      } catch (error) {
        reject(error);
      } finally {
        dispatch({
          type: ORDERS_LOADING,
          payload: false,
        });
      }
    });
  };

  const setLoadingState = (state) => {
    dispatch({
      type: ORDERS_LOADING,
      payload: state,
    });
  };

  const resetOrderState = () => {
    dispatch({
      type: RESET_ORDER_STATE,
      payload: {},
    });
  };

  return (
    <OrdersContext.Provider
      value={{
        orders: state.orders,
        order: state.order,
        loading: state.loading,
        getOrder,
        getOrders,
        resetOrderState,
        setLoadingState,
      }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
};

export default OrdersState;
