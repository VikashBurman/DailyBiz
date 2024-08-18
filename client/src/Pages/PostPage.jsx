import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import {UserContext} from "../Componets/UserContext"

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const{userInfo} = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);
  if (!postInfo) return "";
  return (
    <>
      <div>
        <div class="max-w-screen-xl mx-auto p-5 sm:p-8 md:p-12 relative">
          <h1 href="#" class="text-gray-900 font-bold text-3xl text-center">
            {postInfo.title}
          </h1>
          <p className="text-center">
            <time className="text-sm max-sm:text-xs  text-gray-400">
              {format(new Date(postInfo.createdAt), "MMM d,yyyy HH:mm")}
            </time>
          </p>
          {
            userInfo.id === postInfo.author._id && (
              <div className="items-center text-center my-2">
              <Link to={`/edit/${postInfo._id}`} className=" py-1.5 px-3 inline-flex items-center font-medium text-sm rounded-md bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none">Edit this post</Link>
              </div>
            )
          }
          <div
            className="h-64 text-center  overflow-hidden"
            style={{ height: "300px" }}
          >
            <img
              src={`http://localhost:4000/${postInfo.cover}`}
              alt="Description"
              className="object-cover w-full h-full "
            />
          </div>

          <div class="  mx-auto">
            <div class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex leading-normal">
              <div class="">
                <p class="text-gray-800 font-bold text-base">
                  author:
                  <a
                    href="#"
                    class="text-blue-600 font-medium  hover:text-blue-700 transition duration-500 ease-in-out"
                  >
                    {postInfo.author.username}
                  </a>
                </p>

                <p class="text-base leading-8 my-5">
                  <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;