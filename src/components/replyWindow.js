import React from "react";
import { useState } from "react";
import { TextWindow } from "./textWindow";
import { Fragment } from "react";

export const ReplyWindow = ({ repliesList, currentUser }) => {
  const [viewReply, setViewReply] = useState(false);
  const List = repliesList.map((reply) => {
    return (
      <Fragment key={reply._id}>
        <TextWindow commentObj={reply} user={currentUser} />
      </Fragment>
    );
  });
  const viewBtn = (
    <button
      className="viewReplies"
      onClick={() => {
        setViewReply(true);
      }}
    >
      view {List.length} more replies
    </button>
  );
  return <> {!viewReply ? viewBtn : List} </>;
};
