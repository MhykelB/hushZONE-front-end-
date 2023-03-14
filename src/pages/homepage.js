import React from "react";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

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
  return (
    <div className="container">
      <section className="header-bar">
        <img src="" alt="Applogo" />
        <h1 className="appTitle">{props.appTitle}</h1>
      </section>
      <p id="app-text">{props.text}</p>
      <section className="login-section">
        <div className="btn login">
          <Link to="/login">
            <button>log in</button>
          </Link>
        </div>
        <div id="sign-section">
          <p>New User?</p>
          <Link to="/signUp">
            <button className="btn-sign-up">Sign up</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
