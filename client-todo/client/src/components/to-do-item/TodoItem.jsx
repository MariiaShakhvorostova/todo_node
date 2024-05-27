/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Checkbox from "../checkbox/checkbox";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo, editTodo } from "../../api/todosApi";

import "./item.css";

function TodoItem({ todo, onDelete }) {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(!todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(todo.title);
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.setQueryData("todos", (prev) =>
        prev.filter((t) => t.id !== todo.id)
      );
    },
  });

  const editTodoMutation = useMutation(
    (updatedTodo) => editTodo(todo.id, updatedTodo),
    {
      onSuccess: (updatedTodo) => {
        queryClient.setQueryData("todos", (prev) =>
          prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
        );
      },
    }
  );

  const handleCheckboxChange = async (e) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    setIsEditVisible(!newChecked);

    try {
      await editTodoMutation.mutateAsync({
        completed: newChecked,
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodoMutation.mutateAsync(todo.id);
      onDelete(todo.id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditComplete = async () => {
    setIsEditing(false);
    try {
      await editTodoMutation.mutateAsync({ title: todoText });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleEditItem = () => {
    setIsEditing(true);
  };

  return (
    <div className="items_container">
      <div
        className={`single_item ${isChecked ? "checked" : ""} ${
          isHovered ? "hovered" : ""
        } ${isEditing ? "editing" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: isEditing ? "#ffffff" : "",
        }}
      >
        <div className="item_group">
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          <div className="vertical_line"></div>
          {isEditing ? (
            <input
              type="text"
              value={todoText}
              onChange={handleInputChange}
              onBlur={handleEditComplete}
              autoFocus
            />
          ) : (
            <span className={isChecked ? "checked" : ""}>{todoText}</span>
          )}
        </div>
        <div className={`buttons_group ${isChecked ? "hidden" : ""}`}>
          <button
            className={`edit_item ${isEditVisible ? "" : "hidden"}`}
            onClick={handleEditItem}
            style={{
              background: isEditing
                ? 'url("./imgs/bird.png") no-repeat'
                : 'url("./imgs/edit.png") no-repeat',
            }}
          ></button>
          <button
            onClick={handleDelete}
            className="delete_item"
            style={{
              background: isEditing
                ? "none"
                : 'url("./imgs/delete.png") no-repeat',
            }}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
