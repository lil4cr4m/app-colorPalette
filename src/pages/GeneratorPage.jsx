import React, { useState } from "react";
import ColorThief from "colorthief";
import "../styles/GeneratorPage.css";

// Database Config
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`;

const GeneratorPage = () => {
  // 1. STATES
  const [typedUrl, setTypedUrl] = useState(""); // What is currently in the input
  const [activeImage, setActiveImage] = useState(""); // The image being displayed
  const [activePalette, setActivePalette] = useState([]); // The 5 colors extracted
  const [paletteName, setPaletteName] = useState(""); // The name for saving

  // 2. EXTRACTION LOGIC
  const handleExtract = (url) => {
    if (!url) return; // Guard clause: exit if no URL
    setActiveImage(url); // Set the image to display

    const img = new Image(); // Create invisible image element
    img.crossOrigin = "Anonymous"; // Allows cross-origin image processing
    img.src = url; // Load the image

    img.onload = () => {
      // When image fully loads
      const thief = new ColorThief(); // Create color extractor instance
      const rgbPalette = thief.getPalette(img, 5); // Get 5 RGB colors
      // Convert RGB to Hex
      const hexPalette = rgbPalette.map(
        (rgb) => "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("")
      );
      setActivePalette(hexPalette); // Update state with hex colors
    };
  };

  // 3. SAVE TO AIRTABLE
  const handleSave = async () => {
    const data = {
      fields: {
        Name: paletteName || "Untitled", // Use custom name or default
        ImageURL: activeImage,
        Color1: activePalette[0],
        Color2: activePalette[1],
        Color3: activePalette[2],
        Color4: activePalette[3],
        Color5: activePalette[4],
      },
    };

    await fetch(AIRTABLE_URL, {
      method: "POST", // Create new record
      headers: {
        Authorization: `Bearer ${TOKEN}`, // API authentication
        "Content-Type": "application/json", // Data format
      },
      body: JSON.stringify(data), // Convert object to JSON string
    });

    alert("Palette saved.");

    setPaletteName(""); // Reset palette name input
  };

  return (
    <div className="page-container">
      {/* INPUT LINE */}
      <div className="input-group">
        <input
          placeholder="Paste Image URL"
          value={typedUrl}
          onChange={(e) => setTypedUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleExtract(typedUrl)}
        />
        <button className="text-btn" onClick={() => handleExtract(typedUrl)}>
          Generate
        </button>
      </div>

      {/* RESULT DISPLAY */}
      {activeImage && activePalette.length > 0 && (
        <div className="result-card">
          <img src={activeImage} alt="Source" className="main-image" />

          <div className="palette-strip">
            {activePalette.map((hex, i) => (
              <div
                key={i}
                className="color-box"
                style={{ backgroundColor: hex }}
              >
                <span className="hex-label">{hex}</span>
              </div>
            ))}
          </div>

          <div className="save-row">
            <input
              placeholder="Palette"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
            />
            <button className="text-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratorPage;
