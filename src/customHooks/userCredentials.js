import { useState } from "react";

export const useUserCredentials = () => {
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassWord] = useState("");
  const userInfo = {
    username,
    password,
    confirmPassword,
  };
  const clearInputs = () => {
    setPassWord("");
    setConfirmPassWord("");
  };
  return {
    username,
    setUserName,
    password,
    setPassWord,
    confirmPassword,
    setConfirmPassWord,
    userInfo,
    clearInputs,
  };
};
