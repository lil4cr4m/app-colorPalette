import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import PaletteGenerator from "./components/PaletteGenerator";

// Manage routing and holds the master state (palette)
// via useState and provides the Lifting State mechanism.

function App() {
  // useState 1/2: Holds the final palette data.
  const [palette, setPalette] = useState([]);

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/generate"
            element={
              // **LIFTING STATE:** setPalette is passed down as a prop.
              <PaletteGenerator
                setAppPalette={setPalette}
                currentPalette={palette}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
