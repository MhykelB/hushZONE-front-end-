import React from "react";
import { TextWindow, ReplyWindow } from "./textAndReplyWindow";

export const CommentWindow = ({ prop }) => {
  return prop.allComments.map((comment) => {
    const replyArray = comment.replies;
    return (
      <div className="commentAndReply" key={comment._id}>
        <TextWindow commentObj={comment} user={prop.user.username} />
        <div className="Reply">
          {replyArray.length > 0 && <ReplyWindow prop={replyArray} />}
        </div>
      </div>
    );
  });
};

// const ReplyWindow = ({ prop }) => {
//   return prop.map((reply) => {
//     return (
//       <div key={reply._id} className="replyBox">
//         <p>{reply.text}</p>
//       </div>
//     );
//   });
// };

// const TextWindow = ({ commentObj, user }) => {
//   return (
//     <div className="comment">
//       <section className="comment-like-bar">
//         <button>
//           <img src="/images/icon-plus.svg" alt="plus" />
//         </button>
//         <p className="comment-likes">{commentObj.likes}</p>
//         <button>
//           <img src="/images/icon-minus.svg" alt="minus" />
//         </button>
//       </section>
//       <section className="comment-body">
//         <div className="comment-header">
//           <img
//             src={`/images/avatars/image-${user}.png`}
//             alt="picc"
//             className="comment-header-image"
//           />
//           <p className="comment-header-username">{commentObj.created_by}</p>
//           <p className="comment-header-time">{commentObj.createdAt}</p>
//           {user === commentObj.created_by ? (
//             <div className="comment-header-edit">
//               <button className="btn-delete">Delete</button>
//               <button className="btn-edit">Edit</button>
//             </div>
//           ) : (
//             <button className="comment-reply">
//               <img
//                 src="/images/icon-reply.svg"
//                 alt="reply"
//                 className="reply-arrow"
//               />
//               Reply
//             </button>
//           )}
//         </div>
//         <p className="comment-note text">{commentObj.text}</p>
//       </section>
//     </div>
//   );
// };
