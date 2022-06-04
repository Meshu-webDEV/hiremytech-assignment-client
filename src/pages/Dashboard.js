import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import AuthenticationContext from "../context/Authentication/AuthenticationContext";
import ItemsContext from "../context/Items/ItemsContext";
import SystemContext from "../context/System/SystemContext";
import { formatDate } from "../lib/utils";

const Dashboard = () => {
  const { authenticated, authenticating, user } = useContext(
    AuthenticationContext
  );
  const { categories } = useContext(SystemContext);
  const { newItem, getItems } = useContext(ItemsContext);

  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 1,
    category: categories.filter((category) => category.name === "men")[0]?._id,
  });

  const handleFormChange = (e) => {
    console.log(`${e.target.name}`);
    setForm((form) => {
      return {
        ...form,
        [`${e.target.name}`]: e.target.value,
      };
    });
  };

  const handleAddItem = async () => {
    console.log("adding");
    console.log(form);
    try {
      const item = await newItem(form);
      console.log(item);
    } catch (error) {
      console.log(error);
    }
  };

  if (!authenticated) return <Navigate to="/sign-up" />;

  if (authenticating) return "Checking authentication state...";
  return (
    <div className="container h-100 py-4 my-4">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="d-flex">
            <div className="me-4 pe-2">
              <div className="text-muted text-xs">Username</div>
              <div className="fw-normal">{user.username}</div>
            </div>
            <div className="me-4">
              <div className="text-muted text-xs">Email</div>
              <div className="fw-normal">{user.email}</div>
            </div>
            <div className="me-4">
              <div className="text-muted text-xs">Joined</div>
              <div className="fw-normal">
                {formatDate(user.createdAt, false)}
              </div>
            </div>
          </div>

          <Link
            to="/dashboard/orders/"
            className="btn btn-info d-flex justify-content-center mt-4 mb-2 text-white"
          >
            My orders
          </Link>
          {user?.authority?.authority === 2 && (
            <Link
              to="/dashboard/items"
              className="btn btn-warning d-flex justify-content-center mb-4 text-black"
            >
              My items
            </Link>
          )}
        </div>

        {user?.authority?.authority !== 3 && (
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body py-3 px-5">
                <h5 className="text-uppercase text-center mb-5">
                  Add a new item
                </h5>

                <form>
                  <div className="form-outline mb-2">
                    <label
                      className="form-label text-xs"
                      htmlFor="form3Example1cg"
                    >
                      name
                    </label>
                    <input
                      onChange={handleFormChange}
                      value={form.name}
                      name="name"
                      type="text"
                      id="form3Example1cg"
                      className="form-control form-control-md"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label
                      className="form-label text-xs"
                      htmlFor="form3Example3cg"
                    >
                      Description
                    </label>
                    <input
                      onChange={handleFormChange}
                      value={form.description}
                      name="description"
                      type="text"
                      id="form3Example3cg"
                      className="form-control form-control-md"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label
                      className="form-label text-xs"
                      htmlFor="form3Example4cg"
                    >
                      Price
                    </label>
                    <input
                      onChange={handleFormChange}
                      value={form.price}
                      name="price"
                      type="number"
                      id="form3Example4cg"
                      className="form-control form-control-md"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label
                      className="form-label text-xs"
                      htmlFor="form3Example4cg"
                    >
                      Quantity
                    </label>
                    <input
                      onChange={handleFormChange}
                      value={form.quantity}
                      name="quantity"
                      type="number"
                      id="form3Example4cg"
                      className="form-control form-control-md"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label
                      className="form-label text-xs"
                      htmlFor="form3Example4cdg"
                    >
                      Select category
                    </label>
                    {categories?.length ? (
                      <select
                        onChange={handleFormChange}
                        name="category"
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm"
                      >
                        {categories?.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      "Loading..."
                    )}
                  </div>

                  <div className="mb-4">
                    {errors.length
                      ? errors.map((error, i) => (
                          <div key={i} className="text-2xs text-danger my-2">
                            {error}
                          </div>
                        ))
                      : ""}
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      onClick={handleAddItem}
                      type="button"
                      className="btn btn-info btn-block btn text-white text-xs"
                    >
                      Add new item{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: "20px" }}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
