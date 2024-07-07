import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./Componets/RegisterPage";
import LoginPage from "./Componets/LoginPage";
import Layout from "./Componets/Layout";
import IndexPage from "./Pages/IndexPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
