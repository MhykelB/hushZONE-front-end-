import React from "react";
// import ReactDOM from "react";

const loginUrl = "http://localhost:4000/auth/login";
const user = {
  username: "lev",
  password: "",
};
const reqBody = (url) => {
  // const { username, password } = user;
  fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      localStorage.clear();
      localStorage.setItem("token", JSON.stringify(`Bearer ${response.token}`));
      console.log(response);
      //then reroute to chatpage
    })
    .catch((error) => {
      console.log(error);
    });
};
function Login() {
  return (
    <div className="loginPage">
      <h1>log in here</h1>
      <button
        onClick={() => {
          reqBody(loginUrl);
        }}
      >
        Log in
      </button>
    </div>
  );
}
export default Login;
// const root = ReactDOM.createRoot(document.getElementById("login-page"));
// root.render(<Login />);
