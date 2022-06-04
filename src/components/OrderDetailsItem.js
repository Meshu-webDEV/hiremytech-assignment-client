import React, { useContext, useEffect } from "react";
import OrdersContext from "../context/Orders/OrdersContext";

const OrderDetailsItem = ({ item, quantity }) => {
  const { resetOrderState } = useContext(OrdersContext);

  useEffect(() => {
    return () => resetOrderState();
  }, []);

  return (
    <div className="card rounded-3 mb-4 w-100">
      <div className="card-body py-1 px-2 w-100">
        <div className="row d-flex justify-content-between align-items-center w-100">
          <div className="col-md-2 col-lg-1 col-xl-1">
            <img
              src={item.image}
              className="img-fluid rounded-3"
              alt="Cotton T-shirt"
            />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3">
            <div className="lead fw-normal text-muted fs-6">{item.name}</div>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-muted text-xs mx-1">Quantity: </div>
              <div className="mx-1">{quantity}</div>
            </div>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h5 className="mb-0">${item.price * quantity}</h5>
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <a href="#!" className="text-danger">
              <i className="fas fa-trash fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsItem;
