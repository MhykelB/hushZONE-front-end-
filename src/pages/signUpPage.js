import React from "react";
import { useState } from "react";
import SignUp from "../components/signUp";
import LoginSuccessModal from "../components/modals";

export const uifunction = React.createContext();

export const SignUpPage = () => {
  const [modal, setModal] = useState(false);
  const [isError, setIsError] = useState({ username: false, password: false });
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const resetInput = (value) => {
    setUserName(value);
    setPassWord(value);
  };
  const userInfo = {
    username,
    password,
  };

  return (
    <uifunction.Provider value={{ userInfo, setIsError, setModal, resetInput }}>
      <div className="form-login">
        {!modal ? (
          <form>
            <div className="input">
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                placeholder="enter username"
                value={username}
                onChange={(e) => {
                  setIsError(false);
                  e.preventDefault();
                  setUserName(e.target.value);
                }}
              />
              {isError.username && (
                <p className="warning">field cannot be empty</p>
              )}
            </div>
            <div className="input">
              <label htmlFor="password">password</label>
              <input
                type="text"
                name="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setIsError(false);
                  setPassWord(e.target.value);
                }}
              />
              {isError.password && (
                <p className="warning">field cannot be empty</p>
              )}
            </div>
            <SignUp
            // userDetails={userInfo}
            // popError={setIsError}
            // switchModal={setModal}
            // resetInput={resetInput}
            />
          </form>
        ) : (
          <LoginSuccessModal />
        )}
      </div>
    </uifunction.Provider>
  );
};

// export { SignUpPage };
