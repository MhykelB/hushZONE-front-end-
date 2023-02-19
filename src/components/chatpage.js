import React, { useEffect } from "react";

const commentsUrl = "http://localhost:4000/api/v1/comments";

function chatUI() {
  useEffect(async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/api/v1/comments", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const chatArray = await response.json();
  }, []);
  return <div></div>;
}
