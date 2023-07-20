import React from "react";
import { Link } from "react-router-dom";
import { BsFillEmojiAngryFill } from "react-icons/bs";
import { AiOutlineAlipayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

export function DefaultErrorPage() {
  return (
    <div className="errorPage">
      <p className="error-code"> Error: 500</p>

      <BsFillEmojiAngryFill size={"30rem"} className="emoji angry" />
      <p>
        OOps !!!
        <span> something went wrong</span>{" "}
      </p>
      <Link to="/login">
        <button className="back-btn">back to login</button>
      </Link>
    </div>
  );
}
