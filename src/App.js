// import { text } from "express";
import React from "react";
import Homepage from "./components/homepage";
import Login from "../src/components/login";

const homepage = {
  text: "got something on your mind? Share it here, stay unknown",
  appTitle: "tell-IT",
};

function App() {
  return (
    <>
      <Homepage text={homepage.text} appTitle={homepage.appTitle} />
      <Login />
    </>
  );
}
export default App;
