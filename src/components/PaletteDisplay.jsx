// Create the component to receive the palette array prop & render a list of ColorSquares.

import React from "react";
import ColorSquare from "./ColorSquare";

// The Output. Displays the generated colors.
// Renders multiple ColorSquare components.

function PaletteDisplay({ palette }) {
  return (
    <div>
      {palette.map((color, index) => (
        <ColorSquare key={index} colorHex={color} /> // Passes Prop 1/4
      ))}
    </div>
  );
}

export default PaletteDisplay;
