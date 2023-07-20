import { useState } from "react";

export const useConnectionResponseDisplay = () => {
  const [requestResponse, setRequestResponse] = useState("");
  const showNetworkResponse = (message) => {
    setRequestResponse(message);
  };
  return { requestResponse, showNetworkResponse };
};
