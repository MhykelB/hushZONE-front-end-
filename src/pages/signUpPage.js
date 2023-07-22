import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "../components/signUp";
import {
  Spinner,
  SignUpSuccessModal,
  RequestStatus,
} from "../components/modals";
import { useSpinnerControl } from "../customHooks/spinnerControl";
import { useUserCredentials } from "../customHooks/userCredentials";
import { useInputErrorDisplay } from "../customHooks/inputError";
import { useConnectionResponseDisplay } from "../customHooks/connectionResponseDisplay";

export const uifunction = React.createContext();

export const SignUpPage = () => {
  const {
    username,
    setUserName,
    password,
    setPassWord,
    confirmPassword,
    setConfirmPassWord,
    userInfo,
    clearInputs,
  } = useUserCredentials();
  const { isError, setIsError } = useInputErrorDisplay();
  const [modal, setModal] = useState(true);
  const { spinner, setSpinner } = useSpinnerControl();
  const { requestResponse, showNetworkResponse } =
    useConnectionResponseDisplay();

  const signupStyle = {
    pointerEvents: spinner ? "none" : "auto",
    opacity: spinner ? 0.75 : 1,
    display: "flex",
    flexDirection: "column",
    gap: "2.0rem",
  };
  const uiDisplay = {
    setIsError,
    setSpinner,
    clearInputs,
    setModal,
    showNetworkResponse,
  };

  return (
    <uifunction.Provider value={{ userInfo, uiDisplay }}>
      <div className="form-login-container">
        <div className="form-login" style={signupStyle}>
          {!modal ? (
            <>
              <div className="input">
                <label htmlFor="username">username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="enter username"
                  value={username}
                  onChange={(e) => {
                    setIsError((prev) => {
                      return { ...prev, username: false };
                    });
                    e.preventDefault();
                    setUserName(e.target.value);
                  }}
                />
                <p
                  className="warning-on"
                  style={{ opacity: isError.username ? 1 : 0 }}
                >
                  *field cannot be empty
                </p>
              </div>
              <div className="input">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="enter password"
                  value={password}
                  onChange={(e) => {
                    e.preventDefault();
                    setIsError((prev) => {
                      return { ...prev, password: false };
                    });
                    setPassWord(e.target.value);
                  }}
                />
                <p
                  className="warning-on"
                  style={{ opacity: isError.password ? 1 : 0 }}
                >
                  *field cannot be empty
                </p>
              </div>
              <div className="input">
                <label htmlFor="password">Confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    e.preventDefault();
                    setIsError((prev) => {
                      return { ...prev, confirmPassword: false };
                    });
                    setConfirmPassWord(e.target.value);
                  }}
                />
                <p
                  className="warning-on"
                  style={{ opacity: isError.confirmPassword ? 1 : 0 }}
                >
                  *field cannot be empty
                </p>
                {isError.comparePassword && (
                  <p className="warning-on">*passwords do not match</p>
                )}
              </div>
              <div className="login-section">
                <SignUp />
                <div id="sign-section">
                  <p>Already a member?</p>
                  <Link to="/login">
                    <button id="btn-login-page">Log in</button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <SignUpSuccessModal />
          )}
        </div>
        {spinner && <Spinner classID={"loginPageSpinner"} />}
        {requestResponse && <RequestStatus message={requestResponse} />}
      </div>
    </uifunction.Provider>
  );
};

// export { SignUpPage };
