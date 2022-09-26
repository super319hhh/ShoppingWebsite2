import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsList } from "../../Store/reducer/product";
import { addToCart } from "../../Store/reducer/cart";
import { fetchProductsBySearch } from "../../Store/reducer/product";

const Product = (__props: any) => {
  type State = {
    Login: {
      user: any;
    };
    Products: any;
  };

  const dispatch = useDispatch(),
    userId = useSelector((state: State) => state.Login.user._id),
    handleAddToCart = (productId: string) => {
      dispatch<any>(addToCart({ productId: productId, creatorId: userId }));
    };

  React.useEffect(() => {
    dispatch<any>(fetchProductsList());
  }, []);

  let productList = useSelector((state: State) => state.Products.products);
  const search = useRef(null);
  const handleClickSearch = () => {
    dispatch<any>(fetchProductsBySearch(search.current.value));
  };

  return (
    <>
      <input placeholder="Please seach products by name" ref={search}></input>
      <button onClick={handleClickSearch}>Search</button>
      <div className="productList">
        {productList.map((item: any, index: number) => {
          return (
            <li key={item._id}>
              {item.name} - {item.price} - {item.description}
              <button onClick={handleAddToCart.bind(this, item._id)}>
                add to cart
              </button>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default Product;
