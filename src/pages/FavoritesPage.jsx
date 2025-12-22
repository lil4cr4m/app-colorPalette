import React, { useState, useEffect } from "react";
import PaletteCard from "../components/PaletteCard";
import {
  fetchAllPalettes,
  updatePaletteName,
  deletePalette,
} from "../services/airtable";
import "../styles/FavoritesPage.css";

const FavoritesPage = ({ savedPalettes, setSavedPalettes }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPalettes();
  }, []);

  const loadPalettes = async () => {
    setIsLoading(true);
    try {
      const palettes = await fetchAllPalettes();
      setSavedPalettes(palettes);
    } catch (error) {
      console.error("Failed to load palettes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (id, newName) => {
    if (!newName.trim()) {
      setEditingId(null);
      return;
    }

    try {
      await updatePaletteName(id, newName);

      // Update local state
      setSavedPalettes((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, fields: { ...item.fields, Name: newName } }
            : item
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update palette:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this palette?")) {
      return;
    }

    try {
      await deletePalette(id);
      // Update local state
      setSavedPalettes((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete palette:", error);
      alert("Failed to delete palette. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <h1>Favorites</h1>
        <div className="loading-spinner">Loading palettes...</div>
      </div>
    );
  }

  if (!savedPalettes.length) {
    return (
      <div className="page-container">
        <h1>Favorites</h1>
        <p className="empty-message">No saved palettes yet.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Favorites</h1>
        <span className="count-badge">{savedPalettes.length} saved</span>
      </div>

      <div className="grid-view">
        {savedPalettes.map((palette) => (
          <PaletteCard
            key={palette.id}
            palette={palette}
            isEditing={editingId === palette.id}
            editValue={editValue}
            onEditChange={setEditValue}
            onStartEdit={() => {
              setEditingId(palette.id);
              setEditValue(palette.fields.Name || "");
            }}
            onSaveEdit={() => handleUpdate(palette.id, editValue)}
            onCancelEdit={() => setEditingId(null)}
            onDelete={() => handleDelete(palette.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
