import React, { useState } from "react";
import ColorThief from "colorthief";
import ImageInputForm from "../components/ImageInputForm";
import PaletteDisplay from "../components/PaletteDisplay";
import SaveForm from "../components/SaveForm";
import { savePalette } from "../services/airtable";
import "../styles/HomePage.css";

const HomePage = ({ savedPalettes, setSavedPalettes }) => {
  const [activeImage, setActiveImage] = useState("");
  const [activePalette, setActivePalette] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const handleExtract = async (url) => {
    if (!url) return;

    setIsLoading(true);
    setActiveImage(url);
    setSaveStatus("");

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;

    img.onload = () => {
      const thief = new ColorThief();
      const rgbPalette = thief.getPalette(img, 5);

      // console.log("ColorThief RGB palette:", rgbPalette);

      const hexPalette = rgbPalette.map(
        (rgb) => "#" + rgb.map((x) => x.toString(16).padStart(2, "0")).join("")
      );

      // console.log("Hex palette:", hexPalette);

      setActivePalette(hexPalette);
      setIsLoading(false);
    };

    img.onerror = () => {
      alert("Failed to load image. Please check the URL.");
      setIsLoading(false);
    };
  };

  const handleSave = async (paletteName) => {
    if (!activeImage || activePalette.length === 0) {
      setSaveStatus("No palette to save");
      return false;
    }

    // console.log("DEBUG - Active palette:", activePalette);
    // console.log("DEBUG - Active image URL:", activeImage);

    setIsLoading(true);
    setSaveStatus("Saving...");

    try {
      const result = await savePalette({
        name: paletteName || `Palette ${savedPalettes.length + 1}`,
        imageUrl: activeImage,
        colors: activePalette,
      });

      // Update lifted state
      const newPalette = {
        id: result.id,
        fields: {
          name: paletteName || `Palette ${savedPalettes.length + 1}`,
          imageUrl: activeImage,
          color1: activePalette[0],
          color2: activePalette[1],
          color3: activePalette[2],
          color4: activePalette[3],
          color5: activePalette[4],
        },
      };

      setSavedPalettes([...savedPalettes, newPalette]);
      setSaveStatus("Saved successfully!");
      setIsLoading(false);

      return true;
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus("Failed to save palette");
      setIsLoading(false);
      return false;
    }
  };

  return (
    <div className="page-container">
      <h1>Palette Generator</h1>
      <p className="subtitle">Extract color palettes from any image URL</p>

      <ImageInputForm onGenerate={handleExtract} isLoading={isLoading} />

      <PaletteDisplay imageUrl={activeImage} palette={activePalette} />

      {activePalette.length > 0 && (
        <>
          <SaveForm
            onSave={handleSave}
            paletteName={`Palette ${savedPalettes.length + 1}`}
            disabled={isLoading}
          />
          {saveStatus && (
            <div
              className={`status-message ${
                saveStatus.includes("successfully") ? "success" : "error"
              }`}
            >
              {saveStatus}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
