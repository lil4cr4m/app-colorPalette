import React from "react";
import "../styles/PaletteCard.css";

const PaletteCard = ({
  palette,
  isEditing,
  editValue,
  onEditChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) => {
  const colors = [
    palette.fields.color1,
    palette.fields.color2,
    palette.fields.color3,
    palette.fields.color4,
    palette.fields.color5,
  ];

  return (
    <div className="palette-card">
      <div className="card-header">
        {isEditing ? (
          <input
            className="edit-input"
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            onBlur={onSaveEdit}
            onKeyDown={(e) => e.key === "Enter" && onSaveEdit()}
            autoFocus
          />
        ) : (
          <h3 onClick={onStartEdit} className="editable-title">
            {palette.fields.name || "Untitled"}
          </h3>
        )}
        <button className="delete-btn" onClick={onDelete}>
          ×
        </button>
      </div>

      <img
        src={palette.fields.imageUrl}
        alt={palette.fields.name}
        className="palette-image"
      />

      <div className="color-strip">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-box"
            style={{ backgroundColor: color }}
            title={color}
          >
            <span className="color-hex">{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteCard;
