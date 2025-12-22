import React from "react";
import "../styles/PaletteDisplay.css";

const PaletteDisplay = ({ imageUrl, palette }) => {
  if (!imageUrl || !palette.length) return null;

  return (
    <div className="palette-display">
      <img src={imageUrl} alt="Source" className="main-image" />

      <div className="palette-bar">
        {palette.map((hex, index) => (
          <div
            key={index}
            className="color-slot"
            style={{ backgroundColor: hex }}
          >
            <span className="hex-code">{hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteDisplay;
