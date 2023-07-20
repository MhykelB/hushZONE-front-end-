import React from "react";
import { Link } from "react-router-dom";
import { BsEmojiNeutral } from "react-icons/bs";
import { IconContext } from "react-icons";
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
      <section className="app-title">
        <i className="icon">
          <BsEmojiNeutral size={"100%"} color={" rgba(255, 165, 0, .8)"} />
        </i>
        <div className="appName">
          <h1 className="hush">{props.appTitle}</h1>
          <h2 className="zone">
            <p>zone</p>
          </h2>
        </div>
      </section>
      <p id="app-text">{props.text}</p>
      <section className="login-section">
        <div id="sign-section">
          <p>New User?</p>
          <Link
            to="/signUp"
            onClick={() => {
              console.log("cliked");
            }}
          >
            <button id="btn-sign-up">Sign up</button>
          </Link>
        </div>
        <Link to="/login">
          <button className="btn login">log in</button>
        </Link>
      </section>
      <footer> &copy; 2023 </footer>
    </div>
  );
}

export default Homepage;
