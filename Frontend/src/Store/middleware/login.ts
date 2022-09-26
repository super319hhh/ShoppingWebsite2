import { history } from "../../index";

let loginMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === "posts/login/fulfilled") {
    history.push("/product");
  }

  if (action.type === "posts/logout/fulfilled") {
    history.push("/");
    window.location.reload();
  }

  return next(action);
};

export default loginMiddleware;
