const express = require("express");
const {
  createTodo,
  editTodo,
  allTodos,
  deleteTodo,
} = require("../controllers/todocontroller");

const router = express.Router();
const auth = require("../middleware/auth");

// create a new Todo
router.post("/todos", auth, createTodo);

// get all Todos
router.get("/todos", auth, allTodos);

// edit a specific Todo by ID
router.patch("/todos/:id", auth, editTodo);

// delete todo
router.delete("/todos/:id", auth, deleteTodo);

module.exports = router;
