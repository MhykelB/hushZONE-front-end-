import React from "react";
import { useContext } from "react";
import { DeleteBtn } from "../requests";
import { CommentsProvider } from "../../pages/chatpage";
import { localCommentProps } from "./textsDisplayFormat";
import { useDateCoverter } from "../../customHooks/updateCommentList";
import { IconContext } from "react-icons";
import { BsReply } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

export const Header = ({ obj }) => {
  const { objNature } = useContext(localCommentProps);
  const { userInfo } = useContext(CommentsProvider);
  const date = useDateCoverter(obj.createdAt);
  return (
    <div className="comment-header">
      <img
        src={`/images/avatars/image-${obj.created_by}.png`}
        alt="picc"
        className="comment-header-image"
      />
      <p className="username">{obj.created_by}</p>
      {/* <p className="comment-header-time">{obj.createdAt}</p> */}
      <p className="comment-header-time">{date}</p>
      {objNature === "reply" && <p>replied-to {obj.replied_to}</p>}
      {userInfo.username === obj.created_by ? (
        <div className="comment-header-edit">
          <DeleteBtn />
          <EditArrowBtn />
        </div>
      ) : (
        <ReplyArrowBtn />
      )}
    </div>
  );
};

const EditArrowBtn = () => {
  let randomNumber;
  const { toggleInputBox } = useContext(localCommentProps);
  const { setShowResponseBox } = useContext(CommentsProvider);
  return (
    <div
      className="edit-btn"
      onClick={(e) => {
        e.preventDefault();
        toggleInputBox.current = true;
        randomNumber = Math.floor(Math.random() * 100);
        setShowResponseBox(randomNumber);
      }}
    >
      <IconContext.Provider value={{ className: "icons" }}>
        <FaRegEdit size={18} />
      </IconContext.Provider>
    </div>
  );
};
const ReplyArrowBtn = () => {
  let randomNumber;
  const { toggleInputBox } = useContext(localCommentProps);
  const { setShowResponseBox } = useContext(CommentsProvider);
  return (
    <button
      className="reply-btn"
      onClick={(e) => {
        e.preventDefault();
        toggleInputBox.current = true;
        randomNumber = Math.floor(Math.random() * 100);
        setShowResponseBox(randomNumber);
      }}
    >
      <div className="reply-icon">
        <IconContext.Provider value={{ className: "icons" }}>
          <BsReply size={20} />
        </IconContext.Provider>
      </div>
      Reply
    </button>
  );
};
