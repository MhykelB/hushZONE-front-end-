import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

export default function NavBar({ username }) {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="nav-bar">
      <div className="greeting">
        {" "}
        <span> hello</span> {username[0].toUpperCase() + username.slice(1)}
      </div>
      {!toggleMenu && (
        <div
          className="menu-btn"
          onClick={() => {
            setToggleMenu(true);
          }}
        >
          <AiOutlineMenu />
        </div>
      )}

      {toggleMenu && (
        <div className="log-out-section">
          <LogOutBtn />
          <div
            className="close-btn"
            onClick={() => {
              setToggleMenu(false);
            }}
          >
            <AiOutlineClose size={23} />{" "}
          </div>
        </div>
      )}
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
        className=" btn-logout"
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        log out
      </button>
    </>
  );
}
