import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Shimmer from "./Shimmer";

const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  const [postData, setPostData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          _id,
          title,
          summary,
          cover,
          createdAt,
          author,
        };

        setTimeout(() => {
          setPostData(data);
          setIsLoading(false); 
        }, 2000); 
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchData();
  }, [_id, title, summary, cover, createdAt, author]);
  if (isLoading) {
    return <Shimmer />;
  }

  return (
    <div className="mx-auto md:max-w-[58rem] px-4 py-10 sm:px-6 lg:px-4 lg:py-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-xl">
      <div className="flex flex-col gap-6 border-gray-300 sm:p-2">
        <div className="group flex flex-col rounded-xl focus:outline-none sm:flex-row">
          <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-xl sm:h-[250px] sm:w-[350px]">
            <img
              className="absolute w-full h-full"
              src={`${import.meta.env.VITE_BACKEND_URL}/${postData.cover}`}
              alt={`${postData.title} Cover`}
            />
          </div>
          <Link to={`/post/${postData._id}`}>
            <div className="flex grow flex-col p-4 sm:p-6 max-sm:p-1">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 focus:text-blue-600 sm:text-2xl max-sm:text-lg">
                {postData.title}
              </h3>
              <p className="mt-2 text-gray-600 max-sm:text-sm max-sm:leading-tight">
                {postData.summary}
              </p>

              <div className="mt-5">
                <div className="flex items-center">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 max-sm:text-xs">
                      by {postData.author.username}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {format(new Date(postData.createdAt), "MMM d, yyyy HH:mm")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
