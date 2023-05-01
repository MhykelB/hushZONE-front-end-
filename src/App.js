import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatpage from "./pages/chatpage";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/loginPage";
import { SignUpPage } from "./pages/signUpPage";
import { ErrorPage } from "./pages/errorLoading";

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
        <Route path="login" element={<LoginPage />} />
        <Route path="signUp" element={<SignUpPage />} />
        <Route path="errorPage" element={<ErrorPage />} />
        <Route path="chatpage" element={<Chatpage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
