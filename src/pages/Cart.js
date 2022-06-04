import React, { useContext } from "react";
import CartItem from "../components/CartItem";
import CartContext from "../context/Cart/CartContext";

const Cart = () => {
  const { cart, checkout } = useContext(CartContext);

  const handleCheckOut = (e) => {
    e.preventDefault();
    checkout(cart);
  };

  const renderCartItems = () => {
    const items = Object.values(cart.items);

    return items.map(({ item, quantity }) => (
      <CartItem key={item._id} item={item} quantity={quantity} />
    ));
  };

  return (
    <section className="h-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
            </div>
            {renderCartItems()}
            <div className="card mb-4">
              <div className="card-body d-flex flex-row-reverse align-items-center px-4 mx-4">
                <h5 className="fw-medium mx-2 p-1">${cart.price}</h5>
                <h5 className="fw-semibold">Total:</h5>
              </div>
            </div>
            <div className="card">
              <div className="card-body d-flex flex-row-reverse">
                <button
                  onClick={handleCheckOut}
                  type="button"
                  className="btn btn-info fw-medium btn-block btn"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  className="btn btn-outline-info fw-medium btn-block btn mx-4"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
