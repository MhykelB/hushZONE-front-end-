import React from "react";
import { useContext } from "react";
import { CommentsProvider } from "../pages/chatpage";
import { commentContext } from "./commentsWindow";
import { localCommentProps } from "./chatsWindowComponents/textsDisplayFormat";
import { updateCommentList } from "../customHooks/updateCommentList";
import { IconContext } from "react-icons";
import { AiOutlineDelete } from "react-icons/ai";

// const commentsUrl = "http://localhost:4000/api/v1/comments";
export const SendCommentBtn = ({ userText, clearInput }) => {
  const { commentsList, setCommentsList, showNetworkResponse } =
    useContext(CommentsProvider);
  const token = JSON.parse(localStorage.getItem("token"));
  const postUrl = "http://localhost:4000/api/v1/comments/postcomment";
  const postText = async () => {
    try {
      const response = await fetch(postUrl, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ text: userText }),
      });
      const responseMsg = await response.json();
      if (response.status === 201) {
        const newChatArray = commentsList.concat([responseMsg]);
        setCommentsList(newChatArray);
        showNetworkResponse("secret added");
        setTimeout(() => {
          showNetworkResponse("");
        }, 2000);
      } else {
        showNetworkResponse(responseMsg);
        setTimeout(() => {
          showNetworkResponse("");
        }, 2000);
      }
    } catch (error) {
      error.message && showNetworkResponse(error.message);
      setTimeout(() => {
        showNetworkResponse("");
      }, 2000);
      console.log(error);
    }
  };
  return (
    <button
      className="comment-send"
      disabled={userText.trim().length > 0 ? false : true}
      // style={{
      //   disabled: userText.trim().length > 0 ? true : false,
      // }}
      onClick={(e) => {
        e.preventDefault();
        postText();
        clearInput("");
      }}
    >
      SEND
    </button>
  );
};

export const SendReplyBtn = ({ replyBody, setReplyInput }) => {
  const { commentsList, setCommentsList, showNetworkResponse } =
    useContext(CommentsProvider);
  const { commentID } = useContext(commentContext);
  const token = JSON.parse(localStorage.getItem("token"));
  const url = `http://localhost:4000/api/v1/comments/${commentID}`;
  const sendReply = async () => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(replyBody),
      });
      const newObj = await response.json();
      if (response.status === 200) {
        updateCommentList(newObj, commentsList, setCommentsList);
        showNetworkResponse("reply added");
        setTimeout(() => {
          showNetworkResponse("");
        }, 2000);
      } else {
        showNetworkResponse(newObj);
        setTimeout(() => {
          showNetworkResponse("");
        }, 2000);
      }
    } catch (error) {
      error.message && showNetworkResponse(error.message);
      setTimeout(() => {
        showNetworkResponse("");
      }, 2000);
      console.log(error);
    }
  };
  return (
    <button
      className="comment-send"
      disabled={replyBody.text.trim().length > 0 ? false : true}
      onClick={(e) => {
        e.preventDefault();
        setReplyInput("");
        sendReply();
      }}
    >
      SEND
    </button>
  );
};

export const EditBtn = ({ body, setReplyInput }) => {
  const { objNature, localCommentID } = useContext(localCommentProps);
  const { commentsList, setCommentsList } = useContext(CommentsProvider);
  const token = JSON.parse(localStorage.getItem("token"));
  const editCommentUrl = `http://localhost:4000/api/v1/comments/updatecomment/${localCommentID}`;
  const editReplyUrl = `http://localhost:4000/api/v1/comments/updatereply/${localCommentID}`;
  const url = objNature === "comment" ? editCommentUrl : editReplyUrl;
  const sendEdit = async () => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const newObj = await response.json();
      updateCommentList(newObj, commentsList, setCommentsList);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="comment-send"
      disabled={body.text.trim().length ? false : true}
      onClick={(e) => {
        e.preventDefault();
        body.text = `Edit:  \n ${body.text}`;
        setReplyInput("");
        sendEdit();
      }}
    >
      EDIT
    </button>
  );
};
export const LikeAndUnlikeBtn = () => {
  const { objNature, localCommentID, islike } = useContext(localCommentProps);
  const { commentsList, setCommentsList, userInfo } =
    useContext(CommentsProvider);
  const userID = userInfo.userID;
  const token = JSON.parse(localStorage.getItem("token"));
  const url = `http://localhost:4000/api/v1/comments/like/${localCommentID}`;
  const body = { userID: userID, duty: objNature };
  const sendlike = async () => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const newObj = await response.json();
      updateCommentList(newObj, commentsList, setCommentsList);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        sendlike();
      }}
    >
      {islike ? (
        <img src="./images/icon-like.svg" alt="like" className="icon-like" />
      ) : (
        <img
          src="./images/icon-unlike.svg"
          alt="unlike"
          className="icon-like"
        />
      )}
    </button>
  );
};

export const DeleteBtn = () => {
  const { objNature, localCommentID } = useContext(localCommentProps);
  const { commentsList, setCommentsList, showNetworkResponse } =
    useContext(CommentsProvider);
  const deleteCommentUrl = `http://localhost:4000/api/v1/comments/${localCommentID}`;
  const deleteReplyUrl = `http://localhost:4000/api/v1/comments/deletereply/${localCommentID}`;
  const url = objNature === "comment" ? deleteCommentUrl : deleteReplyUrl;
  const token = JSON.parse(localStorage.getItem("token"));
  // const url = `http://localhost:4000/api/v1/comments/${localCommentID}`;
  const deletefunc = async () => {
    try {
      const data = await fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const response = await data.json();
      if (data.status === 200) {
        if (response.type === "comment") {
          const newObj = response.comment; // maybe return the comment_.id from the BE instead of th whole object
          const newArray = commentsList.filter((comment) => {
            return comment._id !== newObj._id;
          });
          setCommentsList(newArray);
          showNetworkResponse("comment deleted");
          setTimeout(() => {
            showNetworkResponse("");
          }, 2000);
        } else if (response.type === "reply") {
          const newObj = response.comment;
          updateCommentList(newObj, commentsList, setCommentsList);
          showNetworkResponse("comment deleted");
          setTimeout(() => {
            showNetworkResponse("");
          }, 2000);
        }
      } else {
        showNetworkResponse(response);
        setTimeout(() => {
          showNetworkResponse("");
        }, 2000);
      }
    } catch (error) {
      error.message && showNetworkResponse(error.message);
      setTimeout(() => {
        showNetworkResponse("");
      }, 2000);
      console.log(error);
    }
  };
  return (
    <div
      className="icon-delete"
      onClick={(e) => {
        e.preventDefault();
        deletefunc();
      }}
    >
      <IconContext.Provider value={{ className: "icons" }}>
        <AiOutlineDelete size={20} />
      </IconContext.Provider>
    </div>
  );
};
