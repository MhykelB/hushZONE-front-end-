import React from "react";

const SignUpUrl = "http://localhost:4000/auth/register";
const registerUser = (url, data) => {
  fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((resp) => {
      const response = resp.josn();
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

function SignUp({ userDetails }) {
  return (
    <button
      className="btn Signup"
      onClick={(e) => {
        e.preventDefault();
        // registerUser(SignUpUrl, userDetails);
        console.log(userDetails);
      }}
    >
      SignUp
    </button>
  );
}

export default SignUp;
