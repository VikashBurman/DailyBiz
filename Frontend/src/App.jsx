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
          <Route path="/" element={<Layout />}>
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
