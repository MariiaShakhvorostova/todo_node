import React from "react";
import "./checkbox.css";

const Checkbox = ({ checked, value, onChange }) => {
  return (
    <div className="wrap">
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox-input"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <span className="checkbox-span"></span>
      </label>
    </div>
  );
};

export default Checkbox;
