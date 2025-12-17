import React, { useState } from "react";
import ImageInputForm from "../components/ImageInputForm";
import PaletteDisplay from "../components/PaletteDisplay";
import ColorThief from "colorthief";

const colorThief = new ColorThief();

const GeneratorPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [palette, setPalette] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGeneratePalette = (url) => {
    if (!url) return;
    setIsLoading(true);
    setError(null);
    setImageUrl(url);

    // 1. Create new Image object
    const img = new Image();
    img.crossOrigin = "Anonymous";

    // SUCCESS
    img.onload = () => {
      try {
        // 2. Use colorthief to get palette (5 colors)
        const colorArray = colorThief.getPalette(img, 5);
        // 3. Convert RGB (default) array to HEX codes for easier use in CSS
        const hexPalette = colorArray.map((rgb) => rgbToHex(rgb));
        setPalette(hexPalette);
      } catch (error) {
        console.error("An error occured:", error);
        setError(
          "Failed to extract colors. Check the image URL, ensure it supports CORS or try a different image."
        );
        // 4. Clear palette if error thrown
        setPalette([]);
      } finally {
        setIsLoading(false);
      }
    };

    // FAILURE
    img.onerror = () => {
      setIsLoading(false);
      setPalette([]);
      setError(
        "Failed to extract colors. Check the image URL, ensure it supports CORS or try a different image."
      );
    };

    // TRIGGER IMAGE DOWNLOAD
    img.src = imageUrl;
  };

  // Helper function to convert RGB array to HEX string
  const rgbToHex = ([r, g, b]) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  return (
    <>
      <h2>Create a Palette</h2>
      <p>Paste an image URL below and click 'Generate' to extract colors.</p>
      <div className="generator-container">
        {/* 1. Pass the generator function down to the input component */}
        <ImageInputForm
          onGenerate={handleGeneratePalette}
          isLoading={isLoading}
        />
        {/* 2. Pass the generated data down to the display component */}
        <PaletteDisplay
          imageUrl={imageUrl}
          palette={palette}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default GeneratorPage;
