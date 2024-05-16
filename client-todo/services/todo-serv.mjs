import { TodoRepo } from "../repo/todo-repo.mjs";

export class TodoService {
  constructor() {
    this.todoRepo = new TodoRepo();
  }

  async createTodo(title) {
    try {
      const id = Date.now().toString();
      const completed = false;
      const newTodo = await this.todoRepo.createTodo(id, title, completed);
      return newTodo;
    } catch (error) {
      console.error("Error in createTodo:", error);
      throw new Error("Internal error while creating");
    }
  }

  async updateTodo(id, updateFields) {
    try {
      const updatedTodo = await this.todoRepo.updateTodo(id, updateFields);
      return updatedTodo;
    } catch (error) {
      throw new Error("Internal error while updating");
    }
  }

  async deleteTodo(id) {
    try {
      await this.todoRepo.deleteTodo(id);
      return {};
    } catch (error) {
      return { error: "Internal error while deleting" };
    }
  }

  async getAllTodos() {
    try {
      const todos = await this.todoRepo.findAllTodos();
      return todos;
    } catch (error) {
      console.error("Error in getAllTodos:", error);
      throw new Error("Internal error while fetching all todos");
    }
  }

  async deleteAllTodos() {
    try {
      await this.todoRepo.deleteAllTodos();
    } catch (error) {
      console.error("Error in deleteAllTodos:", error);
      throw new Error("Internal error while deleting all todos");
    }
  }
}
