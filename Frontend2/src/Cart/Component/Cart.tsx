import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, ChangeQuantity } from "../../Store/reducer/cart";
import { placeOrder } from "../../Store/reducer/order";

let Cart = () => {
  interface IState {
    Login: any;
    Cart: any;
  }

  const dispatch = useDispatch();
  const userId = useSelector((state: IState) => state.Login.user._id);
  const cart = useSelector((state: IState) => state.Cart.carts);
  const handleQuantityChange = (
    product: any,
    user: any,
    quantity: any,
    index: any
  ) => {
    dispatch<any>(
      ChangeQuantity({
        product: product,
        user: user,
        quantity: quantity,
        index,
      })
    );
  };
  const handlePlaceOrder = () => {
    let orderInput = cart.map((item: any) => {
      return {
        creator: item.creator._id,
        product: item.product._id,
        quantity: item.quantity,
      };
    });

    dispatch<any>(placeOrder(orderInput));
  };
  React.useEffect(() => {
    dispatch<any>(fetchCart(userId));
  }, []);

  return cart && cart.length > 0 ? (
    <div>
      <ul>
        {cart.map((item1: any, index: number) => {
          return (
            <li>
              {item1.product.name}
              <div>Quantity</div>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {item1.quantity}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "other"].map((item2) => {
                    return (
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleQuantityChange(
                              item1.product._id,
                              item1.creator._id,
                              item2,
                              index
                            )
                          }
                        >
                          {item2}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
      <div>
        SubTotal:
        {cart.reduce((total: number, item: any) => {
          total += item.product.price * item.quantity;
          return total;
        }, 0)}
      </div>
      <div>
        <button onClick={handlePlaceOrder}>Place order</button>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Cart;
