import React, { useState } from "react";
import "./form.css";

function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input_button ">
        <input
          type="text"
          placeholder="Type here to add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="button_container">
          <div className="icon-plus"></div>
          <button className="add_button" type="submit">
            Add
          </button>
        </div>
      </div>
      <div className="divider"></div>
    </form>
  );
}

export default AddTodoForm;
