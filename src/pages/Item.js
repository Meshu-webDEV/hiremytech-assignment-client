import isEmpty from "lodash.isempty";
import React, { useContext, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ItemsContext from "../context/Items/ItemsContext";

const Item = () => {
  //
  const { item, getItem, loading } = useContext(ItemsContext);

  const [searchParams, _] = useSearchParams();
  const item_id = useMemo(() => searchParams.get("i"));

  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log(item);
  };

  useEffect(() => {
    const _getItem = async () => {
      try {
        await getItem(item_id);
      } catch (error) {
        console.log(error);
      }
    };

    _getItem();
  }, [item_id]);

  if (loading)
    return <div className="d-flex justify-content-center py-4">loading...</div>;

  if (isEmpty(item))
    return (
      <div className="d-flex justify-content-center py-4">No item found!</div>
    );

  return (
    <div className="d-flex justify-content-center py-4">
      <div id="product-1" className="single-product">
        <img
          className="product-img"
          style={{ width: "400px" }}
          src={item.image}
          alt=""
        />
        <div className="part-2 pt-2">
          <h2 className="product-title fs-5 fw-semibold">
            <Link to={`/item/${item.name.replace(/\s+/g, "-")}?i=${item._id}`}>
              {item.name}
            </Link>
          </h2>
          <h4 className="product-price">${item.price}</h4>
          <h3 className="fs-6 fw-light">{item.description}</h3>
          <Link
            to={`/categories/${
              item.category.name === "other" ? "all" : item.category.name
            }/?c=${item.category._id}`}
            className="badge text-bg-secondary fw-light text-capitalize"
          >
            {item.category.name}
          </Link>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <button style={{ fontSize: "14px" }} className="btn btn-dark">
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
