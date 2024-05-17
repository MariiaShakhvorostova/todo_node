import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodoForm from "./src/components/form/AddTodoForm";
import TodoItem from "./src/components/to-do-item/TodoItem";
import ClearButton from "./src/components/clear-button/clear_button";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3010/todos");
      setTodos(response.data || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3010/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const clearTodos = async () => {
    try {
      await axios.delete("http://localhost:3010/todos");
      setTodos([]);
    } catch (error) {
      console.error("Error clearing todos:", error);
    }
  };

  return (
    <div className="main">
      <div className="to-do-app">
        <AddTodoForm onAdd={addTodo} />
        <div className="all_items_on_page">
          {Array.isArray(todos) &&
            todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
            ))}
        </div>
      </div>
      <ClearButton onClear={clearTodos} />
    </div>
  );
}

export default App;
