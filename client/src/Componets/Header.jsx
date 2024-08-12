import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { json, Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  // const [username, setUserName] = useState(null);
  const{setUserInfo,userInfo} = useContext(UserContext);
   
  //how to know if we are logged in using token
  //It runs after the component renders.
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      //credentials option tells the browser to include cookies (such as the JWT token stored as a cookie) in the request,
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        //The userInfo object should contain the user's information, including the username.
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    //The logout function logs the user out by sending a POST request to the server and then setting the username state to null.
  fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;
  return (
    <header className="flex flex-row items-center justify-between sm:justify-around p-2 border-b-2 bg-gray-100">
      <Link
        to="/"
        className="flex items-center h-10 px-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90"
      >
        MyBlog
      </Link>
      <nav className="hidden sm:flex justify-between items-center gap-4 font-semibold">
        {/* The username variable is used to determine the user's authentication state. 
        If the user is logged in: Show links to create a new post and log out.
        If the user is not logged in: Show links to log in and register.*/}
        {username && (
          <>
            <Link to="/create" className="cursor-pointer">Create new post</Link>
            <a onClick={logout} className="cursor-pointer">Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="hover:text-gray-500">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-500">
              Register
            </Link>
          </>
        )}
      </nav>
      <nav className="sm:hidden flex flex-col items-end gap-1 font-semibold">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="sm:hidden font-bold text-xl hover:text-gray-500"
        >
          {showMenu ? <GrClose /> : <GiHamburgerMenu />}
        </button>
        {showMenu && (
          <>
            <Link to="/login" className="hover:text-gray-500">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-500">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
