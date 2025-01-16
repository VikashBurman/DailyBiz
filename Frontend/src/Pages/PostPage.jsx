import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../Componets/UserContext";
import toast from "react-hot-toast";
import ShimmerPostPage from "../Componets/ShimmerPostPage";

//after main page

const PostPage = () => {
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${Backend_URL}/post/${id}`);
        const data = await response.json();
        setPostInfo(data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [id, Backend_URL]);

  // Render shimmer until data is fetched
  if (!postInfo) {
    return <ShimmerPostPage />;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`${Backend_URL}/post/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Post deleted successfully");
        navigate("/");
      } else {
        toast.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  };

  return (
    <div>
      <div className="p-6 sm:p-10 md:p-14 flex flex-col items-center bg-gray-50 rounded-xl shadow-lg">
        <h1 className="text-gray-800 font-extrabold text-3xl md:text-5xl text-center leading-tight">
          {postInfo.title}
        </h1>
        <div className="flex flex-col items-center mt-4">
          <p className="text-blue-600 text-sm md:text-base font-medium">
            Author:{" "}
            <span className="capitalize">{postInfo.author.username}</span>
          </p>
          <time className="text-xs md:text-sm text-gray-500">
            {format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm")}
          </time>
        </div>
        {userInfo.id === postInfo.author._id && (
          <div className="flex gap-4 mt-6">
            <Link
              to={`/edit/${postInfo._id}`}
              className="px-5 py-2 bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition"
            >
              Edit Post
            </Link>
            <button
              onClick={handleDelete}
              className="px-5 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition"
            >
              Delete Post
            </button>
          </div>
        )}

        <div className="w-[500px] h-[500px] mt-6 mx-auto rounded-lg overflow-hidden shadow-md">
          <img
            src={`${Backend_URL}/${postInfo.cover}`}
            alt="Article Cover"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
          <div
            className="text-gray-800 leading-relaxed text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
