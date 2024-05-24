import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { config } from "dotenv";
import { TodoService } from "./services/todo-serv.mjs";
const app = express();
import process from "process";

config();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3010;

const todoService = new TodoService();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome from backend" });
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal error while fetching todos" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    console.log("Received POST request to /todos");
    const { title } = req.body;
    const newTodo = await todoService.createTodo(title);
    console.log("New todo created:", newTodo);
    res.json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.json({ error: "Internal error while creating todo" });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const updatedTodo = await todoService.updateTodo(id, updateFields);
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res
      .status(500)
      .json({ error: "Internal error occurred while updating todo." });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await todoService.deleteTodo(id);
    res.end();
  } catch (error) {
    console.error("Error deleting all todos:", error);
    res.json({ error: "Internal error occurred while deleting todo" });
  }
});

app.delete("/todos", async (req, res) => {
  try {
    await todoService.deleteAllTodos();
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting all todos:", error);
    res.status(500).json({ error: "Internal error while deleting all todos" });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
