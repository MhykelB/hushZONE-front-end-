import React from "react";
import { useState, useContext } from "react";
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
  const [darkMode, setDarkMode] = useState(false);
  const [showResponseBox, setShowResponseBox] = useState(false);
  const { requestResponse, showNetworkResponse } =
    useConnectionResponseDisplay();
  const { commentsList, userInfo, setCommentsList } = useFetchUser(commentsUrl);
  // the comments are fetched, then diplays the navbar, comments window and the textbox
  return (
    <CommentsProvider.Provider
      value={{
        darkMode,
        setDarkMode,
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
      </div>
      {requestResponse !== "" && (
        <RequestStatus
          message={requestResponse}
          className="requestStatus-chatPage "
        />
      )}
    </CommentsProvider.Provider>
  );
}

const TextBox = ({ user }) => {
  const { darkMode } = useContext(CommentsProvider);
  const [text, setText] = useState("");
  return (
    <section
      className={!darkMode ? "addTextArea" : "addTextArea addTextArea-darkmode"}
    >
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
        placeholder="Share a secret..."
        className="textAreaBox"
      ></textarea>
      <SendCommentBtn userText={text} clearInput={setText} />
    </section>
  );
};

export default ChatPage;
