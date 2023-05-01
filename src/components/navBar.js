import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({ username }) {
  return (
    <nav>
      <div> hello {username}</div>
      <LogOutBtn />
    </nav>
  );
}

export function LogOutBtn() {
  const navigate = useNavigate();
  const signOut = function () {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <button
        className=" btn logout"
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      ></button>
    </>
  );
}
