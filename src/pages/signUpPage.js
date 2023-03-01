import React from "react";
import { useState } from "react";
import SignUp from "../components/signUp";

const SignUp = () => {
  const [username, setUserName] = useState(" ");
  const [password, setpassword] = useState(" ");
  const userInfo = {
    username,
    password,
  };
  return (
    <div>
      <form className="form-login">
        <div className="input">
          <input
            type="text"
            name="username"
            placeholder="enter username"
            value={username}
            onChange={(e) => {
              e.preventDefault();
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
              e.preventDefault();
              setpassword(e.target.value);
            }}
          />
          <label htmlFor="password">password</label>
        </div>
        <SignUp userDetails={userInfo} />
      </form>
    </div>
  );
};

export default SignUp;
