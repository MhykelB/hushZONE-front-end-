import React from "react";
import { useState } from "react";
import Login from "../components/login";
import RequestStatus from "../components/requestStatus";

export const loginUi = React.createContext();
function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [requestResponse, setRequestResponse] = useState("");
  const [isError, setIsError] = useState({ username: true, password: true });
  const userInfo = {
    username,
    password,
  };
  const uiDisplay = {
    clearInputs: () => {
      setUserName("");
      setPassWord("");
    },
    popError: setIsError,
  };
  return (
    <loginUi.Provider value={{ userInfo, uiDisplay }}>
      <>
        <div className="form-login">
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

            <Login setRequestResponse={setRequestResponse} />
          </form>
        </div>
        {requestResponse !== "" && <RequestStatus message={requestResponse} />}
      </>
    </loginUi.Provider>
  );
}
export default LoginPage;
