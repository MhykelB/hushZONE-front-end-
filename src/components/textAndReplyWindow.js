import React from "react";

export const ReplyWindow = ({ prop }) => {
  return prop.map((reply) => {
    return (
      <div key={reply._id} className="replyBox">
        <p>{reply.text}</p>
      </div>
    );
  });
};

export const TextWindow = ({ commentObj, user }) => {
  return (
    <div className="comment">
      <section className="comment-like-bar">
        <button>
          <img src="/images/icon-plus.svg" alt="plus" />
        </button>
        <p className="comment-likes">{commentObj.likes}</p>
        <button>
          <img src="/images/icon-minus.svg" alt="minus" />
        </button>
      </section>
      <section className="comment-body">
        <div className="comment-header">
          <img
            src={`/images/avatars/image-${user}.png`}
            alt="picc"
            className="comment-header-image"
          />
          <p className="comment-header-username">{commentObj.created_by}</p>
          <p className="comment-header-time">{commentObj.createdAt}</p>
          {user === commentObj.created_by ? (
            <div className="comment-header-edit">
              <button className="btn-delete">Delete</button>
              <button className="btn-edit">Edit</button>
            </div>
          ) : (
            <button className="comment-reply">
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
  );
};
