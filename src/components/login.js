import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUi } from "../pages/loginPage";

// const loginUrl = "http://localhost:4000/auth/login";
const loginUrl = "https://comment-app-backend.vercel.app/auth/login";
function Login() {
  //get a prop for  user data

  const { uiDisplay, userInfo } = useContext(loginUi);
  const Navigate = useNavigate();
  const reqBody = async (url) => {
    try {
      // uiDisplay.clearInputs();
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      if (data.status === 200) {
        uiDisplay.setSpinner(false);
        const response = await data.json();
        localStorage.setItem("token", JSON.stringify(response.token));
        Navigate("/chatpage");
        return;
      } else if (data.status === 400 || data.status === 401) {
        const response = await data.json();
        uiDisplay.showNetworkResponse(response);
        setTimeout(() => {
          uiDisplay.showNetworkResponse("");
          uiDisplay.setSpinner(false);
        }, 3000);
        return;
      } else {
        return Navigate("/errorPage");
      }
    } catch (error) {
      // happens when there's is internet acess but no connection to the backend/server : Failed to fetch
      console.log(error.code);
      if (error.message === "Failed to fetch") {
        uiDisplay.showNetworkResponse("Error: server error");
        return setTimeout(() => {
          Navigate("/errorPage");
          uiDisplay.showNetworkResponse("");
          uiDisplay.setSpinner(false);
        }, 3000);
      } else {
        Navigate("/errorPage");
      }
    }
  };

  return (
    <button
      className="btn-login"
      onClick={(e) => {
        e.preventDefault();
        if (userInfo.username === "") {
          return uiDisplay.setIsError((prev) => {
            return { ...prev, username: true };
          });
        }
        if (userInfo.password === "") {
          return uiDisplay.setIsError((prev) => {
            return { ...prev, password: true };
          });
        }
        uiDisplay.setSpinner(true);
        uiDisplay.clearInputs();
        reqBody(loginUrl);
        console.log(userInfo.password);
      }}
    >
      Log in
    </button>
  );
}
export default Login;
