const express = require('express');
const router = express.Router();

// importing controllers

const {createTodo, getTodos, updateTodo, deleteTodo ,statusUpdate } = require('../controllers/todoController');

// routes
router.post('/create/todo', createTodo);
router.get('/getTodos/:userId', getTodos);
router.put('/update/todo', updateTodo);
router.put('/update/status/:todoId', statusUpdate);  
router.delete('/delete/todo/:todoId', deleteTodo);


module.exports = router;