import React from "react";

function Homepage() {
  return (
    <div>
      <Logo />
      <Article />
    </div>
  );
}
const Logo = () => {
  return (
    <>
      <img src="" alt="Applogo" />
      <h1 className="appTitle">Tell-IT</h1>
    </>
  );
};
const Article = () => {
  return <p>got something on your mind? Share it here, stay unknown</p>;
};
module.exports = Homepage;
