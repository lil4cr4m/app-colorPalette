import React, { useState } from "react";
import "../styles/SaveForm.css";

const SaveForm = ({ onSave, paletteName, disabled }) => {
  const [name, setName] = useState(paletteName || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSave(name);
    if (success) {
      setName("");
    }
  };

  return (
    <form className="save-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Name your palette (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
          className="name-input"
        />
        <button type="submit" disabled={disabled} className="save-button">
          Save
        </button>
      </div>
      {!name && (
        <p className="hint">
          If you don't provide a name, a default name will be used.
        </p>
      )}
    </form>
  );
};

export default SaveForm;
