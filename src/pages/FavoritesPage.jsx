import React, { useState, useEffect } from "react";
import "../styles/FavoritesPage.css";

const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`;

const FavoritesPage = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // States to track editing
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const fetchItems = async () => {
    const res = await fetch(AIRTABLE_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = await res.json();
    setSavedItems(data.records || []);
    setLoading(false);
  };

  const startEditing = (id, currentName) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const saveUpdate = async (id) => {
    if (!editValue.trim()) {
      setEditingId(null);
      return;
    }

    const res = await fetch(`${AIRTABLE_URL}/${id}`, {
      method: "PATCH", // Update only the Name field
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: { Name: editValue },
      }),
    });

    if (res.ok) {
      setSavedItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, fields: { ...item.fields, Name: editValue } }
            : item
        )
      );
      setEditingId(null);
    }
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${AIRTABLE_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      if (res.ok) {
        // 2. Use the correct state setter: setSavedItems
        setSavedItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        const errorData = await res.json();
        console.error("Airtable Error:", errorData);
      }
    } catch (err) {
      console.error("Network Error:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div className="page-container">Loading...</div>;

  return (
    <div className="page-container grid-view">
      {savedItems.map((item) => (
        <div key={item.id} className="fav-card">
          <div className="fav-header">
            {/* Swaps between Input and Span based on state */}
            {editingId === item.id ? (
              <input
                className="inline-edit-input"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => saveUpdate(item.id)} // Saves when you click away
                onKeyDown={(e) => e.key === "Enter" && saveUpdate(item.id)} // Saves on Enter
                autoFocus
              />
            ) : (
              <span
                className="editable-name"
                onClick={() => startEditing(item.id, item.fields.Name)}
              >
                {item.fields.Name || "Untitled"}
              </span>
            )}

            <button className="delete-btn" onClick={() => deleteItem(item.id)}>
              &times;
            </button>
          </div>

          <img src={item.fields.ImageURL} className="fav-img" alt="saved" />

          <div className="fav-strip">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className="fav-color"
                style={{ backgroundColor: item.fields[`Color${num}`] }}
              >
                <span className="hex-label">{item.fields[`Color${num}`]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
