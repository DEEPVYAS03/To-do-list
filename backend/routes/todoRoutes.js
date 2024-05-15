const express = require('express');
const router = express.Router();

// importing controllers

const {createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');

// routes
router.post('/createTodo', createTodo);
router.get('/getTodos/:userId', getTodos);
router.put('/updateTodo', updateTodo);
router.delete('/deleteTodo', deleteTodo);


module.exports = router;