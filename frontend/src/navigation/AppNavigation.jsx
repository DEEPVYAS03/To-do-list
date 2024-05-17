import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import { useAuth } from "../context/authContext";

const AppNavigation = () => {
  const { token } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppNavigation;
