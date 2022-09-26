import React from "react";
import { login } from "../../Store/reducer/login";
import { useDispatch, useSelector } from "react-redux";

const Login = (props: any) => {
  const dispatch = useDispatch();
  const emailEl = React.useRef<RefObject>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;
  const passwordEl = React.useRef<RefObject>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;

  interface RefObject {
    value: String;
  }

  const submitHandler = async (event: any) => {
    event.preventDefault();
    let email = emailEl.current.value;
    let password = passwordEl.current.value;
    if (email.trim() === "" || password.trim() === "") {
      return false;
    }

    dispatch<any>(login({ email: email, password: password }));
  };

  return (
    <form className="authForm" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={emailEl} />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" ref={passwordEl} />
      </div>
      <div className="form-action">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Login;
