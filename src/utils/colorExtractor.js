// Implement the logic using Color Thief.
// This takes an image URL and returns the hex palette.

import ColorThief from "colorthief";

// const img = resolve(process.cwd(), 'rainbow.png');

ColorThief.getPalette(img, 5)
  .then((palette) => {
    console.log(palette);
  })
  .catch((err) => {
    console.log(err);
  });

// use hex cos it's more popular

// const rgbToHex = (r, g, b) =>
//   "#" +
//   [r, g, b]
//     .map((x) => {
//       const hex = x.toString(16);
//       return hex.length === 1 ? "0" + hex : hex;
//     })
//     .join("");

// to make this more portable

// export function extractColorsFromImage(imageSrc, colorCount = 5) {
//   return new Promise((resolve, reject) => {
//     // 1. Create a native Image object
//     const img = new Image();
//     img.crossOrigin = "Anonymous"; // Allows processing images from external URLs
//     img.src = imageSrc;

//     // 2. Wait for the image to load before processing pixels
//     img.onload = () => {
//       try {
//         const colorThief = new ColorThief();

//         // Color Thief's getPalette processes the image and returns an array of RGB arrays:
//         // e.g., [[255, 0, 0], [0, 255, 0], ...]
//         const rgbPalette = colorThief.getPalette(img, colorCount);

//         // 3. Convert all RGB values to Hex strings
//         const hexPalette = rgbPalette.map(rgbToHex);

//         resolve(hexPalette);
//       } catch (error) {
//         console.error("Color processing failed:", error);
//         reject(new Error("Failed to process image for colors."));
//       }
//     };

//     img.onerror = () => {
//       // Rejects the promise if the image URL is bad or inaccessible
//       reject(new Error("Error loading the image file."));
//     };
//   });
// }
