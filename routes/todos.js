const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({
      title,
      description,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const deletedTodo = await Todo.findByIdAndDelete(id);
          if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
          }
          res.status(200).json({
            message: "Todo deleted successfully",
            deletedTodo
          });
        } catch (error) {
          res.status(500).json({ error: "Failed to delete todo" });
        }
      });
      

module.exports = router;
