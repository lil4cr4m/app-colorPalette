import React, { useState } from "react";

const ImageInputForm = ({ onGenerate, isLoading }) => {
  const [text, setText] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    if (text.trim()) {
      onGenerate(text); // Sends the URL back up to the GeneratorPage
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Paste image URL here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading} // Stop typing while it's busy
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : "Create"}
      </button>
    </form>
  );
};

export default ImageInputForm;
