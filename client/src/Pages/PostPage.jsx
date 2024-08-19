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
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);
  if (!postInfo) return "";

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/post/${id}`, {
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
          <p className="text-gray-800 text-base font-medium lowercase">
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
              src={`http://localhost:4000/${postInfo.cover}`}
              alt="article photo"
              className="object-contain w-full h-full "
            />
          </div>

          <div className="">
            <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex leading-normal">
              <div className="">
                <div className="max-w-3xl">
                  <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
