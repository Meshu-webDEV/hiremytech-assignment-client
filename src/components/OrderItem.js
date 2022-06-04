import isEmpty from "lodash.isempty";
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";

const OrderItem = ({ order, loading }) => {
  if (isEmpty(order)) return "...";
  if (loading) return "Loading...";

  return (
    <Link
      to={`/dashboard/orders/by-id/${order.UUID}`}
      className="card rounded-3 mb-4"
    >
      <div className="card-body px-1 py-0">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-1 col-xl-1">
            <img
              src={order.items[0].item.image}
              className="img-fluid rounded-3"
              alt="Cotton T-shirt"
            />
          </div>
          <div className="col-md-3 col-lg-4 col-xl-4 d-flex align-middle align-items-center align-content-center">
            <div className="fw-light text-muted text-nowrap text-2xs">
              {order.UUID}
            </div>
          </div>
          <div className="col-md-3 col-lg-1 col-xl-2 text-2xs d-flex text-nowrap">
            {formatDate(order.createdAt)}
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h6 className="mb-0 text-nowrap">${order.price}</h6>
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <a href="#!" className="text-danger">
              <i className="fas fa-trash fa-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
