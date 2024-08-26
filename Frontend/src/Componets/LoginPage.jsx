import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  // A hook from React Router that allows you to programmatically navigate between routes.
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    // The await keyword is used to wait for the response before proceeding.
    const response = await fetch("https://blogapp-gsdt.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //Converts the username and password variables into a JSON string to be sent as the request body.
      body: JSON.stringify({ username, password }),
      credentials: "include", //to save cookie
      //Ensures that cookies are included in the request, allowing the server to save and use cookies for session management or authentication.
    });
    // console.log(response)
    if (response.ok) {
      //if login is succesfull
      toast.success("login Succesfully");
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      //if login is failed
      // alert("wrong credentials");
      toast.error("wrong credentials");
    }
  };
  //: If redirect is true, navigate to the home route ('/').
  useEffect(() => {
    if (redirect) {
      navigate("/"); // Perform navigation after render
    }
  }, [redirect, navigate]); // Dependency array

  return (
    <>
      <div className="mt-28 ">
        <div className="flex w-96 max-sm:w-72  flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
          <div className="mx-auto mb-2 space-y-3 text-center">
            <h1 className=" text-3xl font-bold text-gray-700">Log in</h1>
            <p className="text-gray-500">Login to access your account</p>
          </div>
          <form className="flex flex-col space-y-5" onSubmit={login}>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="email"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <label
                htmlFor="email"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                {" "}
                Enter Username{" "}
              </label>
            </div>

            <div className="relative mt-2 w-full">
              <input
                type="password"
                id="password"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label
                htmlFor="password"
                className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
              >
                {" "}
                Enter Password
              </label>
            </div>

            <button className="rounded-lg bg-gray-600 hover:bg-gray-700  py-3 font-bold text-white">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
