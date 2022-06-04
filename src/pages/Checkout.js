import isEmpty from "lodash.isempty";
import React, { useContext, useEffect, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartContext from "../context/Cart/CartContext";

const Checkout = () => {
  //

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cart, getCart, pay } = useContext(CartContext);

  const UUID = useMemo(() => searchParams.get("cart"));

  const handlePay = () => {
    pay(cart);
  };

  useEffect(() => {
    if (!isEmpty(cart.items)) return;

    if (isEmpty(cart.items) && !UUID) return navigate("/categories/all");

    // get cart
    getCart(UUID);
  }, []);

  return (
    <section className="h-100 w-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">
                Checkout{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "30px" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </h3>
            </div>
            <div className="card mb-4">
              <div className="card-body d-flex flex-row-reverse align-items-center px-4 mx-4">
                <h5 className="fw-medium mx-2 p-1">${cart.price}</h5>
                <h5 className="fw-semibold">Total:</h5>
              </div>
            </div>
            <form>
              <div className="form-outline mb-2">
                <label className="form-label text-xs" htmlFor="form3Example1cg">
                  Name on card
                </label>
                <input
                  name="name"
                  type="text"
                  id="form3Example1cg"
                  className="form-control form-control-md"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label text-xs" htmlFor="form3Example3cg">
                  Card number
                </label>
                <input
                  name="number"
                  type="text"
                  id="form3Example3cg"
                  className="form-control form-control-md"
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label text-xs" htmlFor="form3Example4cg">
                  Expiration date
                </label>
                <input
                  name="password"
                  type="text"
                  id="form3Example4cg"
                  className="form-control form-control-md"
                />
              </div>

              <div className="form-outline mb-4">
                <label
                  className="form-label text-xs"
                  htmlFor="form3Example4cdg"
                >
                  CVV
                </label>
                <input
                  name="confirm-password"
                  type="password"
                  id="form3Example4cdg"
                  className="form-control form-control-md"
                />
              </div>
            </form>
            <div className="card">
              <div className="card-body d-flex flex-row-reverse">
                <button
                  onClick={handlePay}
                  type="button"
                  className="btn btn-info fw-medium btn-block btn"
                >
                  Confirm & Pay{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      width: "20px",
                    }}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
