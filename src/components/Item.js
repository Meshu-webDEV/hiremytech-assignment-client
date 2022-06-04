import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/Cart/CartContext";

const Item = ({ item, quantity = 0 }) => {
  //

  console.log("Inside item component :", item.name);
  console.log("passed quantity:", quantity);

  const { addToCart, removeFromCart } = useContext(CartContext);
  const [stockQuantity, setStockQuantity] = useState(item.quantity);
  const [purchaseQuantity, setPurchaseQuantity] = useState(quantity);
  const [added, setAdded] = useState(quantity > 0 ? true : false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setAdded(true);
    setPurchaseQuantity((p) => p + 1);
    return handleCommitAddToCart();
  };

  const handleCommitAddToCart = () => {
    addToCart({ item, purchaseQuantity });
  };

  const handleCommitRemoveToCart = () => {
    removeFromCart({ item, purchaseQuantity });
  };

  const handleQuantityIncrement = () => {
    if (purchaseQuantity === stockQuantity) return;

    setPurchaseQuantity((p) => p + 1);
    return handleCommitAddToCart();
  };
  const handleQuantityDecrement = () => {
    if (purchaseQuantity - 1 < 1) {
      handleCommitRemoveToCart();
      setPurchaseQuantity(0);
      return setAdded(false);
    }

    setPurchaseQuantity((p) => p - 1);
    return handleCommitRemoveToCart();
  };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3 shadow-sm my-3 mx-4">
      <div id="product-1" className="single-product">
        <img className="img-fluid rounded-3" src={item.image} alt="" />
        <div className="part-2 py-2">
          <h2 className="product-title fs-5 fw-semibold">
            <Link to={`/item/${item.name.replace(/\s+/g, "-")}?i=${item._id}`}>
              {item.name}
            </Link>
          </h2>
          <h4 className="product-price">${item.price}</h4>
          <h3 className="fs-6 fw-light">{item.description}</h3>
          <div
            className={`fw-light text-xs py-1 ${
              item.quantity === 0 ? "text-danger" : "text-success"
            }`}
          >
            {item.quantity} in stock!
          </div>
          <Link
            to={`/categories/${item.category.name}/?c=${item.category._id}`}
            className="badge text-bg-secondary fw-light text-capitalize"
          >
            {item.category.name}
          </Link>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            {added ? (
              <div className="d-flex justify-content-center align-items-center">
                <button
                  style={{ fontSize: "14px" }}
                  onClick={handleQuantityDecrement}
                  className="badge mx-1 rounded-pill bg-dark"
                >
                  -
                </button>
                <span className="fs-5 mx-3">{purchaseQuantity}</span>
                <button
                  style={{ fontSize: "14px" }}
                  onClick={handleQuantityIncrement}
                  className="badge mx-1 rounded-pill bg-dark"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                style={{ fontSize: "14px" }}
                className={`btn btn-dark`}
                disabled={item.quantity === 0}
              >
                Add to cart{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "15px" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </button>
            )}

            <Link
              to={`/store/${item.seller._id}`}
              className="px-1 fw-light text-xs text-decoration-underline text-capitalize"
            >
              {item.seller.username}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
