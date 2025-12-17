import React, { useState } from "react";

const ImageInputForm = ({ onGenerate, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(input);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="url"
          placeholder="Paste image URL here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Palette"}
        </button>
      </form>
    </div>
  );
};

export default ImageInputForm;
