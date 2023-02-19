import React from "react";
import { useState, useEffect } from "react";

// const loginFunc = async () => {
//   const response = await fetch("http://localhost:4000/api/v1/auth/login", {
//     method: "POST",
//     body: { username: "lev", password: "mary" },
//   });
//   console.log(response.json());
// if response includes success, retreive the token(save it) then reroute to chats page and onload, fetch all comments using(headers.auhtorization = 'Bearer token')
// };
// const testing = () => {
//   console.log("hooray");
// };
function Homepage(props) {
  const [text, setText] = useState(props.text);
  const testfunc = () => {
    console.log("ok man");
    setText((prev) => prev + "joke");
  };
  useEffect(() => {
    testfunc();
  }, []);
  return (
    <div className="container">
      <section className="header-bar">
        <img src="" alt="Applogo" />
        <h1 className="appTitle">{props.appTitle}</h1>
      </section>
      <p id="app-text">{text}</p>
      <section className="login-section">
        <button
          className="btn login"
          onClick={() => {
            setText((prevText) => {
              return prevText + "good";
            });
          }}
        >
          Log In
        </button>
        <div id="sign-section">
          <p>New User?</p>
          <a className="btn sign-up" href="./chatwindow.html">
            Sign up
          </a>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
