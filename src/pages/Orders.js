import React, { useContext, useEffect, useState } from "react";
import {
  useNavigate,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import OrderDetails from "../components/OrderDetails";
import OrderItem from "../components/OrderItem";
import AuthenticationContext from "../context/Authentication/AuthenticationContext";
import OrdersContext from "../context/Orders/OrdersContext";

const Orders = () => {
  //

  const location = useLocation();

  const { authenticated, authenticating } = useContext(AuthenticationContext);
  const { getOrders, orders, loading } = useContext(OrdersContext);

  const renderOrders = () => {
    if (!orders.length) return "No orders";

    console.log(loading);

    return orders.map((order) => {
      return <OrderItem order={order} key={order.UUID} />;
    });
  };

  useEffect(() => {
    const _getOrders = async () => {
      await getOrders();
    };
    _getOrders();
  }, [location.pathname]);
  if (authenticating) return "Checking authentication state";

  if (!authenticated) return <Navigate to="/sign-up" />;

  if (loading) return "Loading...";

  return (
    <section className="h-100 w-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100 w-100">
          <div className="col-10 w-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Orders</h3>
            </div>
            {renderOrders()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
