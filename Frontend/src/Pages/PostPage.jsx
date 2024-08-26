import React, { useContext, useEffect, useState } from "react";
import { Link, useParams,useNavigate  } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../Componets/UserContext";
import toast, { Toaster } from "react-hot-toast";

//THIS IS EDITPOST PAGE

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`https://blogapp-gsdt.onrender.com/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);
  if (!postInfo) return "";

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://blogapp-gsdt.onrender.com/post/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Post deleted successfully")
        navigate("/"); 
      } else {
        // console.error("Failed to delete the post");
        toast.error("Failed to delete the post")
      }
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  };

  return (
    <>
      <div>
        <div className=" p-5 sm:p-8 md:p-12 relative flex flex-col  justify-center items-center">
          <h1 href="#" className="text-gray-900 font-bold text-4xl text-center">
            {postInfo.title}
          </h1>
          <p className="text-blue-800 text-base font-medium lowercase">
            author:
            {postInfo.author.username}
          </p>
          <time className="text-[10px] max-sm:text-xs  leading-tight  text-gray-400">
            {format(new Date(postInfo.createdAt), "MMM d,yyyy HH:mm")}
          </time>

          {userInfo.id === postInfo.author._id && (
            <div className="items-center text-center my-1">
              <Link
                to={`/edit/${postInfo._id}`}
                className=" py-1.5 px-3 inline-flex items-center font-medium text-sm rounded-md bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Edit this post
              </Link>
              <button
                onClick={handleDelete}
                className="ml-2 py-1.5 px-3 inline-flex items-center font-medium text-sm rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Delete
              </button>
            </div>
          )}
          <div
            className="h-64 text-center  overflow-hidden"
            style={{ height: "300px" }}
          >
            <img
              src={`https://blogapp-gsdt.onrender.com/${postInfo.cover}`}
              alt="article photo"
              className="object-contain w-full h-full "
            />
          </div>

          <div className="">
            <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex  p-4 shadow-lg leading-normal">
                <div className="max-w-4xl">
                  <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                </div>
              
            </div>
          </div>
        </div>
      </div>
      <footer class="bg-white">
        <div class="container px-6 py-8 mx-auto">
          <div class="flex flex-col items-center text-center">
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
            <p class="max-w-md mx-auto  text-gray-500 ">
            Explore, share, and manage insightful articles on DailyBiz
            </p>
          </div>

          <hr class="my-6 border-gray-200 " />

          <div class="flex flex-col items-center sm:flex-row sm:justify-between">
            <p class="text-sm text-gray-500">
              © Copyright 2024. All Rights Reserved.
            </p>

            <div class="flex mt-3 -mx-2 sm:mt-0">
              <a
                href="#"
                class="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 "
                aria-label="Reddit"
              >
                {" "}
                Teams{" "}
              </a>

              <a
                href="#"
                class="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 "
                aria-label="Reddit"
              >
                {" "}
                Privacy{" "}
              </a>

              <a
                href="#"
                class="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 "
                aria-label="Reddit"
              >
                {" "}
                Cookies{" "}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PostPage;
