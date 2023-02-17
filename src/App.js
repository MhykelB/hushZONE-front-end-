// import { text } from "express";
import React from "react";
import Homepage from "./components/homepage";

const homepage = {
  text: "got something on your mind? Share it here, stay unknown",
  appTitle: "tell-ITt",
};

function App() {
  return <Homepage text={homepage.text} appTitle={homepage.appTitle} />;
}
export default App;
