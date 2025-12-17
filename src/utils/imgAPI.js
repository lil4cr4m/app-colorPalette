// Implement the fetchRandomImage function
// using fetch to get an image URL from an API.

// IMPORTANT: Replace 'YOUR_UNSPLASH_ACCESS_KEY' with your actual key.
const UNSPLASH_ACCESS_KEY = "";
const BASE_URL = "https://api.unsplash.com/";

// The basic endpoint for a random photo
const RANDOM_ENDPOINT = `${BASE_URL}photos/random`;

export async function fetchRandomImage() {
  // 1. Construct the URL with required parameters
  const params = new URLSearchParams({
    client_id: UNSPLASH_ACCESS_KEY,
    // collections: "",
    // topics: "",
    // username: "",
    // query: "",
    // orientation: "",
    // content_filter: "",
    count: 1,
  });

  const url = `${RANDOM_ENDPOINT}?${params.toString()}`;

  try {
    // 2. Use fetch with async/await
    const response = await fetch(url);

    // 3. Check for HTTP errors (e.g., 404, 500, or key issues 401/403)
    if (!response.ok) {
      // Throwing an error ensures the catch block handles bad responses
      throw new Error(`Unsplash API Error! Status: ${response.status}`);
    }

    // 4. Parse the JSON response body. Since we requested count=1, we get an array.
    const data = await response.json();

    // Unsplash random endpoint returns an array even for count=1
    const imageObject = data[0];

    // 5. Extract the image URL for processing (using 'regular' quality)
    if (imageObject && imageObject.urls && imageObject.urls.regular) {
      // We need to return the image URL itself
      return imageObject.urls.regular;
    }

    // Handle case where API succeeds but returns no image data
    return null;
  } catch (error) {
    console.error("API Fetch Error:", error.message);
    // Inform the calling component (PaletteGenerator) that the fetch failed
    return null;
  }
}
