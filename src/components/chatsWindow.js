import React from "react";
import { TextWindow } from "./textWindow";
import { ReplyWindow } from "./replyWindow";

export const commentContext = React.createContext();

export const CommentWindow = ({ prop }) => {
  return prop.allComments.map((comment) => {
    const replyArray = comment.replies;
    return (
      <commentContext.Provider
        value={{ commentID: comment._id }}
        key={comment._id}
      >
        <div className="commentAndReply" key={comment._id}>
          <TextWindow commentObj={comment} user={prop.user.username} />
          <div className="ReplyWindow">
            {replyArray.length > 0 && (
              <ReplyWindow
                repliesList={replyArray}
                currentUser={prop.user.username}
              />
            )}
          </div>
        </div>
      </commentContext.Provider>
    );
  });
};
