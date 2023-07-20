import React from "react";
import { useEffect, useState, useContext } from "react";
import { SendReplyBtn } from "../requests";
import { EditBtn } from "../requests";
import { localCommentProps } from "./textsDisplayFormat";
import { CommentsProvider } from "../../pages/chatpage";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

export const ResponseBox = () => {
  let randomNumber;
  const { userInfo, showResponseBox, setShowResponseBox } =
    useContext(CommentsProvider);
  const { toggleInputBox, commentCreator } = useContext(localCommentProps);
  const [reply, setReply] = useState("");

  const replyBody = {
    replied_to: commentCreator,
    text: reply,
  };
  const bodyforEdit = {
    text: reply,
  };
  useEffect(() => {
    toggleInputBox.current = false;
  });
  return (
    <div>
      {showResponseBox && toggleInputBox.current === true ? (
        <div className="responseBox">
          <img
            src={
              `/images/avatars/image-${userInfo.username}.png` ||
              `/images/avatars/image-random.svg`
            }
            alt="picc"
            className="comment-header-image"
          />
          <textarea
            autofocus
            placeholder="reply...."
            className="textAreaBox"
            value={reply}
            onChange={(e) => {
              toggleInputBox.current = true;
              setReply(e.target.value);
            }}
          >
            {" "}
          </textarea>
          {userInfo.username === commentCreator ? (
            <EditBtn body={bodyforEdit} setReplyInput={setReply} />
          ) : (
            <SendReplyBtn replyBody={replyBody} setReplyInput={setReply} />
          )}
          <div
            className="icon close"
            onClick={() => {
              randomNumber = Math.floor(Math.random() * 100);
              setShowResponseBox(randomNumber);
            }}
          >
            <IconContext.Provider value={{ className: "icons" }}>
              <AiOutlineClose size={20} />
            </IconContext.Provider>
          </div>
          {/* <img
            src="/images/icon-close.svg"
            alt="close"
            className="icon close"
          /> */}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
