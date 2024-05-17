import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for styling
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocused, setInputFocused] = useState("");

  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputFocus = (inputName) => {
    setInputFocused(inputName);
  };

  const handleInputBlur = () => {
    setInputFocused("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });

      if (response.data.status === "failure") {
        alert(response.data.message);
        return;
      }
      else{
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        navigate("/home");
        alert("User logged in successfully");
      }

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 font-poppins">
      <div className="bg-white w-full max-w-md p-8 rounded-lg">
        <form onSubmit={handleSubmit}>
          <span className="block text-3xl font-semibold mb-6 text-center">Login</span>
          <div className="mb-6 relative">
            <IoMailOutline
              className={`absolute top-1/2 left-1 transform -translate-y-1/2 text-gray-400 text-lg ${
                inputFocused === "email" ? "text-blue-600" : ""
              }`}
              size={24}
              style={{ color: inputFocused === "email" ? "#2563EB" : "" }}
            />
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none`}
              onFocus={() => handleInputFocus("email")}
              onBlur={handleInputBlur}
            />
          </div>
          <div className="relative mb-6">
            <IoLockClosedOutline
              className={`absolute top-1/2 left-1 transform -translate-y-1/2 text-gray-400 text-lg ${
                inputFocused === "password" ? "text-blue-600" : ""
              }`}
              size={24}
              style={{ color: inputFocused === "password" ? "#2563EB" : "" }}
            />
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full pl-10 px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleInputFocus("password")}
              onBlur={handleInputBlur}
            />
            <i
              className={`absolute top-1/2 transform -translate-y-1/2 right-0 text-gray-500 cursor-pointer`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaRegEyeSlash size={23} style={{ color: inputFocused === "password" ? "#2563EB" : "" }} />
              ) : (
                <FaRegEye size={23} style={{ color: inputFocused === "password" ? "#2563EB" : "" }} />
              )}
            </i>
          </div>
          <div className="mb-4">
            <input
              type="submit"
              value="Login"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 cursor-pointer transition duration-300"
            />
          </div>
        </form>
        <div className="text-center">
          <span className="text-sm text-gray-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Signup Now
            </Link>
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
