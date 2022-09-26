import React from "react";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Login from "./Login/index";
import Product from "./Product/index";
import Cart from "./Cart/index";
import Order from "./Order/index";
import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./Store/reducer/login";
import ProductsReducer from "./Store/reducer/product";
import OrderReducer from "./Store/reducer/order";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import loginThunk from "./Store/middleware/login";
import CartReducer from "./Store/reducer/cart";
import { createBrowserHistory } from "history";
import { logout } from "./Store/reducer/login";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const store = configureStore({
  reducer: {
    Login: LoginReducer,
    Products: ProductsReducer,
    Cart: CartReducer,
    Order: OrderReducer,
  },
  middleware: [thunk, loginThunk],
});

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const handleLogout = () => {
  store.dispatch<any>(logout());
};

store.subscribe(() => {
  saveState(store.getState());
});

const login = store.getState().Login.user._id ? true : false;

const root = ReactDOM.createRoot(document.getElementById("root"));

export const history = createBrowserHistory({ window });

const handleLogin = () => {
  history.push("/");
};

root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Navbar bg="light" expand="lg">
        <LinkContainer to={login ? "/" : "/product"}>
          <Navbar.Brand>Menu</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/product">
              <Nav.Link>Product</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/order">
              <Nav.Link>Order</Nav.Link>
            </LinkContainer>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="product" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="order" element={<Order />} />
      </Routes>
    </HistoryRouter>
  </Provider>
);
