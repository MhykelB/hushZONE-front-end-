import React, { useEffect, useState } from "react";
import { CommentWindow } from "../components/chatsWindow";

const commentsUrl = "http://localhost:4000/api/v1/comments";

function ChatUI() {
  const [allComments, setAllComments] = useState("");
  console.log(allComments);
  useEffect(() => {
    async function fetchDAta() {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(commentsUrl, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });
      const chatArray = await response.json();
      setAllComments(chatArray);
    }
    fetchDAta();
  }, []);
  return (
    <div className="chatWindowContainer">
      {allComments ? <CommentWindow prop={allComments} /> : <p>loading...</p>}
      {allComments && <TextBox user={allComments.user} />}
    </div>
  );
}

const TextBox = ({ user }) => {
  return (
    <section className="textArea">
      <img
        className="comment-header-image"
        src={`/images/avatars/image-${user.username}.png`}
        alt="img"
      />
      <textarea
        placeholder="Add a comment..."
        className="textAreaBox"
      ></textarea>
      <button className="comment-send send">SEND</button>
    </section>
  );
};

export default ChatUI;
