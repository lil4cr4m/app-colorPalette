const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_NAME;
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE}`;

// Common headers for all requests
const getHeaders = () => ({
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
});

export const fetchAllPalettes = async () => {
  try {
    const response = await fetch(AIRTABLE_URL, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch palettes: ${response.status}`);
    }

    const data = await response.json();
    return data.records || [];
  } catch (error) {
    console.error("Error fetching palettes:", error);
    throw error;
  }
};

export const savePalette = async ({ name, imageUrl, colors }) => {
  try {
    const data = {
      fields: {
        name: name || "Untitled",
        imageUrl: imageUrl,
        color1: colors[0] || "#000000",
        color2: colors[1] || "#000000",
        color3: colors[2] || "#000000",
        color4: colors[3] || "#000000",
        color5: colors[4] || "#000000",
      },
    };

    const response = await fetch(AIRTABLE_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to save palette: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving palette:", error);
    throw error;
  }
};

export const updatePaletteName = async (id, newName) => {
  try {
    const response = await fetch(`${AIRTABLE_URL}/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({
        fields: { Name: newName },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update palette: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating palette:", error);
    throw error;
  }
};

export const deletePalette = async (id) => {
  try {
    const response = await fetch(`${AIRTABLE_URL}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete palette: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting palette:", error);
    throw error;
  }
};

export const getPaletteById = async (id) => {
  try {
    const response = await fetch(`${AIRTABLE_URL}/${id}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to get palette: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching palette:", error);
    throw error;
  }
};
