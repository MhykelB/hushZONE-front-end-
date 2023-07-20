import React from "react";
import { useState } from "react";
import { CommentWindow } from "../components/commentsWindow";
import { useFetchUser } from "../customHooks/fecthUsers";
import { SendCommentBtn } from "../components/requests";
import NavBar from "../components/navBar";
import { Spinner } from "../components/modals";
import { useConnectionResponseDisplay } from "../customHooks/connectionResponseDisplay";
import RequestStatus from "../components/requestStatus";
const commentsUrl = "http://localhost:4000/api/v1/comments";
// const commentsUrl = "http://comment-app-backend.vercel.app/api/v1/comments";

export const CommentsProvider = React.createContext();

function ChatPage() {
  const [showResponseBox, setShowResponseBox] = useState(false);
  const { requestResponse, showNetworkResponse } =
    useConnectionResponseDisplay();
  const { commentsList, userInfo, setCommentsList } = useFetchUser(commentsUrl);
  // the comments are fetched, then diplays the navbar, comments window and the textbox
  return (
    <CommentsProvider.Provider
      value={{
        commentsList,
        userInfo,
        setCommentsList,
        showResponseBox,
        setShowResponseBox,
        showNetworkResponse,
      }}
    >
      <div
        className="chatWindowContainer"
        style={{
          height: !commentsList && "100vh",
          width: !commentsList && "700px",
          background: !commentsList && "white",
        }}
      >
        {commentsList ? (
          <>
            <NavBar username={userInfo.username} />
            <CommentWindow />
          </>
        ) : (
          <Spinner classID={"chatPageSpinner"} color={"#eab010"} size={50} />
        )}
        {userInfo && <TextBox user={userInfo} />}
        {requestResponse !== "" && (
          <RequestStatus
            message={requestResponse}
            className="requestStatus-chatPage "
          />
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
        src={
          `/images/avatars/image-${user.username}.png` ||
          `/images/avatars/image-random.svg`
        }
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

export default ChatPage;
