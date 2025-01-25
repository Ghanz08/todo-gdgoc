const db = require("../config/database");

// Get all todos for a user
const getAllTodos = async (req, res) => {
  try {
    const [todos] = await db.query("SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC", [req.user.userId]);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching todos" });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  try {
    const { title, description, due_date, priority } = req.body;
    const [result] = await db.query("INSERT INTO todos (user_id, title, description, due_date, priority) VALUES (?, ?, ?, ?, ?)", [req.user.userId, title, description, due_date, priority]);

    const [newTodo] = await db.query("SELECT * FROM todos WHERE todo_id = ?", [result.insertId]);

    res.status(201).json(newTodo[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating todo" });
  }
};

// Get a specific todo by ID
const getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;
    const [todos] = await db.query("SELECT * FROM todos WHERE todo_id = ? AND user_id = ?", [todoId, req.user.userId]);

    if (todos.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todos[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching todo" });
  }
};

// Update a todo
const updateTodo = async (req, res) => {
  try {
    const { title, description, due_date, priority, is_complete } = req.body;
    const todoId = req.params.id;

    // Verify todo belongs to user
    const [todos] = await db.query("SELECT * FROM todos WHERE todo_id = ? AND user_id = ?", [todoId, req.user.userId]);

    if (todos.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await db.query("UPDATE todos SET title = ?, description = ?, due_date = ?, priority = ?, is_complete = ? WHERE todo_id = ?", [title, description, due_date, priority, is_complete, todoId]);

    const [updatedTodo] = await db.query("SELECT * FROM todos WHERE todo_id = ?", [todoId]);

    res.json(updatedTodo[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating todo" });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    // Verify todo belongs to user
    const [todos] = await db.query("SELECT * FROM todos WHERE todo_id = ? AND user_id = ?", [todoId, req.user.userId]);

    if (todos.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await db.query("DELETE FROM todos WHERE todo_id = ?", [todoId]);

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting todo" });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById, // Export the new function
};
