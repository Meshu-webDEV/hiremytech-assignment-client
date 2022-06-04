import React, { useContext } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Kids from "./pages/Kids";
import All from "./pages/All";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";

// State
import ItemsState from "./context/Items/ItemsState";
import SystemContext from "./context/System/SystemContext";
import Other from "./pages/Other";
import Item from "./pages/Item";
import CartState from "./context/Cart/CartState";
import CartContext from "./context/Cart/CartContext";
import Signup from "./pages/Signup";
import AuthenticationContext from "./context/Authentication/AuthenticationContext";
import Signin from "./pages/Signin";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrdersState from "./context/Orders/OrdersState";
import MyListedItems from "./pages/MyListedItems";
import Order from "./pages/Order";

const App = () => {
  const { categories } = useContext(SystemContext);
  const { authenticated, signout } = useContext(AuthenticationContext);
  const { cart } = useContext(CartContext);
  const location = useLocation();

  const handleSignout = () => {
    signout();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link
            to="/categories/all"
            className="navbar-brand text-info fw-bold ms-2"
            aria-current="page"
          >
            XYZ
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse text-xs mx-4"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/categories/all/?c=0" className="dropdown-item">
                      All
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {categories?.length ? (
                    <>
                      {categories.map((category) => {
                        return (
                          <li key={category._id}>
                            <Link
                              to={`/categories/${category.name}/?c=${category._id}`}
                              className="dropdown-item text-capitalize"
                            >
                              {category.name}
                            </Link>
                          </li>
                        );
                      })}
                    </>
                  ) : (
                    "Loading categories.."
                  )}
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right align-items-center">
              <div className="mx-2">
                <Link to="/cart" className="position-relative text-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: "25px" }}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span
                    style={{ filter: "brightness(0.97)" }}
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light shadow-sm  text-info"
                  >
                    {cart?.total ? cart?.total : 0}
                  </span>
                </Link>
              </div>

              <div className=" mx-3">
                <Link to="/dashboard" className="text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      width: "25px",
                    }}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              {authenticated && (
                <div className="mx-1">
                  <div
                    onClick={handleSignout}
                    type="button"
                    className="text-secondary fw-semibold"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "20px" }}
                      className="mx-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container justify-content-center d-flex">
        <ItemsState>
          <OrdersState>
            <Routes>
              <Route path="/" element={<Other />} />
              <Route
                path="/categories/all"
                element={
                  <All location={location.pathname.split("/categories")[1]} />
                }
              />
              <Route path="/categories/men" element={<Men />} />
              <Route path="/categories/women" element={<Women />} />
              <Route path="/categories/kids" element={<Kids />} />
              <Route path="/categories/other" element={<Other />} />
              <Route path="/item/:item" element={<Item />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/items" element={<MyListedItems />} />
              <Route path="/dashboard/orders/by-id/:uuid" element={<Order />} />
              <Route path="/dashboard/orders" element={<Orders />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/sign-in" element={<Signin />} />
            </Routes>
          </OrdersState>
        </ItemsState>
      </div>
    </>
  );
};

export default App;
