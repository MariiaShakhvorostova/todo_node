import React, { useState } from "react";
import Checkbox from "../checkbox/checkbox";
import axios from "axios";

import "./item.css";

function TodoItem({ todo, onDelete }) {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(!todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(todo.title);

  const handleCheckboxChange = async (e) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    setIsEditVisible(!newChecked);

    try {
      await axios.put(`http://localhost:3010/todos/${todo.id}`, {
        completed: newChecked,
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      onDelete(todo.id);
      await axios.delete(`http://localhost:3010/todos/${todo.id}`);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditComplete = async () => {
    setIsEditing(false);
    setIsHovered(true);
    document.querySelector(`#delete_item_${todo.id}`).style.background =
      'url("./imgs/delete.png") no-repeat';
    document.querySelector(`#edit_item_${todo.id}`).style.background =
      'url("./imgs/edit.png") no-repeat';
    try {
      await axios.put(`http://localhost:3010/todos/${todo.id}`, {
        title: todoText,
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleInputChange = (e) => {
    setTodoText(e.target.value);
  };

  const handleEditItem = () => {
    setIsEditing(true);
    document.querySelector(`#single_item_${todo.id}`).style.background =
      "#ffffff";
    document.querySelector(`#delete_item_${todo.id}`).style.background = "none";
    document.querySelector(`#edit_item_${todo.id}`).style.background =
      'url("./imgs/bird.png") no-repeat';
  };

  return (
    <div className="items_container">
      <div
        id={`single_item_${todo.id}`}
        className={`single_item ${isChecked ? "checked" : ""} ${
          isHovered ? "hovered" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
            id={`edit_item_${todo.id}`}
            className={`edit_item ${isEditVisible ? "" : "hidden"}`}
            onClick={handleEditItem}
          ></button>
          <button
            id={`delete_item_${todo.id}`}
            onClick={handleDelete}
            className="delete_item"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
