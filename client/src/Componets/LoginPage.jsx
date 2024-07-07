import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const[username,setUserName] = useState("");
  const[password,setPassword] = useState("");
  const[redirect,setRedirect] = useState(false)
  const navigate = useNavigate();


  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials:'include' //to save cookie
    });
    // console.log(response)
    if(response.ok){
        setRedirect(true)
    }else{
      alert('wrong credentials');
    }
  };
  if(redirect){
    return  navigate('/');
  }
  return (
    <div class="mt-28 ">
      <div class="flex w-96 max-sm:w-72  flex-col space-y-5 rounded-lg border py-10 px-5 shadow-xl mx-auto">
        <div class="mx-auto mb-2 space-y-3 text-center">
          <h1 class=" text-3xl font-bold text-gray-700">Log in</h1>
          <p class="text-gray-500">Login to access your account</p>
        </div>
        <form className="flex flex-col space-y-5" onSubmit={login}>
          <div class="relative mt-2 w-full">
            <input
              type="text"
              id="email"
              class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              value={username}
            onChange={(e)=>{
              setUserName(e.target.value);
            }}
            />
            <label
              for="email"
              class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              {" "}
              Enter Username{" "}
            </label>
          </div>

          <div class="relative mt-2 w-full">
            <input
              type="text"
              id="password"
              class="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              placeholder=" "
              value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            />
            <label
              for="password"
              class="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              {" "}
              Enter Password
            </label>
          </div>

          <button class="rounded-lg bg-gray-600 py-3 font-bold text-white">
            Login
          </button>
          </form>
      </div>
    </div>
  );
};

export default LoginPage;
