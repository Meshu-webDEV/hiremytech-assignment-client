import React, { useContext, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Item from "../components/Item";
import CartContext from "../context/Cart/CartContext";
import ItemsContext from "../context/Items/ItemsContext";

const Women = () => {
  const { items, getItems, loading } = useContext(ItemsContext);
  const { cart } = useContext(CartContext);

  const [searchParams, _] = useSearchParams();
  const category_id = useMemo(() => searchParams.get("c"));

  const renderItems = () => {
    if (loading) return "Loading..";

    if (!items?.length) return "No items";

    return items.map((item) => {
      const { items } = cart;
      const items_ids = Object.keys(items);

      // console.log(items_ids);
      // console.log(item._id);

      const isAdded = Boolean(items_ids.filter((id) => id === item._id).length);

      if (isAdded)
        return (
          <Item
            key={item._id}
            item={item}
            quantity={items[`${item._id}`].quantity}
          />
        );

      return <Item key={item._id} item={item} />;
    });
  };

  useEffect(() => {
    const _getInitial = async () => {
      try {
        await getItems(category_id);
      } catch (error) {
        console.log(error);
      }
    };

    _getInitial();
  }, []);

  return (
    <section className="section-products">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-lg-6">
            <div className="header">
              <h3 className="text-black">CATEGORY</h3>
              <h2>Women</h2>
            </div>
          </div>
        </div>
        <div className={`row justify-content-center`}>{renderItems()}</div>
      </div>
    </section>
  );
};

export default Women;
