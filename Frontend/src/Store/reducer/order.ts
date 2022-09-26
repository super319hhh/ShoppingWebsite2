import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { createFactory } from "react";

const initialState = {
  status: "idle",
  error: null as any,
  orders: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(placeOrder.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload.data.fetchOrders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default orderSlice.reducer;

type CartInput = {
  creator: string;
  product: string;
  quantity: number;
};

export const placeOrder = createAsyncThunk(
  "order/place",
  async (cartInput: [CartInput], {}) => {
    const requestBody = {
      query: `
      mutation placeOrder($cart: [OrderInput!]){
        placeOrder(cart: $cart) {     
              products{
                price
              }
          }
      }
      `,
      variables: {
        cart: cartInput,
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

export const fetchOrders = createAsyncThunk("order/fetch", async () => {
  const requestBody = {
    query: `
      query{
        fetchOrders{
          date,
          products{
            quantity,
            product{
              name,
              price,
              images,
              _id
            },
            price
          },
          status
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
