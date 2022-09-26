import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { placeOrder } from "./order";

const initialState = {
  status: "idle",
  error: null as any,
  carts: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchCart.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.carts = action.payload.data.getCartForUser;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(ChangeQuantity.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(ChangeQuantity.fulfilled, (state: any, action: any) => {
        state.status = "succedded";
        state.carts[action.payload.index].quantity =
          action.payload.quantity.data.changeQuantityInCart.quantity;
      })
      .addCase(ChangeQuantity.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.carts = {};
      });
  },
});

//export const { ChangeQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export const addToCart = createAsyncThunk(
  "cart/add",
  async (cartInput: any, {}) => {
    const requestBody = {
      query: `
              mutation addToCart($productId: String!, $creatorId: String!){
                addToCart(cartInput:{Creator: $creatorId, Product: $productId}) {     
                      product{
                        name
                      }
                  }
              }
              `,
      variables: {
        productId: cartInput.productId,
        creatorId: cartInput.creatorId,
      },
    };
    const response = await axios.post(
      "http://localhost:8082/graphql",
      requestBody,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const fetchCart = createAsyncThunk("Cart", async (userId: string) => {
  const requestBody = {
    query: `
      query {
        getCartForUser(userId: "${userId}"){
          product{
            name,
            _id,
            price,
            description,
            images
          },
          creator{
            firstname,
            lastname,
            _id,
            email
          },
          quantity
        }
      }  
    `,
  };

  const response = await axios.post(
    "http://localhost:8082/graphql",
    requestBody,
    {
      withCredentials: true,
    }
  );

  return response.data;
});

type changeQuantity = {
  product: string;
  user: string;
  quantity: number;
  index: number;
};

export const ChangeQuantity = createAsyncThunk(
  "ChangeQuantity",
  async (arg: changeQuantity) => {
    const requestBody = {
      query: `
                mutation changeQuantityInCart($userId: String!, $productId: String!, $quantity: Int!){
                  changeQuantityInCart(changeCartQuantityInput:{User: $userId, Product: $productId, Quantity: $quantity}) {     
                        quantity
                    }
                }
                `,
      variables: {
        productId: arg.product,
        userId: arg.user,
        quantity: arg.quantity,
      },
    };

    const response = await axios.post(
      "http://localhost:8082/graphql",
      requestBody,
      {
        withCredentials: true,
      }
    );

    return { quantity: response.data, index: arg.index };
  }
);
