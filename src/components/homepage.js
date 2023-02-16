import React from "react";

function Homepage() {
  return (
    <div>
      <Logo />
      <Article />
      <SignIn />
    </div>
  );
}
const Logo = () => {
  return (
    <>
      <img src="" alt="Applogo" />
      <h1 className="appTitle">tell-IT</h1>
    </>
  );
};
const Article = () => {
  return <p>got something on your mind? Share it here, stay unknown</p>;
};
const SignIn = () => {
  return (
    <section>
      <button>Log In</button>
      <div>
        <p>New User?</p>
        <a href="">Sign in</a>
      </div>
    </section>
  );
};
export default Homepage;
