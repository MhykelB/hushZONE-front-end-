import { useState, useEffect } from "react";

export const useFetchUser = (url) => {
  const [allComments, setAllComments] = useState("");
  useEffect(() => {
    async function fetchDAta() {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(url, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });
      const chatArray = await response.json();
      setAllComments(chatArray);
    }
    fetchDAta();
  }, [url]);
  return { allComments };
};
