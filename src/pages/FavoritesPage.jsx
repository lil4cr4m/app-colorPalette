import React from "react";

const FavoritesPage = () => {
  return (
    <>
      <h2>Your Saved Palettes</h2>
      <p>This page will display all palettes fetched from Airtable.</p>

      <div className="favorites-list">
        <p>--- [Airtable Data will be displayed here] ---</p>
      </div>
    </>
  );
};

export default FavoritesPage;
