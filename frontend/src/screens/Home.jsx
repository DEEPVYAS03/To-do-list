import React from "react";
import image from "../assets/images.png";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline, MdOutlineLogout } from "react-icons/md"; // Import the MdOutlineLogout icon
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("User logged out successfully");
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-blue-500 font-poppins">
      <div
        className="top-5 right-5 bg-white p-2 rounded-lg hover:font-semibold hover:shadow-md cursor-pointer absolute flex items-center"
        onClick={handleLogout}
      >
        {/* Place the MdOutlineLogout icon next to the "Logout" text */}
        <span>Logout</span>
        <MdOutlineLogout className="text-black ml-2" size={20} />
      </div>
      <div className="p-8 rounded-lg -mt-60 bg-white flex items-center ">
        <div className="">
          <div className="flex items-center">
            <div className="text-xl font-semibold">To-do List</div>
            <img src={image} alt="Icon" className="w-5 h-5 ml-2 " />
          </div>

          {/* adding todos */}
          <div className="flex justify-center w-full mt-2">
            <input
              type="text"
              placeholder="Add a new todo"
              className="min-w-[8rem] sm:min-w-[10rem] md:min-w-96 px-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
            />
            <button className="bg-blue-500 text-white py-2 px-4 rounded ml-10 hover:bg-blue-600">
              Add
            </button>
          </div>

          {/* display todos */}
          <div className="flex flex-col mt-6">
            <div>
              <span className="border-b-2">Active Todos</span>
            </div>

            {/* todo */}
            <div className="flex items-center mt-3 justify-between">
              <div>Task Name</div>
              <div className="flex gap-3">
                <IoIosCheckmarkCircleOutline
                  className="text-green-500 mr-2"
                  size={25}
                />
                <FiEdit3 className="text-blue-500 mr-2" size={25} />
                <MdDeleteOutline className="text-red-500" size={25} />
              </div>
            </div>
          </div>

          {/* completed todos */}
          <div className="mt-4">
            <div>
              <span className="border-b-2 ">Completed Todos</span>
            </div>

            {/* todo */}
            <div className="flex items-center mt-3 justify-between">
              <div className="line-through text-gray-500">Task Name</div>
              <div className="flex gap-3">
                <IoIosCheckmarkCircle
                  className="text-green-500 mr-2"
                  size={25}
                />
                <FiEdit3 className="text-blue-500 mr-2" size={25} />
                <MdDeleteOutline className="text-red-500" size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
