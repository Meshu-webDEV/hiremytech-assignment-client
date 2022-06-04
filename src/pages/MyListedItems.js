import React, { useContext, useEffect, useState } from "react";
import {
  useNavigate,
  Navigate,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import OrderDetails from "../components/OrderDetails";
import OrderItem from "../components/OrderItem";
import AuthenticationContext from "../context/Authentication/AuthenticationContext";
import ItemsContext from "../context/Items/ItemsContext";
import OrdersContext from "../context/Orders/OrdersContext";

const MyListedItems = () => {
  //

  const location = useLocation();
  const { uuid } = useParams();

  const [UUID, setUUID] = useState(null);
  const { authenticated, authenticating } = useContext(AuthenticationContext);
  const { getMyItems, items } = useContext(ItemsContext);

  const renderItems = () => {
    return items.map((item) => {
      return (
        <Link
          to={`/item/${item.name.replace(/\s+/g, "-")}?i=${item._id}`}
          key={item._id}
          className="card rounded-3 mb-4 w-100"
        >
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
                <div className="lead fw-normal text-muted fs-6">
                  {item.name}
                </div>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-1 d-flex">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="text-muted text-xs mx-1">Quantity: </div>
                  <div className="mx-1">{item.quantity}</div>
                </div>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 className="mb-0">${item.price}</h6>
              </div>
              <div className="col-md-1 col-lg-2 col-xl-2 text-end">
                <h6 className="mb-0">
                  ${parseFloat(item.price * item.quantity).toFixed(2)}
                </h6>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  };

  useEffect(() => {
    getMyItems();
  }, []);

  if (authenticating) return "Checking authentication state";

  if (!authenticated) return <Navigate to="/sign-up" />;

  // if (loading) return "Loading...";

  return (
    <section className="h-100 w-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100 w-100">
          <div className="col-10 w-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">My items</h3>
            </div>
            {renderItems()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyListedItems;
