import React from "react";
import { useQuery, useMutation } from "react-query";
import AddTodoForm from "./src/components/form/AddTodoForm";
import TodoItem from "./src/components/to-do-item/TodoItem";
import ClearButton from "./src/components/clear-button/clear_button";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  clearTodos,
} from "./src/api/todosApi";
import queryClient from "./src/queryClient";
import "./App.css";

function App() {
  const { data: todos = [] } = useQuery("todos", fetchTodos, {
    initialData: undefined,
    staleTime: Infinity,
  });

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: (data) => {
      queryClient.setQueryData("todos", (prev) => [...prev, data]);
    },
  });

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: (id) => {
      queryClient.setQueryData("todos", (prev) =>
        prev.filter((todo) => todo.id !== id)
      );
    },
  });

  const clearTodosMutation = useMutation(clearTodos, {
    onSuccess: () => {
      queryClient.setQueryData("todos", []);
    },
  });

  const handleAddTodo = async (newTodoTitle) => {
    await addTodoMutation.mutateAsync(newTodoTitle);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodoMutation.mutateAsync(id);
  };

  const handleClearTodos = async () => {
    await clearTodosMutation.mutateAsync();
  };

  return (
    <div className="main">
      <div className="to-do-app">
        <AddTodoForm onAdd={handleAddTodo} />
        <div className="all_items_on_page">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => handleDeleteTodo(todo.id)}
            />
          ))}
        </div>
      </div>
      <ClearButton onClear={handleClearTodos} />
    </div>
  );
}
export default App;
