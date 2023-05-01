import React from "react";
import { useContext } from "react";
import { CommentsProvider } from "../pages/chatpage";
import { commentContext } from "./chatsWindow";

// const commentsUrl = "http://localhost:4000/api/v1/comments";

// const fetchAndUpdateComments = async (url) => {
//   const token = JSON.parse(localStorage.getItem("token"));
//   const data = await fetch(url, {
//     method: "GET",
//     headers: { authorization: `Bearer ${token}` },
//   });
//   const chatArray = await data.json();
//   // updateComments.setAllComments(chatArray);
//   return chatArray;
// };
export const SendCommentBtn = ({ userText, clearInput }) => {
  const { allCommentsAndUserDetails, setAllComments } =
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
      const addedCommentObj = await response.json();
      if (response.status === 201) {
        const newChatArray = allCommentsAndUserDetails.allComments.concat([
          addedCommentObj,
        ]);
        setAllComments((prev) => {
          return { ...prev, allComments: newChatArray };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="comment-send send"
      onClick={(e) => {
        e.preventDefault();
        if (userText.trim().length > 0) {
          postText();
          clearInput("");
        } else {
          console.log("text cant be empty");
        }
      }}
    >
      SEND
    </button>
  );
};

export const SendReplyBtn = ({ replyBody, setReplyInput }) => {
  const { allCommentsAndUserDetails, setAllComments, setShowResponseBox } =
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
      const newArray = allCommentsAndUserDetails.allComments.map((comment) => {
        if (comment._id === newObj._id) {
          return newObj;
        } else {
          return comment;
        }
      });
      setAllComments((prev) => {
        return { ...prev, allComments: newArray };
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="comment-send send"
      onClick={(e) => {
        e.preventDefault();
        if (replyBody.text.trim().length > 0) {
          setShowResponseBox((prev) => {
            return `${prev} a`;
          });
          setReplyInput("");
          sendReply();
        } else {
          console.log("text cant be empty");
        }
      }}
    >
      SEND
    </button>
  );
};

export const EditBtn = ({ body, setReplyInput, isAReply, commentID }) => {
  console.log({ body, setReplyInput, isAReply, commentID });
  const { allCommentsAndUserDetails, setAllComments, setShowResponseBox } =
    useContext(CommentsProvider);
  const token = JSON.parse(localStorage.getItem("token"));
  const editCommentUrl = `http://localhost:4000/api/v1/comments/updatecomment/${commentID}`;
  const editReplyUrl = `http://localhost:4000/api/v1/comments/updatereply/${commentID}`;
  console.log(isAReply);

  const url = isAReply ? editReplyUrl : editCommentUrl;
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
      console.log(newObj);
      const newArray = allCommentsAndUserDetails.allComments.map((comment) => {
        if (comment._id === newObj._id) {
          return newObj;
        } else {
          return comment;
        }
      });
      setAllComments((prev) => {
        return { ...prev, allComments: newArray };
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="comment-send send"
      onClick={(e) => {
        e.preventDefault();
        if (body.text.trim().length > 0) {
          body.text = `Edit:  \n ${body.text}`;
          setShowResponseBox((prev) => {
            return `${prev} a`;
          });
          setReplyInput("");
          sendEdit();
        } else {
          console.log("text cant be empty");
        }
      }}
    >
      EDIT
    </button>
  );
};
export const LikeAndUnlikeBtn = ({ islike, textNature, textID }) => {
  const { allCommentsAndUserDetails, setAllComments } =
    useContext(CommentsProvider);
  // const { commentID } = useContext(commentContext);
  const userID = allCommentsAndUserDetails.user.userID;
  const token = JSON.parse(localStorage.getItem("token"));
  const url = `http://localhost:4000/api/v1/comments/like/${textID}`;
  const body = { userID: userID, duty: textNature };
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
      const newArray = allCommentsAndUserDetails.allComments.map((comment) => {
        if (comment._id === newObj._id) {
          return newObj;
        } else {
          return comment;
        }
      });
      setAllComments((prev) => {
        return { ...prev, allComments: newArray };
      });
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
        <img src="./images/icon-like.svg" alt="like" />
      ) : (
        <img src="./images/icon-unlike.svg" alt="unlike" />
      )}
    </button>
  );
};

export const DeleteBtn = ({ url }) => {
  const { allCommentsAndUserDetails, setAllComments } =
    useContext(CommentsProvider);
  const token = JSON.parse(localStorage.getItem("token"));
  // const url = `http://localhost:4000/api/v1/comments/${commentID}`;
  const deletefunc = async () => {
    const data = await fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const response = await data.json();
    console.log(response);

    if (data.status === 200) {
      console.log(response.message);
      if (response.type === "comment") {
        const newObj = response.comment;
        const newArray = allCommentsAndUserDetails.allComments.filter(
          (comment) => {
            return comment._id !== newObj._id;
          }
        );
        return setAllComments((prev) => {
          return { ...prev, allComments: newArray };
        });
      } else if (response.type === "reply") {
        const newObj = response.comment;
        const newArray = allCommentsAndUserDetails.allComments.map(
          (comment) => {
            if (comment._id === newObj._id) {
              return newObj;
            } else {
              return comment;
            }
          }
        );
        setAllComments((prev) => {
          return { ...prev, allComments: newArray };
        });
      }
    }
  };
  return (
    <button
      className="btn-delete"
      onClick={(e) => {
        e.preventDefault();
        deletefunc();
      }}
    >
      Delete
    </button>
  );
};
