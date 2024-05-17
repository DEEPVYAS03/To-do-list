import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import { useState } from "react";

const AppNavigation = () => {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home /> } />
      </Routes>
    </Router>
  );
};

export default AppNavigation;
