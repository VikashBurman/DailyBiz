import React, { useEffect, useState } from "react";
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

  return <>
  {posts.length > 0 && posts.map((post) => (<Post {...post}/>))}
  </>;
};

export default IndexPage;
