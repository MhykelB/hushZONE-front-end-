import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUi } from "../pages/loginPage";

const loginUrl = "http://localhost:4000/auth/login";
function Login({ setRequestResponse }) {
  //get a prop for  user data
  const { uiDisplay, userInfo } = useContext(loginUi);
  const navigate = useNavigate();
  const reqBody = async (url) => {
    try {
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      if (data.status === 200) {
        const response = await data.json();
        localStorage.setItem("token", JSON.stringify(response.token));
        setRequestResponse("");
        navigate("/chatpage");
        return;
      } else if (data.status === 400) {
        const response = await data.json();
        setRequestResponse(response);
      }
    } catch (error) {
      navigate("/errorPage");
      console.log("this is the error" + error);
    }
  };

  return (
    <div className="loginContainer">
      <button
        className="btn login"
        onClick={(e) => {
          e.preventDefault();
          if (userInfo.username === "") {
            uiDisplay.popError((prev) => {
              return { ...prev, username: false };
            });
          }
          if (userInfo.password === "") {
            return uiDisplay.popError((prev) => {
              return { ...prev, password: false };
            });
          }

          reqBody(loginUrl);
        }}
      >
        Log in
      </button>
    </div>
  );
}
export default Login;
