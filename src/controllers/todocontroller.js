const mongoose = require("mongoose");
const Todo = require("../models/todos");

const createTodo = async (req, res) => {
  try {
    const todoDetails = new Todo({
      ...req.body,
      owner: req.user._id,
    });
    const data = await todoDetails.save();
    res.status(201).send({ message: "Add SuccessFull", data });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const editTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).send();
    }

    res.send({ todo, message: "Edit SuccessFull" });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const allTodos = async (req, res) => {
 const  owner = req.user._id
  try {
    const todos = await Todo.find({owner}).populate("owner");
    res.send(todos);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).send({ error: 'Todo not found' });
    }
    res.send(todo);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

module.exports = {
  createTodo,
  editTodo,
  allTodos,
  deleteTodo,
};
