import React from "react";
import { useNavigate } from "react-router-dom";

const loginUrl = "http://localhost:4000/auth/login";
function Login() {
  const navigate = useNavigate();
  const reqBody = async (url) => {
    try {
      const user = {
        username: "lev",
        password: "mary",
      };
      const data = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

      if (data.status === 200) {
        const response = await data.json();
        localStorage.setItem("token", JSON.stringify(response.token));
        navigate("/chatpage");
      } else {
        console.log(await data.json());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginContainer">
      <button
        className="btn login"
        onClick={(e) => {
          e.preventDefault();
          reqBody(loginUrl);
        }}
      >
        Log in
      </button>
    </div>
  );
}
export default Login;
