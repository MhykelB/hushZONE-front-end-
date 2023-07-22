import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { uifunction } from "../pages/signUpPage";

const SignUpUrl = "http://localhost:4000/auth/register";

// depending on response, re route to login page
function SignUp() {
  const { userInfo, uiDisplay } = useContext(uifunction);
  const Navigate = useNavigate();
  const registerUser = async (url) => {
    try {
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      if (data.status === 201) {
        uiDisplay.setSpinner(false);
        uiDisplay.setModal(true);
        setTimeout(() => {
          Navigate("/login");
        }, 1750);
      } else {
        const resp = await data.json();
        console.log(resp);
        uiDisplay.showNetworkResponse(resp);
        setTimeout(() => {
          uiDisplay.showNetworkResponse("");
          uiDisplay.setSpinner(false);
        }, 2000);
        // console.log(await data.json());
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        uiDisplay.showNetworkResponse("Error: check your connection");
        setTimeout(() => {
          uiDisplay.setSpinner(false);
          uiDisplay.showNetworkResponse("");
        }, 1200);
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
        if (userInfo.confirmPassword === "") {
          return uiDisplay.setIsError((prev) => {
            return { ...prev, confirmPassword: true };
          });
        }
        if (userInfo.password !== userInfo.confirmPassword) {
          return uiDisplay.setIsError((prev) => {
            return { ...prev, comparePassword: true };
          });
        }
        uiDisplay.setSpinner(true);
        registerUser(SignUpUrl);
        uiDisplay.clearInputs();
        // console.log(userDetails);
      }}
    >
      SignUp
    </button>
  );
}

export default SignUp;
