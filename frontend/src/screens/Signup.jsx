import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEnvelope, FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocused, setInputFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

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

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0 && termsAccepted) {
      try {
        navigate("/");
        console.log("User registered successfully");
      } catch (err) {
        alert(err.message);
      }
    } else {
      const errorMessage =
        validationErrors.general || Object.values(validationErrors).join("\n");
      setModalContent(errorMessage);
      setShowModal(true);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!name.trim() ||!email.trim() ||!password.trim()) {
      errors.general = "All fields are required";
    } else {
      if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
      }
      if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    }
    if (!termsAccepted) {
      errors.terms = "Please accept all terms and conditions";
    }
    return errors;
  };

  const ErrorModal = ({ content, onClose }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p>{content}</p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 font-poppins">
      <div className="bg-white w-full max-w-md mx-auto sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg p-4 sm:p-8 rounded-lg">
        <form onSubmit={handleSubmit}>
          <span className="block text-3xl font-semibold mb-6 text-center">
            Registration
          </span>
          <div className="mb-6 relative">
            <FiUser
              className={`absolute top-1/2 left-1 transform -translate-y-1/2 text-gray-400 text-lg ${
                inputFocused === "name"? "text-blue-600" : ""
              }`}
              size={24}
              style={{ color: inputFocused === "name"? "#2563EB" : "" }}
            />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full pl-10 px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none ${
                submitted &&!name.trim()? "border-red-500" : ""
              }`}
              onFocus={() => handleInputFocus("name")}
              onBlur={handleInputBlur}
            />
          </div>
          <div className="mb-6 relative">
            <IoMailOutline
              className={`absolute top-1/2 left-1 transform -translate-y-1/2 text-gray-400 text-lg ${
                inputFocused === "email"? "text-blue-600" : ""
              }`}
              size={24}
              style={{ color: inputFocused === "email"? "#2563EB" : "" }}
            />
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none ${
                submitted && (!email.trim() ||!/\S+@\S+\.\S+/.test(email))
                 ? "border-red-500"
                  : ""
              }`}
              onFocus={() => handleInputFocus("email")}
              onBlur={handleInputBlur}
            />
          </div>
          <div className={`mb-6 relative ${inputFocused === "password"? "focused" : ""}`}>
            <IoLockClosedOutline
              className={`absolute top-1/2 left-1 transform -translate-y-1/2 text-gray-400 text-lg ${
                inputFocused === "password"? "text-blue-600" : ""
              }`}
              size={24}
              style={{ color: inputFocused === "password"? "#2563EB" : "" }}
            />
            <input
              type={showPassword? "text" : "password"}
              className={`w-full pl-10 px-3 py-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none ${
                submitted && (!password.trim() || password.length < 6)
                 ? "border-red-500"
                  : ""
              }`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleInputFocus("password")}
              onBlur={handleInputBlur}
            />
            <i
              className={`absolute top-1/2 transform -translate-y-1/2 right-0 text-gray-500 cursor-pointer ${
                inputFocused === "password"? "text-blue-600" : ""
              }`}
              onClick={togglePasswordVisibility}
            >
              {showPassword? (
                <FaRegEyeSlash size={23} style={{ color: inputFocused === "password"? "#2563EB" : "" }} />
              ) : (
                <FaRegEye size={23} style={{ color: inputFocused === "password"? "#2563EB" : "" }} />
              )}
            </i>
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="termCon"
              className="mr-2"
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="termCon" className="text-sm text-gray-700">
              I accept all terms and conditions
            </label>
          </div>
          {submitted &&!termsAccepted && (
            <p className="text-red-500 text-sm mb-4">
              Please accept all terms and conditions
            </p>
          )}
          <div className="mb-6">
            <input
              type="submit"
              value="Signup"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 cursor-pointer transition duration-300"
            />
          </div>
        </form>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-700">
            Already a member?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Login Now
            </Link>
          </span>
        </div>

        {showModal && (
          <ErrorModal
            content={modalContent}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Signup;
