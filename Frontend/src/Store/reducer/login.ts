import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadLoginState = () => {
  const serializedState = localStorage.getItem("state");
  if (serializedState) {
    return JSON.parse(serializedState).Login;
  } else {
    return {
      status: "idle",
      error: null,
      user: {},
    };
  }
};

const initialState = loadLoginState();

const loginSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(logout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {};
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

//export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default loginSlice.reducer;

//export const selectAllPosts = (state) => state.posts;

//export const selectPostById = (state, postId) =>
//state.posts.find((post) => post.id === postId);

export const login = createAsyncThunk(
  "posts/login",
  async (userData: any, {}) => {
    const requestBody = {
      username: userData.email,
      password: userData.password,
    };
    const response = await axios.post(
      "http://localhost:8082/login",
      requestBody,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const logout = createAsyncThunk("posts/logout", async () => {
  const response = await axios.post(
    "http://localhost:8082/logout",
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
});
