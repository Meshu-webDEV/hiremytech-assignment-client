import React from "react";

const CartItem = ({ item, quantity }) => {
  return (
    <div className="card rounded-3 mb-4">
      <div className="card-body p-4">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-2 col-xl-2">
            <img
              src={item.image}
              className="img-fluid rounded-3"
              alt="Cotton T-shirt"
            />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3">
            <p className="lead fw-normal mb-2">{item.name}</p>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
            <div className="d-flex justify-content-center align-items-center">
              <button
                style={{ fontSize: "14px" }}
                className="badge mx-1 rounded-pill bg-info border-0 text-black "
              >
                -
              </button>
              <span className="fs-5 mx-3">{quantity}</span>
              <button
                style={{ fontSize: "14px" }}
                className="badge mx-1 rounded-pill bg-info border-0 text-black "
              >
                +
              </button>
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

export default CartItem;
