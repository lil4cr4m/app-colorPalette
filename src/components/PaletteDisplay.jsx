import React from "react";
import "../styles/PaletteDisplay.css";

const PaletteDisplay = ({ imageUrl, palette, isLoading }) => {
  if (isLoading) {
    return (
      <div className="loading-message">Analysing image... Please wait.</div>
    );
  }
  if (!imageUrl && palette.length === 0) {
    return (
      <div className="initial-message">Ready to create your first palette</div>
    );
  }
  return (
    <div className="palette-container">
      {/* Display Image */}
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Image source for color palette" />
        </div>
      )}

      {/* Display Palette */}
      {palette.length > 0 && (
        <div className="color-palette">
          {palette.map((hexCode, index) => (
            // Color Card
            <div
              key={index}
              className="color-card"
              style={{ backgroundColor: hexCode }}
              // Copy color on click
              onClick={() => navigator.clipboard.writeText(hexCode)}
            >
              <span className="hex-code">{hexCode}</span>
            </div>
          ))}
        </div>
      )}
      {palette.length > 0 && <button className="save-button">Save</button>}
    </div>
  );
};

export default PaletteDisplay;
