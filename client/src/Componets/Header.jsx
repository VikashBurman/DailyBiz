import React, { useEffect } from "react";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { json, Link } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [username, setUserName] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserName(userInfo.username)
      });
    });
  }, []);

  const logout =()=>{
    fetch('http://localhost:4000/logout',{
      credentials:'include',
      method:'POST'
    })
    setUserName(null)
  }

  return (
    <header className="flex flex-row items-center justify-between sm:justify-around p-2 border-b-2 bg-gray-100">
      <Link
        to="/"
        className="flex items-center h-10 px-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90"
      >
        MyBlog
      </Link>
      <nav className="hidden sm:flex justify-between items-center gap-4 font-semibold">
        {username && (
          <>
            <Link to = '/create'>Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username &&(
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
