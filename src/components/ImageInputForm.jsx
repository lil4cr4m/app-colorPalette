import React, { useState } from "react";
import "../styles/ImageInputForm.css";

const ImageInputForm = ({ onGenerate, isLoading }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onGenerate(inputText);
      setInputText("");
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Paste image URL here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !inputText.trim()}>
        {isLoading ? "Processing..." : "Generate"}
      </button>
    </form>
  );
};

export default ImageInputForm;
