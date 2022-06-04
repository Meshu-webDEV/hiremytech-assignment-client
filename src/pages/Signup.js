import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthenticationContext from "../context/Authentication/AuthenticationContext";

const Signup = () => {
  //

  const { signup, authenticated } = useContext(AuthenticationContext);

  const [errors, setErrors] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    "confirm-password": "",
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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await signup(form);
      console.log(result);
    } catch (error) {
      setErrors([error]);
      console.log(error);
    }
  };

  if (authenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="d-flex mt-4 pt-4 d-flex w-75 align-items-center justify-content-center gradient-custom-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div className="card-body py-3 px-5">
                <h5 className="text-uppercase text-center mb-5">
                  Create an account
                </h5>

                <form>
                  <div className="form-outline mb-2">
                    <label
                      className="form-label text-xs"
                      htmlFor="form3Example1cg"
                    >
                      Username
                    </label>
                    <input
                      onChange={handleFormChange}
                      value={form.username}
                      name="username"
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
                      Email
                    </label>
                    <input
                      onChange={handleFormChange}
                      value={form.email}
                      name="email"
                      type="email"
                      id="form3Example3cg"
                      className="form-control form-control-md"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label
                      className="form-label text-xs"
                      htmlFor="form3Example4cg"
                    >
                      Password
                    </label>
                    <input
                      onChange={handleFormChange}
                      value={form.password}
                      name="password"
                      type="password"
                      id="form3Example4cg"
                      className="form-control form-control-md"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label
                      className="form-label text-xs"
                      htmlFor="form3Example4cdg"
                    >
                      Repeat your password
                    </label>
                    <input
                      onChange={handleFormChange}
                      value={form["confirm-password"]}
                      name="confirm-password"
                      type="password"
                      id="form3Example4cdg"
                      className="form-control form-control-md"
                    />
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
                      onClick={handleSignup}
                      type="button"
                      className="btn btn-info btn-block btn text-white text-xs"
                    >
                      Sign up{" "}
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

                  <p className="text-center text-muted text-2xs mt-5 mb-0">
                    Already have an account?{" "}
                    <Link to="/sign-in" href="#!" className="fw-bold text-body">
                      <span className="text-xs text-decoration-underline">
                        Sign-in here
                      </span>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
