const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById // Add this import to get a specific todo
} = require('../controllers/todoController');

router.use(authenticateToken);

router.get('/', getAllTodos);
router.get('/:id', getTodoById); // Add this route to get a specific todo
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;