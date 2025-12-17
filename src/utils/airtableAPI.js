const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const API_TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const AIRTABLE_URL = `https://api.airtable.com/v0/${BASE_ID}/ColorPalette`;

export async function fetchFavorites() {
  try {
    const response = await fetch(AIRTABLE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

 
    if (!response.ok) {
      // Throwing the error here ensures the catch block is hit.
      throw new Error(`Airtable API Error! Status: ${response.status}`);
    }

    // Manually parse the JSON response body.
    const data = await response.json();

    // Map and clean the data as before
    return data.records.map((record) => ({
      id: record.id,
      // We still have to parse the JSON string back into an array
      hexColors: JSON.parse(record.fields.Hex_Colors),
      sourceImage: record.fields.Source_Image,
      dateSaved: record.fields.Date_Saved,
    }));
  } catch (error) {
    console.error("Airtable Fetch Error:", error.message);
    return []; // Gracefully return empty array on failure
  }
}
