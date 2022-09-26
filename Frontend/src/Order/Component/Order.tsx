import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../Store/reducer/order";

let Order = () => {
  type State = {
    Order: any;
  };

  const dispatch = useDispatch();
  const orders = useSelector((state: State) => state.Order.orders);
  React.useEffect(() => {
    dispatch<any>(fetchOrders());
  }, []);

  if (orders && orders.length > 0) {
    return (
      <ul>
        {orders.map((item1: any) => {
          return (
            <li key={item1.date}>
              Order Status: {item1.status}
              {item1.products.map((item2: any) => {
                return <div key={item2.product._id}>{item2.product.name}</div>;
              })}
            </li>
          );
        })}
      </ul>
    );
  } else {
    return <></>;
  }
};

export default Order;
