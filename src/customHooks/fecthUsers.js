import { useState, useEffect } from "react";

export const useFetchUser = (url) => {
  const [allCommentsAndUserDetails, setAllComments] = useState("");
  useEffect(() => {
    async function fetchDAta() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await fetch(url, {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        });
        const chatArray = await response.json();
        setAllComments(chatArray);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDAta();
  }, [url]);
  return { allCommentsAndUserDetails, setAllComments };
};
