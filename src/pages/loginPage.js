import React from "react";
import Login from "../components/login";

function LoginPage() {
  return (
    <form className="form-login">
      <div className="input">
        <input type="text" name="username" placeholder="enter username" />
        <label htmlFor="username">username</label>
      </div>
      <div className="input">
        <input type="text" name="password" placeholder="enter password" />
        <label htmlFor="password">password</label>
      </div>
      <Login />
    </form>
  );
}
export default LoginPage;
