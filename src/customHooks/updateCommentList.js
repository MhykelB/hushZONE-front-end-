// import { useContext } from "react";
// import { CommentsProvider } from "../pages/chatpage";

export const updateCommentList = (newObj, List, setList) => {
  // const { commentsList, setCommentsList } = useContext(CommentsProvider);
  const newArray = List.map((comment) => {
    if (comment._id === newObj._id) {
      return newObj;
    } else {
      return comment;
    }
  });
  return setList(newArray);
};
export const useDateCoverter = (timeStamp) => {
  const ff = Date.now();
  const gg = new Date(timeStamp).getTime();
  const diff = (ff - gg) * 0.00000027777778;
  // console.log(diff);
  const result = {
    toMinutes: Math.round(diff * 60),
    toDays: Math.round(diff / 24),
    toWeeks: Math.round(diff / 168),
    toMonths: Math.round(diff / 744),
    toYear: Math.round(diff / 8784),
  };
  if (diff < 0.5) {
    return `1 minute(s) ago`;
  } else if (diff >= 0.5 && diff < 1) {
    return `${result.toMinutes} minute(s) ago`;
  } else if (diff >= 24 && diff < 168) {
    return `${result.toDays} day(s) ago`;
  } else if (diff >= 168 && diff < 744) {
    return `${result.toWeeks} week(s) ago`;
  } else if (diff >= 744 && diff < 8784) {
    return `${result.toMonths} month(s) ago`;
  } else if (diff >= 8784) {
    return `${result.toYear} year(s) ago`;
  } else {
    return `${Math.round(diff)} hour(s) ago`;
  }
};
