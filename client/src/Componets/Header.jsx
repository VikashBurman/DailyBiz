import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { json, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  // const [username, setUserName] = useState(null);
  const { setUserInfo, userInfo } = useContext(UserContext);

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
    toast.success("logout Sucessfully");
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <header className="flex justify-around p-2 border-b-2 max-sm:justify-between">
        <Link
          to="/"
          className="flex items-center  px-10  font-bold   hover:opacity-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
            />
          </svg>
          DailyBiz
        </Link>
        <nav className="hidden sm:flex justify-between items-center gap-2  font-semibold">
          {/* The username variable is used to determine the user's authentication state. 
        If the user is logged in: Show links to create a new post and log out.
        If the user is not logged in: Show links to log in and register.*/}
          {username && (
            <>
              {/* <span>Hello {username}</span> */}
              <Link
                to="/create"
                className="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Create new post
              </Link>
              <Link
                onClick={logout}
                to={'/'}
                className="hover:text-gray-700 py-[7px] px-2.5 cursor-pointer inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 "
              >
                Logout
                <span className="text-gray-500 px-1 ">({username})</span>
              </Link>
            </>
          )}
          {!username && (
            <>
              <Link
                to="/login"
                className="hover:text-gray-700 py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100  "
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-700 py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 "
              >
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
              {!username && (
                <>
                  <Link
                    to="/login"
                    className="hover:text-gray-700 py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 "
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="hover:text-gray-700 py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 "
                  >
                    Register
                  </Link>
                </>
              )}
              {username && (
                <>
                  <Link
                to="/create"
                    className="hover:text-gray-700 py-[7px] px-2.5 inline-flex items-center max-sm:text-xs font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 "
                  >
                    Create new post
                  </Link>
                  <Link
                    to={'/'}
                     onClick={logout}
                     
                    className="hover:text-gray-700 py-[7px] px-2.5 inline-flex items-center max-sm:text-xs font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 "
                  >
                    logout
                    <span className="text-gray-500 px-1 max-sm:text-xs">({username})</span>
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
