import React from "react";

// const loginFunc = async () => {
//   const response = await fetch("http://localhost:4000/api/v1/auth/login", {
//     method: "POST",
//     body: { username: "lev", password: "mary" },
//   });
//   console.log(response.json());
// if response includes success, retreive the token(save it) then reroute to chats page and onload, fetch all comments using(headers.auhtorization = 'Bearer token')
// };
const testing = () => {
  console.log("hooray");
};
function Homepage(props) {
  return (
    <div>
      <section>
        <img src="" alt="Applogo" />
        <h1 className="appTitle">{props.appTitle}</h1>
      </section>
      <p>{props.text}</p>
      <section>
        <button onClick={testing}>Log In</button>
        <div>
          <p>New User?</p>
          <button>Sign in</button>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
