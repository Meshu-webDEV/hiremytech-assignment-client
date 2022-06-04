import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/Cart/CartContext";
import OrdersContext from "../context/Orders/OrdersContext";
import { formatDate } from "../lib/utils";
import OrderDetailsItem from "./OrderDetailsItem";

const OrderDetails = ({ order, loading }) => {
  const { resetCart } = useContext(CartContext);

  const renderItems = () => {
    const items = order.items;

    if (!items.length) return "...";

    return items.map(({ item, quantity }) => (
      <OrderDetailsItem key={item._id} item={item} quantity={quantity} />
    ));
  };

  useEffect(() => {
    resetCart();
  }, []);

  if (loading) return "Loading...";

  return (
    <section className="h-100 w-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">
                Order <span className="text-muted text-2xs"> {order.UUID}</span>
              </h3>
            </div>
            {renderItems()}
            <div className="card mb-4">
              <div className="card-body d-flex flex-row-reverse align-items-center px-4 mx-4">
                <h5 className="fw-medium mx-2 p-1">${order.price}</h5>
                <h5 className="fw-semibold">Total:</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
