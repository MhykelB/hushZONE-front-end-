import { useState } from "react";

export const useSpinnerControl = () => {
  const [spinner, setSpinner] = useState(false);
  return { spinner, setSpinner };
};
