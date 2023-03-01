import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatpage from "./pages/chatpage";
import Homepage from "./pages/homepage";
import About from "./pages/about";
import LoginPage from "./pages/loginPage";

function App() {
  const homepage = {
    text: "got something on your mind? Share it here, stay unknown",
    appTitle: "tell-IT",
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Homepage text={homepage.text} appTitle={homepage.appTitle} />
          }
        />
        <Route path="about" element={<About />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/chatpage" element={<Chatpage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
