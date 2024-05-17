import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  id: String,
  title: String,
  completed: Boolean,
});

export const TodoModel = mongoose.model("Todo", todoSchema);
