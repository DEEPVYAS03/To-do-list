const Todo = require('../models/Todo');
const User = require('../models/User');

const createTodo = async (req, res) => {
    try {
        const { title ,userId } = req.body;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failure", message: "User not found" });
        }
        
        // Create a new todo associated with the user
        const todo = new Todo({
            title
        });
        
        await todo.save();

        // Add the todo to the user's todos array
        user.todos.push(todo._id);
        
        // Save the user (which will also save the newTodo)
        await user.save();
        
        res.status(201).json({ status: "success", message: "Todo created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "failure", message: "Server Error" });
    }
}


const getTodos = async (req, res) => {
    try {
      const userId = req.params.userId; // Assuming userId is passed in the request params
      const user = await User.findById(userId).populate('todos'); // Populate the todos array
  
      if (!user) {
        return res.status(404).json({ status: "failure", message: "User not found" });
      }
  
      res.status(200).json({ status: "success", todos: user.todos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failure", message: "Server Error" });
    }
  };

  
const updateTodo = async (req, res) => {
}

const deleteTodo = async (req, res) => {
}

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };