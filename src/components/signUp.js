import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { uifunction } from "../pages/signUpPage";

const SignUpUrl = "http://localhost:4000/auth/register";

// depending on response, re route to login page
function SignUp() {
  const uiData = useContext(uifunction);
  const Navigate = useNavigate();
  const registerUser = async (url, info) => {
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(info),
    });
    if (data.status === 201) {
      uiData.setModal(true);
      // switchModal(true);
      const resp = await data.json();
      console.log(resp.message);
      setTimeout(() => {
        Navigate("/login");
      }, 1500);
    } else {
      uiData.resetInput("");
      console.log(await data.json());
    }
  };
  return (
    <div>
      <button
        className="btn Signup"
        onClick={(e) => {
          e.preventDefault();
          if (uiData.userInfo.username === "") {
            return uiData.setIsError((prev) => {
              return { ...prev, username: true };
            });
          } else if (uiData.userInfo.password === "") {
            return uiData.setIsError((prev) => {
              return { ...prev, password: true };
            });
          }
          registerUser(SignUpUrl, uiData.userInfo);
          // console.log(userDetails);
        }}
      >
        SignUp
      </button>
    </div>
  );
}

export default SignUp;
