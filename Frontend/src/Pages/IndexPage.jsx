import  { useEffect, useState } from "react";

import Post from "../Componets/Post";


const IndexPage = () => {
  const Backend_URL = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  //requesting for the all post
  useEffect(() => {
    fetch(`${Backend_URL}/post`).then((response) => {
      response.json().then((posts) => {
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
    
    </>
  );
};

export default IndexPage;
