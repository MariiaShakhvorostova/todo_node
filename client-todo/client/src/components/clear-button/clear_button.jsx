import React from "react";
import "./clear.css";

function ClearButton({ onClear }) {
  return (
    <div className="clear_button" onClick={onClear}>
      <div className="clear_icon"></div>
      <span>Clear all tasks</span>
    </div>
  );
}

export default ClearButton;
