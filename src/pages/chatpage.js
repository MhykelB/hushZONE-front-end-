import React from "react";
import { useState } from "react";
import { CommentWindow } from "../components/chatsWindow";
import { useFetchUser } from "../customHooks/fecthUsers";
import { SendCommentBtn } from "../components/requests";
import NavBar from "../components/navBar";
const commentsUrl = "http://localhost:4000/api/v1/comments";

export const CommentsProvider = React.createContext();

function ChatUI() {
  const [showResponseBox, setShowResponseBox] = useState(false);
  const { allCommentsAndUserDetails, setAllComments } =
    useFetchUser(commentsUrl);
  const userInfo = allCommentsAndUserDetails.user;
  return (
    <CommentsProvider.Provider
      value={{
        allCommentsAndUserDetails,
        userInfo,
        setAllComments,
        showResponseBox,
        setShowResponseBox,
      }}
    >
      <div className="chatWindowContainer">
        {allCommentsAndUserDetails ? (
          <>
            <NavBar username={userInfo.username} />
            <CommentWindow prop={allCommentsAndUserDetails} />
          </>
        ) : (
          <p>loading...</p>
        )}
        {allCommentsAndUserDetails && (
          <TextBox user={allCommentsAndUserDetails.user} />
        )}
      </div>
    </CommentsProvider.Provider>
  );
}

const TextBox = ({ user }) => {
  const [text, setText] = useState("");

  return (
    <section className="textArea">
      <img
        className="comment-header-image"
        src={`/images/avatars/image-${user.username || "image-random"}.png`}
        alt="img"
      />
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Add a comment..."
        className="textAreaBox"
      ></textarea>
      <SendCommentBtn userText={text} clearInput={setText} />
    </section>
  );
};

export default ChatUI;
