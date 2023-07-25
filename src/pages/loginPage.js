import React from "react";
import Login from "../components/login";
import { Link } from "react-router-dom";
import { Spinner, RequestStatus, Logo } from "../components/modals";
import { useSpinnerControl } from "../customHooks/spinnerControl";
import { useUserCredentials } from "../customHooks/userCredentials";
import { useInputErrorDisplay } from "../customHooks/inputError";
import { useConnectionResponseDisplay } from "../customHooks/connectionResponseDisplay";

export const loginUi = React.createContext();
function LoginPage() {
  const {
    username,
    setUserName,
    password,
    setPassWord,
    userInfo,
    clearInputs,
  } = useUserCredentials();
  const { spinner, setSpinner } = useSpinnerControl();
  const { isError, setIsError } = useInputErrorDisplay();
  const { requestResponse, showNetworkResponse } =
    useConnectionResponseDisplay();
  const uiDisplay = {
    clearInputs,
    setIsError,
    showNetworkResponse,
    setSpinner,
  };
  return (
    <loginUi.Provider value={{ userInfo, uiDisplay, spinner }}>
      <div className="form-login-container">
        <div
          className="form-login"
          style={{
            pointerEvents: spinner ? "none" : "auto",
            opacity: spinner ? 0.5 : 1,
          }}
        >
          <Logo />

          <div className="input">
            <label htmlFor="username">username</label>
            <input
              autoFocus="autofocus"
              type="text"
              name="username"
              placeholder="enter username"
              value={username}
              onChange={(e) => {
                setIsError((prev) => {
                  return { ...prev, username: false };
                });
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
              type="text"
              name="password"
              placeholder="enter password"
              value={password}
              onChange={(e) => {
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
          <div className="login-section">
            <Login />
            <div id="sign-section">
              <p>New User?</p>
              <Link
                to="/signUp"
                onClick={() => {
                  console.log("clicked");
                }}
              >
                <button id="btn-sign-up">Sign up</button>
              </Link>
            </div>
          </div>
        </div>
        {requestResponse !== "" && <RequestStatus message={requestResponse} />}
        <Spinner loadingState={spinner} classID={"loginPageSpinner"} />
      </div>
    </loginUi.Provider>
  );
}
export default LoginPage;
