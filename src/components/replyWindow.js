import React from "react";
import { useState } from "react";
import { TextWindow } from "./chatsWindowComponents/textsDisplayFormat";
import { Fragment } from "react";
import { IconContext } from "react-icons";
import { IoIosArrowUp } from "react-icons/io";

export const ReplyWindow = ({ repliesList }) => {
  const [viewReply, setViewReply] = useState(false);
  const List = repliesList.map((reply) => {
    return (
      <Fragment key={reply._id}>
        <TextWindow commentObj={reply} />
      </Fragment>
    );
  });
  return (
    <>
      {!viewReply ? <ViewBtn setView={setViewReply} list={List} /> : List}
      {viewReply && <CollapseBtn setView={setViewReply} />}
    </>
  );
};
const ViewBtn = ({ setView, list }) => {
  return (
    <button
      className="viewReplies"
      onClick={() => {
        setView(true);
      }}
    >
      view {list.length} more replies
    </button>
  );
};
const CollapseBtn = ({ setView }) => {
  return (
    <button
      className="closeReplies"
      onClick={() => {
        setView(false);
      }}
    >
      <IconContext.Provider value={{ className: "icons arrow-up" }}>
        <IoIosArrowUp size={20} />
      </IconContext.Provider>
    </button>
  );
};
