import { useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  // console.log(URL);

  const register = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${Backend_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registered Successfully");
        console.log("Registration successful:", data);
      } else {
        toast.error(data.message || "Registration Failed");
        console.error("Registration error:", data);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong! Please try again.");
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
