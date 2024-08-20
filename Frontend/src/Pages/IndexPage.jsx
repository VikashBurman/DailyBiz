import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import Post from "../Componets/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        // console.log(posts);4
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      <div className="py-5">
      {posts.length > 0 &&
        posts.map((post, index) => <Post key={post.id || index} {...post} />)}
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

export default IndexPage;
