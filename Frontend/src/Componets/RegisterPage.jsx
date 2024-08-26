import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const register = async (e) => {
    // : Prevents the default form submission behavior, which would cause a page reload
    e.preventDefault();
    // Makes a network request to the specified URL and waits for the response.
    const response = await fetch("https://blogapp-gsdt.onrender.com/register", {
      method: "POST",
      // Sets the request headers, indicating that the request body contains JSON data.
      headers: {
        "Content-Type": "application/json",
      },
      //  Converts the username and password state variables into a JSON string and includes it in the request body.
      body: JSON.stringify({ username, password }),
    });
    // console.log(response)
    if (response.status === 200){
      // alert("Registered Successfully");
      toast.success("Registered Successfully");
      
    } else {
      // alert("Registartion Failed");
      toast.error("Registartion Failed");
    }
  };

  return (
    <>
    <section>
    <div className="mt-28">
      <div className="flex w-96 max-sm:w-72 flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
        <div className="mx-auto mb-2 space-y-3 text-center">
          <h1 className=" text-3xl font-bold text-gray-700">Register</h1>
          <p className="text-gray-500">Register to access your account</p>
        </div>
        <form className="flex flex-col space-y-5 " onSubmit={register}>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
                // Updates the username state when the input value changes.
              }}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="username"
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
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              {" "}
              Enter Password
            </label>
          </div>

          <button className="rounded-lg bg-gray-600 hover:bg-gray-700 py-3 font-bold text-white">
            Register
          </button>
        </form>
      </div>
    </div>
    </section>
    </>
  );
};

export default RegisterPage;
