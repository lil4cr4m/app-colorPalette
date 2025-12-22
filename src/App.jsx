import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import "./styles/index.css";

const App = () => {
  const [savedPalettes, setSavedPalettes] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                savedPalettes={savedPalettes}
                setSavedPalettes={setSavedPalettes}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                savedPalettes={savedPalettes}
                setSavedPalettes={setSavedPalettes}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
