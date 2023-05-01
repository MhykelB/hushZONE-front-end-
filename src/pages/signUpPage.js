import React from "react";
import { useState } from "react";
import SignUp from "../components/signUp";
import LoginSuccessModal from "../components/modals";

export const uifunction = React.createContext();

export const SignUpPage = () => {
  const [modal, setModal] = useState(false);
  const [isError, setIsError] = useState({ username: true, password: true });
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const uiDisplay = {
    resetInput: () => {
      setUserName("");
      setPassWord("");
    },
    modalPop: setModal,
    errorPop: setIsError,
  };
  const userInfo = {
    username,
    password,
  };

  return (
    <uifunction.Provider value={{ userInfo, uiDisplay }}>
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
                  setIsError((prev) => {
                    return { ...prev, username: true };
                  });
                  e.preventDefault();
                  setUserName(e.target.value);
                }}
              />
              {!isError.username && (
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
                  setIsError((prev) => {
                    return { ...prev, password: true };
                  });
                  setPassWord(e.target.value);
                }}
              />
              {!isError.password && (
                <p className="warning">field cannot be empty</p>
              )}
            </div>
            <SignUp />
          </form>
        ) : (
          <LoginSuccessModal />
        )}
      </div>
    </uifunction.Provider>
  );
};

// export { SignUpPage };
