import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useFetchUser = (url) => {
  const [commentsList, setCommentsList] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    async function fetchDAta() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await fetch(url, {
          method: "GET",
          headers: { authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const chatArray = await response.json();
          setCommentsList(chatArray.allComments);
          setUserInfo(chatArray.user);
        } else {
          console.log("bad");
          // Navigate("/errorPage");
        }
      } catch (error) {
        console.log("good");
        console.log(error.message);
        // Navigate("/errorPage");
      }
    }
    fetchDAta();
  }, [url, Navigate]);
  return { commentsList, userInfo, setCommentsList, setUserInfo };
};
