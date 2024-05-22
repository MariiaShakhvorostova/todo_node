import axios from "axios";

const API_URL = "http://localhost:3010/todos";

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTodo = async (newTodoTitle) => {
  const response = await axios.post(API_URL, { title: newTodoTitle });
  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const clearTodos = async () => {
  await axios.delete(API_URL);
};

export const editTodo = async (id, updatedTodo) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
  return response.data;
};
