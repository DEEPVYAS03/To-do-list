const Todo = require('../models/Todo');
const User = require('../models/User');

const createTodo = async (req, res) => {
    try {
        const { title ,userId } = req.body;
        
        const todo = new Todo({
            title,
            user: userId
        });
        await todo.save();

        res.status(201).json({ status: "success", message: "Todo created successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "failure", message: "Server Error" });
    }
}


const getTodos = async (req, res) => {
    try {
      const userId = req.params.userId; // Assuming userId is passed in the request params

      // Fetch all todos associated with the user
      const todos = await Todo.find({ user: userId });
  
      res.status(200).json({ success: true, todos });

    } catch (error) {

      res.status(500).json({ status: "failure", message: "Server Error" });
    }
  };

  
const updateTodo = async (req, res) => {
    try{

      const {title,todoId} = req.body;

      const todo = await Todo.findById(todoId);
      todo.title = title;
      await todo.save();

      res.status(200).json({status:"success",message:"Todo updated successfully"})
    }
    catch(err){
      res.status(500).json({status:"failure",message:"Server Error"})
    }
}

const statusUpdate = async (req, res) => {
    try {
      const todoId = req.params.todoId;
  
      
      // Find the todo by ID
      const todo = await Todo.findById(todoId);
  

      if (!todo) {
        console.error("Todo not found");
        return res.status(404).json({ success: false, message: 'Todo not found' });
    }

      // Update the status of the todo
      todo.status = !todo.status;
  
      // Save the updated todo
      await todo.save();
  
      res.status(200).json({ success: true, message: 'Todo updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "failure", message: "Server Error" });
    }
  };


  const deleteTodo = async (req, res) => {
    try {
      const todoId = req.params.todoId;
  
      // Find the todo by ID and delete it
      const todo = await Todo.findByIdAndDelete(todoId);
  
      if (!todo) {
        return res.status(404).json({ success: false, message: 'Todo not found' });
      }
  
      res.status(200).json({ success: true, message: 'Todo deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  }
  

module.exports = { createTodo, getTodos, updateTodo,statusUpdate , deleteTodo };