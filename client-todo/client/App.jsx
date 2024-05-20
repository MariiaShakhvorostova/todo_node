import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";
import axios from "axios";
import AddTodoForm from "./src/components/form/AddTodoForm";
import TodoItem from "./src/components/to-do-item/TodoItem";
import ClearButton from "./src/components/clear-button/clear_button";
import "./App.css";

const queryClient = new QueryClient();

const fetchTodos = async () => {
  const response = await axios.get("http://localhost:3010/todos");
  return response.data;
};

const addTodo = async (newTodoTitle) => {
  const response = await axios.post("http://localhost:3010/todos", {
    title: newTodoTitle,
  });
  return response.data;
};

const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:3010/todos/${id}`);
};

const clearTodos = async () => {
  await axios.delete("http://localhost:3010/todos");
};

function App() {
  const { data: todos = [] } = useQuery("todos", fetchTodos);
  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const clearTodosMutation = useMutation(clearTodos, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
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

function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default AppWrapper;
