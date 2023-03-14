import React from "react";
import { useState } from "react";
import Login from "../components/login";

function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const userInfo = {
    username,
    password,
  };
  return (
    <form className="form-login">
      <div className="input">
        <input
          type="text"
          name="username"
          placeholder="enter username"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label htmlFor="username">username</label>
      </div>
      <div className="input">
        <input
          type="text"
          name="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => {
            setPassWord(e.target.value);
          }}
        />
        <label htmlFor="password">password</label>
      </div>
      <Login loginDetails={userInfo} />
    </form>
  );
}
export default LoginPage;
