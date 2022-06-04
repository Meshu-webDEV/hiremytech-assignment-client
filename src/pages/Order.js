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

const Order = () => {
  //

  const location = useLocation();
  const { uuid } = useParams();

  const [localOrder, setLocalOrder] = useState(null);
  const [UUID, setUUID] = useState(null);
  const { authenticated, authenticating } = useContext(AuthenticationContext);
  const { getOrder, order, orders, loading, setLoadingState } =
    useContext(OrdersContext);

  const renderOrders = () => {
    if (!orders.length) return "No orders";

    console.log(loading);

    return orders.map((order) => {
      return <OrderItem order={order} key={order.UUID} />;
    });
  };

  useEffect(() => {
    setUUID(uuid);

    const _getOrder = async () => {
      const result = await getOrder(UUID);
      setLocalOrder(result);
    };
    _getOrder();
  }, [UUID, location.pathname]);

  if (authenticating) return "Checking authentication state";

  if (!authenticated) return <Navigate to="/sign-up" />;

  if (loading || !localOrder) return "Loading...";

  return <OrderDetails order={localOrder} loading={loading} />;
};

export default Order;
