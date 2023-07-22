import React from "react";
import { useContext, useRef } from "react";
import { CommentsProvider } from "../../pages/chatpage";
import { LikeAndUnlikeBtn } from "../requests";
import { Header } from "./header";
import { ResponseBox } from "./inputResponseBox";

export const localCommentProps = React.createContext();
export const TextWindow = ({ commentObj }) => {
  const { userInfo, darkMode } = useContext(CommentsProvider);
  const toggleInputBox = useRef(false);
  const commentCreator = commentObj.created_by;
  const likes = commentObj.likes.length;
  const localCommentID = commentObj._id; // note that some comments have replies which have their own id, so this gives the unique id of each parent-comment/reply-children object
  const islike = commentObj.likes.includes(userInfo.userID) ? true : false;
  const objNature = commentObj.type;
  return (
    <>
      <localCommentProps.Provider
        value={{
          objNature,
          toggleInputBox,
          commentCreator,
          localCommentID,
          islike,
        }}
      >
        <div className={!darkMode ? "comment" : "comment comment-darkmode"}>
          <section className="comment-like-bar">
            <LikeAndUnlikeBtn />
            <div className="comment-likes">{likes}</div>
          </section>
          <section className="headerAndText">
            <Header obj={commentObj} />
            {/* <section className="comment-body"> */}
            <p className={!darkMode ? "text" : "text text-darkmode"}>
              {commentObj.text}
            </p>
            {/* </section> */}
          </section>
        </div>
        <ResponseBox />
      </localCommentProps.Provider>
    </>
  );
};
