import React from "react";
import { useContext } from "react";
import { TextWindow } from "./chatsWindowComponents/textsDisplayFormat";
import { ReplyWindow } from "./replyWindow";
import { CommentsProvider } from "../pages/chatpage";

export const commentContext = React.createContext();

export const CommentWindow = () => {
  const { commentsList } = useContext(CommentsProvider);
  return commentsList.map((comment) => {
    const replyArray = comment.replies;
    return (
      <commentContext.Provider
        value={{ commentID: comment._id }}
        key={comment._id}
      >
        <div className="commentAndReply" key={comment._id}>
          <TextWindow commentObj={comment} />
          <div className="ReplyWindow">
            {replyArray.length > 0 && <ReplyWindow repliesList={replyArray} />}
          </div>
        </div>
      </commentContext.Provider>
    );
  });
};
