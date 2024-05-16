import React, { useEffect, useState } from "react";
import image from "../assets/images.png";
import {
  IoIosCheckmarkCircleOutline,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline, MdOutlineLogout } from "react-icons/md"; // Import the MdOutlineLogout icon
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

const Home = () => {
  const [title, setTitle] = useState("");
  // const [todos, setTodos] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]); 
  const [completedTodos, setCompletedTodos] = useState([]); 
  const userId = localStorage.getItem("userId");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getTodos/${userId}`
      );
      console.log(response.data);

      setActiveTodos(response.data.todos.filter((todo) => !todo.status));
      setCompletedTodos(response.data.todos.filter((todo) => todo.status));


    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("User logged out successfully");
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };


  const statusUpdate = async (todoId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/update/status/${todoId}`);
      console.log(response.data);
      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };


  const handleAdd = async () => {
    if (!title) {
      setIsModalOpen(true);
      return;
    }
    const response = await axios.post("http://localhost:5000/api/create/todo", {
      title,
      userId,
    });
    console.log(response.data);
    fetchTodos();
    setTitle("");
  };

  const handleDelete = async (todoId) => {

    try {
      console.log(todoId);
      const response = await axios.delete(
        `http://localhost:5000/api/delete/todo/${todoId}`
      );
      console.log(response.data);

      fetchTodos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-blue-500 font-poppins">

      <div
        className="top-5 right-5 bg-white p-2 rounded-lg hover:font-semibold hover:shadow-md cursor-pointer absolute flex items-center"
        onClick={handleLogout}
      >
        <span>Logout</span>
        <MdOutlineLogout className="text-black ml-2" size={20} />
      </div>
      <div className="max-h-5">
      <div className="p-8 rounded-lg -mt-60 bg-white flex items-center ">
        <div className="">
          <div className="flex items-center">
            <div className="text-xl font-semibold">To-do List</div>
            <img src={image} alt="Icon" className="w-5 h-5 ml-2 " />
          </div>

          <div className="flex justify-center w-full mt-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new todo"
              className="min-w-[8rem] sm:min-w-[10rem] md:min-w-96 px-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded ml-10 hover:bg-blue-600"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>

          <div className="flex flex-col mt-6">
            <div>
              <span className="border-b-2">Active Todos</span>
            </div>
            <div className=" max-h-44 overflow-y-auto">
            {activeTodos.map(
              (activeTodo) =>
                !activeTodo.status && (
                  <div
                    key={activeTodo._id}
                    className="flex items-center mt-3 justify-between"
                  >
                    <div>
                      {activeTodo.title}
                      <div className="text-gray-500 text-sm">
                        {new Date(activeTodo.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <IoIosCheckmarkCircleOutline
                        className="text-green-500 mr-2 cursor-pointer" 
                        onClick={() => statusUpdate(activeTodo._id)}
                        size={25}
                      />
                      <FiEdit3 className="text-blue-500 mr-2 cursor-pointer" size={25} />
                      <MdDeleteOutline
                        className="text-red-500 cursor-pointer"
                        size={25}
                        onClick={() => handleDelete(activeTodo._id)}
                      />
                    </div>
                  </div>
                )
            )}
            </div>
          </div>

          <div className="mt-4">
            <div>
              <span className="border-b-2 ">Completed Todos</span>
            </div>
            <div className=" max-h-44 overflow-y-auto">
            {completedTodos.map(
              (completedTodo) =>
                completedTodo.status && (
                  <div
                    key={completedTodo._id}
                    className="flex items-center mt-3 justify-between"
                  >
                    <div>
                      <div className="line-through text-gray-500">
                        {completedTodo.title}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {new Date(completedTodo.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <IoIosCheckmarkCircle
                        className="text-green-500 mr-2 cursor-pointer"
                        onClick={() => statusUpdate(completedTodo._id)}
                        size={25}
                      />
                      <FiEdit3 className="text-blue-500 mr-2 cursor-pointer" size={25} />
                      <MdDeleteOutline
                        className="text-red-500 cursor-pointer "
                        size={25}
                        onClick={() => handleDelete(completedTodo._id)}
                      />
                    </div>
                  </div>
                )
            )}
            </div>
          </div>
        </div>
      </div>

      </div>
      

      {/* Modal for "Title is required" */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "300px",
            height: "150px",
            margin: "auto",
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Title is required</h2>
          <button
            style={{
              background: "#f44336",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;