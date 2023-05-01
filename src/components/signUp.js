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
    const data = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    if (data.status === 201) {
      uiDisplay.modalPop(true);
      // switchModal(true);
      const resp = await data.json();
      console.log(resp.message);
      setTimeout(() => {
        Navigate("/login");
      }, 1500);
    } else {
      uiDisplay.resetInput();
      console.log(await data.json());
    }
  };
  return (
    <div>
      <button
        className="btn Signup"
        onClick={(e) => {
          e.preventDefault();
          if (userInfo.username === "") {
            uiDisplay.errorPop((prev) => {
              return { ...prev, username: false };
            });
          }
          if (userInfo.password === "") {
            return uiDisplay.errorPop((prev) => {
              return { ...prev, password: false };
            });
          }
          registerUser(SignUpUrl);
          uiDisplay.resetInput();
          // console.log(userDetails);
        }}
      >
        SignUp
      </button>
    </div>
  );
}

export default SignUp;
