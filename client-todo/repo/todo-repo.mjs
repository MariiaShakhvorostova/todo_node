import { TodoModel } from "../models/todo-model.mjs";

export class TodoRepo {
  async createTodo(id, title, completed) {
    const todo = { id, title, completed };
    const todoDoc = new TodoModel(todo);
    await todoDoc.save();
    return todoDoc.toObject();
  }

  async findAllTodos() {
    try {
      const todos = await TodoModel.find();
      return todos;
    } catch (error) {
      throw new Error("Internal error while fetching all todos");
    }
  }

  async updateTodo(id, updateFields) {
    try {
      const todo = await TodoModel.findOneAndUpdate({ id: id }, updateFields, {
        new: true,
      });
      return todo.toObject();
    } catch (error) {
      throw new Error("Internal error while updating");
    }
  }

  async deleteTodo(id) {
    try {
      await TodoModel.deleteOne({ id: id });
    } catch (error) {
      throw new Error("Internal error while deleting");
    }
  }

  async deleteAllTodos() {
    await TodoModel.deleteMany({});
  }
}
