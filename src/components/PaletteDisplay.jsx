import React from "react";
import "../styles/PaletteDisplay.css";

const PaletteDisplay = ({ imageUrl, palette }) => {
  // 1. Logic: If no image is provided yet, don't show anything
  if (!imageUrl) return null;

  return (
    <div className="preview-box">
      {/* 2. THE IMAGE: Styled as a perfect square */}
      <img src={imageUrl} alt="Source" className="main-image" />

      {/* 3. THE COLORS: A horizontal bar of 5 colors */}
      <div className="palette-bar">
        {palette.map((hex, index) => (
          <div
            key={index}
            className="color-slot"
            style={{ backgroundColor: hex }}
          >
            {/* 4. THE HEX CODE: Centered inside the color slot */}
            <span className="hex-code">{hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteDisplay;
