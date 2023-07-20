import { useState } from "react";

export const useInputErrorDisplay = () => {
  const [isError, setIsError] = useState({
    username: false,
    password: false,
    confirmPassword: false,
    comparePassword: false,
  });

  return { isError, setIsError };
};
