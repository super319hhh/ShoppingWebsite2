import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null as any,
  products: [] as any[],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder: any) {
    builder
      .addCase(fetchProductsList.pending, (state: any, action: any) => {
        state.status = "loading";
      })
      .addCase(fetchProductsList.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.products = action.payload.data.Products;
      })
      .addCase(fetchProductsList.rejected, (state: any, action: any) => {
        state.status = "failed";
      })
      .addCase(fetchProductsBySearch.pending, (state: any, action: any) => {
        state.status = "loading";
      })
      .addCase(fetchProductsBySearch.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.products = action.payload.quantity.data.findProductsByName;
      })
      .addCase(fetchProductsBySearch.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;

export const fetchProductsList = createAsyncThunk(
  "products/getProductsList",
  async () => {
    const requestBody = {
      query: `
              query{
                  Products{
                      name,
                      price,
                      description,
                      images,
                      _id
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
  }
);

export const fetchProductsBySearch = createAsyncThunk(
  "products/getProductsBySearch",
  async (arg: string) => {
    const requestBody = {
      query: `
        query findProductsByName($name: String!){
          findProductsByName(name: $name) {                  
                  name,
                  price,
                  description,
                  images,
                  _id              
            }
        }`,
      variables: {
        name: arg,
      },
    };

    const response = await axios.post(
      "http://localhost:8082/graphql",
      requestBody,
      {
        withCredentials: true,
      }
    );
    return { quantity: response.data };
  }
);
