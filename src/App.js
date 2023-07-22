import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./pages/chatpage";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/loginPage";
import { SignUpPage } from "./pages/signUpPage";
import { DefaultErrorPage } from "./pages/errorLoading";

function App() {
  const homepage = {
    text: "got something on your mind? Share it here, stay unknown",
    appTitle: "hush",
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
        <Route path="chatpage" element={<ChatPage />}></Route>
        <Route path="errorPage" element={<DefaultErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
