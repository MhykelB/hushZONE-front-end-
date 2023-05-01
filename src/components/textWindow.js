import { React, useContext, useRef, useEffect } from "react";
import { useState } from "react";
import { DeleteBtn } from "./requests";
import { CommentsProvider } from "../pages/chatpage";
import { SendReplyBtn } from "./requests";
import { EditBtn } from "./requests";
import { LikeAndUnlikeBtn } from "./requests";
// import { commentContext } from "./chatsWindow";

export const TextWindow = ({ commentObj, user }) => {
  const creator = commentObj.created_by;
  const deleteCommentUrl = `http://localhost:4000/api/v1/comments/${commentObj._id}`;
  const deleteReplyUrl = `http://localhost:4000/api/v1/comments/deletereply/${commentObj._id}`;
  const { setShowResponseBox, userInfo } = useContext(CommentsProvider);
  const likes = commentObj.likes.length;
  const toggle = useRef(false);
  const likeArray = commentObj.likes;
  const islike = likeArray.includes(userInfo.userID) ? true : false;
  const isAReply = commentObj.replied_to ? true : false;
  const textNature = commentObj.type;
  // console.log(textNature);
  return (
    <>
      <div className="comment">
        <section className="comment-like-bar">
          <LikeAndUnlikeBtn
            islike={islike}
            textNature={textNature}
            textID={commentObj._id}
          />
          <div className="comment-likes">{likes}</div>
        </section>
        <section className="comment-body">
          <div className="comment-header">
            <img
              src={`/images/avatars/image-${commentObj.created_by}.png`}
              alt="picc"
              className="comment-header-image"
            />
            <p className="comment-header-username">{commentObj.created_by}</p>
            <p className="comment-header-time">{commentObj.createdAt}</p>
            {commentObj.replied_to && (
              <p>replied - to {commentObj.replied_to}</p>
            )}
            {user === commentObj.created_by ? (
              <div className="comment-header-edit">
                {!commentObj.replied_to ? (
                  <DeleteBtn url={deleteCommentUrl} />
                ) : (
                  <DeleteBtn url={deleteReplyUrl} />
                )}
                <button
                  className="btn-edit"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(isAReply);
                    toggle.current = true;
                    setShowResponseBox((prev) => {
                      return `${prev} a`;
                    });
                  }}
                >
                  {!isAReply ? "Edit Comment" : "Edit Rieply"}
                </button>
              </div>
            ) : (
              <button
                className="comment-reply"
                onClick={(e) => {
                  e.preventDefault();
                  toggle.current = true;
                  setShowResponseBox((prev) => {
                    return `${prev} a`;
                  });
                }}
              >
                <img
                  src="/images/icon-reply.svg"
                  alt="reply"
                  className="reply-arrow"
                />
                Reply
              </button>
            )}
          </div>
          <p className="comment-note text">{commentObj.text}</p>
        </section>
      </div>
      {user !== commentObj.created_by ? (
        <ResponseBox
          userimg={user}
          toggle={toggle}
          creator={creator}
          duty={"forReply"}
        />
      ) : (
        <ResponseBox
          userimg={user}
          toggle={toggle}
          creator={creator}
          duty={"forEdit"}
          // isAReply={commentObj.replied_to}

          commentID={commentObj._id}
          isAReply={isAReply}
        />
      )}
    </>
  );
};

function ResponseBox({ userimg, toggle, creator, duty, isAReply, commentID }) {
  const { showResponseBox, setShowResponseBox } = useContext(CommentsProvider);
  const [reply, setReply] = useState("");
  // console.log(isAReply);
  const replyBody = {
    replied_to: creator,
    text: reply,
  };
  const bodyforEdit = {
    text: reply,
  };

  useEffect(() => {
    toggle.current = false;
  });
  return (
    <div>
      {showResponseBox && toggle.current === true ? (
        <div className="responseBox">
          <img
            src={`/images/avatars/image-${userimg}.png`}
            alt="picc"
            className="comment-header-image"
          />
          <textarea
            placeholder="reply...."
            className="textAreaBox"
            value={reply}
            onChange={(e) => {
              toggle.current = true;
              setReply(e.target.value);
            }}
          >
            {" "}
          </textarea>
          {duty === "forReply" && (
            <SendReplyBtn
              toggleWindow={setShowResponseBox}
              replyBody={replyBody}
              setReplyInput={setReply}
            />
          )}
          {duty === "forEdit" && (
            <EditBtn
              body={bodyforEdit}
              setReplyInput={setReply}
              isAReply={isAReply}
              commentID={commentID}
            />
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
