import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./Componets/RegisterPage";
import LoginPage from "./Componets/LoginPage";
import Layout from "./Componets/Layout";
import IndexPage from "./Pages/IndexPage";
import { UserContextProvider } from "./Componets/UserContext";
import CreatePost from "./Pages/CreatePost";
import PostPage from "./Pages/PostPage";
import EditPost from "./Pages/EditPost";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          {/* This route also acts as a parent route that can nest other routes inside it.
       The Layout component will always be rendered when the root path or any nested path is matched. */}
          <Route path="/" element={<Layout />}>
            {/* The index prop indicates that this route should match exactly when the parent path is matched (i.e., "/"). */}
            {/* It renders the IndexPage component when the URL is exactly "/" */}
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
};

export default App;
