import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { PiLightbulbFilamentThin } from "react-icons/pi";
import { PiLightbulbFill } from "react-icons/pi";
import { CommentsProvider } from "../pages/chatpage";
import { IconContext } from "react-icons";

export default function NavBar({ username }) {
  const { darkMode, setDarkMode } = useContext(CommentsProvider);
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
          <i
            className="light-bulb"
            onClick={() => {
              setDarkMode((prev) => {
                return !prev;
              });
            }}
          >
            <IconContext.Provider
              value={
                darkMode ? { className: "dm-on" } : { className: "dm-off" }
              }
            >
              <PiLightbulbFill />
            </IconContext.Provider>
          </i>
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
